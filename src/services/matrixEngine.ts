import {
  ExamProject,
  Section,
  CognitionLevel,
  MatrixRow,
  MatrixSummary,
  SpecRow,
  ValidationIssue,
  Allocation
} from '../types/exam';
import { CURRICULUM_DATABASE, getYCCDById } from '../data/curriculum';

export function getPointsPerItem(section: Section): number {
  if (section.type === 'true_false') {
    const totalSubItems = section.questionCount * section.subItemsPerQuestion;
    return totalSubItems > 0 ? section.totalPoints / totalSubItems : 0.25;
  }
  return section.questionCount > 0 ? section.totalPoints / section.questionCount : 0.25;
}

export function getSectionItems(section: Section): { tag: string; label: string; questionNum: number; subItemLabel?: string }[] {
  const items: { tag: string; label: string; questionNum: number; subItemLabel?: string }[] = [];
  const subLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

  if (section.type === 'true_false') {
    const subs = section.subItemsPerQuestion || 4;
    for (let q = 1; q <= section.questionCount; q++) {
      for (let s = 0; s < subs; s++) {
        const letter = subLetters[s] || String(s + 1);
        items.push({
          tag: `${q}${letter}`,
          label: `Câu ${q}.${letter}`,
          questionNum: q,
          subItemLabel: letter
        });
      }
    }
  } else if (section.type === 'essay') {
    const map = new Map<number, number>();
    section.essayQuestions?.forEach(e => map.set(e.questionIndex, e.subItemsCount || 1));
    for (let q = 1; q <= section.questionCount; q++) {
      const subs = map.get(q) || 1;
      if (subs > 1) {
        for (let s = 0; s < subs; s++) {
          const letter = subLetters[s] || String(s + 1);
          items.push({
            tag: `${q}${letter}`,
            label: `Câu ${q}.${letter}`,
            questionNum: q,
            subItemLabel: letter
          });
        }
      } else {
        items.push({ tag: `${q}`, label: `Câu ${q}`, questionNum: q });
      }
    }
  } else {
    for (let q = 1; q <= section.questionCount; q++) {
      items.push({ tag: `${q}`, label: `Câu ${q}`, questionNum: q });
    }
  }

  return items;
}

export function calculateMatrixRows(project: ExamProject): MatrixRow[] {
  const { selectedLessonIds, sections, allocations, yccdSelections } = project;
  const activeSections = sections.filter(s => s.enabled);
  const rows: MatrixRow[] = [];

  const chaptersMap = new Map<string, { chapterName: string; lessons: { id: string; name: string }[] }>();

  for (const ch of CURRICULUM_DATABASE) {
    if (ch.subject !== project.generalInfo.subject || ch.grade !== project.generalInfo.grade) continue;
    const matchedLessons = ch.lessons.filter(l => selectedLessonIds.includes(l.id));
    if (matchedLessons.length > 0) {
      chaptersMap.set(ch.id, {
        chapterName: ch.name,
        lessons: matchedLessons.map(l => ({ id: l.id, name: l.name }))
      });
    }
  }

  const allocMap = new Map<string, number>();
  for (const a of allocations) {
    const key = `${a.yccdId}__${a.sectionId}__${a.level}`;
    allocMap.set(key, (allocMap.get(key) || 0) + a.count);
  }

  let totalProjectPoints = activeSections.reduce((sum, s) => sum + s.totalPoints, 0);
  if (totalProjectPoints === 0) totalProjectPoints = 10;

  for (const [chId, chData] of chaptersMap.entries()) {
    chData.lessons.forEach((lesson, lIdx) => {
      const rawLesson = CURRICULUM_DATABASE.find(c => c.id === chId)?.lessons.find(l => l.id === lesson.id);
      const lessonYccds = (rawLesson?.yccds || []).filter(y => yccdSelections[y.id]);

      const sectionLevels: Record<string, Record<CognitionLevel, number>> = {};
      const summaryLevels: Record<CognitionLevel, number> = { NB: 0, TH: 0, VD: 0 };
      let totalItems = 0;
      let totalPoints = 0;

      for (const sec of activeSections) {
        sectionLevels[sec.id] = { NB: 0, TH: 0, VD: 0 };
        const ptPerItem = getPointsPerItem(sec);

        for (const y of lessonYccds) {
          (['NB', 'TH', 'VD'] as CognitionLevel[]).forEach(lvl => {
            const count = allocMap.get(`${y.id}__${sec.id}__${lvl}`) || 0;
            sectionLevels[sec.id][lvl] += count;
            summaryLevels[lvl] += count;
            totalItems += count;
            totalPoints += count * ptPerItem;
          });
        }
      }

      const percentage = totalProjectPoints > 0 ? (totalPoints / totalProjectPoints) * 100 : 0;

      rows.push({
        id: `${chId}__${lesson.id}`,
        chapterId: chId,
        chapterName: chData.chapterName,
        lessonId: lesson.id,
        lessonName: lesson.name,
        isFirstLessonInChapter: lIdx === 0,
        lessonRowCount: chData.lessons.length,
        sectionLevels,
        summaryLevels,
        totalItems,
        totalPoints: Math.round(totalPoints * 100) / 100,
        percentage: Math.round(percentage * 10) / 10
      });
    });
  }

  return rows;
}

export function calculateMatrixSummary(rows: MatrixRow[], project: ExamProject): MatrixSummary {
  const activeSections = project.sections.filter(s => s.enabled);
  const sectionLevels: Record<string, Record<CognitionLevel, number>> = {};
  const sectionTotals: Record<string, number> = {};
  const sectionPoints: Record<string, number> = {};
  const summaryLevels: Record<CognitionLevel, number> = { NB: 0, TH: 0, VD: 0 };
  const summaryLevelPoints: Record<CognitionLevel, number> = { NB: 0, TH: 0, VD: 0 };

  for (const s of activeSections) {
    sectionLevels[s.id] = { NB: 0, TH: 0, VD: 0 };
    sectionTotals[s.id] = 0;
    sectionPoints[s.id] = 0;
  }

  let totalItems = 0;
  let totalPoints = 0;

  for (const row of rows) {
    for (const sec of activeSections) {
      const ptPerItem = getPointsPerItem(sec);
      (['NB', 'TH', 'VD'] as CognitionLevel[]).forEach(lvl => {
        const c = row.sectionLevels[sec.id]?.[lvl] || 0;
        sectionLevels[sec.id][lvl] += c;
        sectionTotals[sec.id] += c;
        sectionPoints[sec.id] += c * ptPerItem;
        summaryLevels[lvl] += c;
        summaryLevelPoints[lvl] += c * ptPerItem;
      });
    }
    totalItems += row.totalItems;
    totalPoints += row.totalPoints;
  }

  for (const s of activeSections) {
    sectionPoints[s.id] = Math.round(sectionPoints[s.id] * 100) / 100;
  }
  (['NB', 'TH', 'VD'] as CognitionLevel[]).forEach(lvl => {
    summaryLevelPoints[lvl] = Math.round(summaryLevelPoints[lvl] * 100) / 100;
  });

  return {
    sectionLevels,
    sectionTotals,
    sectionPoints,
    summaryLevels,
    summaryLevelPoints,
    totalItems,
    totalPoints: Math.round(totalPoints * 100) / 100,
    percentage: 100
  };
}

export function generateSpecificationRows(project: ExamProject): SpecRow[] {
  const { selectedLessonIds, sections, allocations, yccdSelections } = project;
  const activeSections = sections.filter(s => s.enabled);
  const specRows: SpecRow[] = [];

  const tagToLabelMap = new Map<string, Map<string, string>>();
  const allLabelsMap = new Map<string, string[]>();
  const cursorMap = new Map<string, number>();

  for (const sec of activeSections) {
    const items = getSectionItems(sec);
    const m = new Map<string, string>();
    items.forEach(it => m.set(it.tag, it.label));
    tagToLabelMap.set(sec.id, m);
    allLabelsMap.set(sec.id, items.map(it => it.label));
    cursorMap.set(sec.id, 0);
  }

  const allocDetailMap = new Map<string, { count: number; assignedItems?: string[] }>();
  let totalAllocated = 0;

  for (const a of allocations) {
    const key = `${a.yccdId}__${a.sectionId}__${a.level}`;
    const curr = allocDetailMap.get(key) || { count: 0, assignedItems: [] };
    const mergedItems = [...(curr.assignedItems || []), ...(a.assignedItems || [])];
    allocDetailMap.set(key, {
      count: curr.count + a.count,
      assignedItems: mergedItems.length > 0 ? mergedItems : undefined
    });
    totalAllocated += a.count;
  }

  for (const ch of CURRICULUM_DATABASE) {
    if (ch.subject !== project.generalInfo.subject || ch.grade !== project.generalInfo.grade) continue;

    const lessonsInScope = ch.lessons.filter(l => selectedLessonIds.includes(l.id));

    lessonsInScope.forEach((lesson, lIdx) => {
      const activeYccds = lesson.yccds.filter(y => yccdSelections[y.id]);
      if (activeYccds.length === 0) return;

      (['NB', 'TH', 'VD'] as CognitionLevel[]).forEach(lvl => {
        const yccdsWithAlloc = activeYccds.filter(y =>
          activeSections.some(sec => (allocDetailMap.get(`${y.id}__${sec.id}__${lvl}`)?.count || 0) > 0)
        );
        const yccdsDefault = totalAllocated === 0 ? activeYccds.filter(y => y.defaultLevel === lvl) : [];
        const targetYccds = totalAllocated > 0 ? yccdsWithAlloc : yccdsDefault;

        const sectionQuestions: Record<string, string> = {};
        let levelQuestionCount = 0;

        for (const sec of activeSections) {
          let count = 0;
          const assignedLabels: string[] = [];
          const labelsMap = tagToLabelMap.get(sec.id);

          for (const y of activeYccds) {
            const detail = allocDetailMap.get(`${y.id}__${sec.id}__${lvl}`);
            if (detail && detail.count > 0) {
              count += detail.count;
              if (detail.assignedItems && detail.assignedItems.length > 0) {
                detail.assignedItems.forEach(tag => {
                  const lbl = labelsMap?.get(tag) || `Câu ${tag}`;
                  if (!assignedLabels.includes(lbl)) assignedLabels.push(lbl);
                });
              }
            }
          }

          if (count > 0) {
            if (assignedLabels.length > 0) {
              assignedLabels.sort((a, b) => {
                const numA = parseFloat(a.replace(/[^0-9.]/g, '')) || 0;
                const numB = parseFloat(b.replace(/[^0-9.]/g, '')) || 0;
                return numA - numB;
              });
              sectionQuestions[sec.id] = assignedLabels.join(', ');
            } else {
              const allL = allLabelsMap.get(sec.id) || [];
              const start = cursorMap.get(sec.id) || 0;
              const generated: string[] = [];
              for (let i = 0; i < count; i++) {
                generated.push(allL[start + i] || `Câu ${start + i + 1}`);
              }
              cursorMap.set(sec.id, start + count);
              sectionQuestions[sec.id] = generated.join(', ');
            }
            levelQuestionCount += count;
          } else {
            sectionQuestions[sec.id] = '-';
          }
        }

        if (targetYccds.length > 0 || levelQuestionCount > 0) {
          specRows.push({
            id: `${ch.id}__${lesson.id}__${lvl}`,
            chapterId: ch.id,
            chapterName: ch.name,
            lessonId: lesson.id,
            lessonName: lesson.name,
            isFirstLessonInChapter: lIdx === 0 && lvl === 'NB',
            level: lvl,
            yccdList: targetYccds.map(y => {
              const sel = yccdSelections[y.id];
              return {
                id: y.id,
                text: sel?.workingText?.trim() || y.officialText,
                isCustomEdited: !!(sel?.workingText && sel.workingText !== y.officialText)
              };
            }),
            sectionQuestions,
            totalQuestions: levelQuestionCount
          });
        }
      });
    });
  }

  return specRows;
}

export function autoBalanceAllocations(project: ExamProject): Allocation[] {
  const { sections, targetRatio, yccdSelections, allocations: existing } = project;
  const activeSections = sections.filter(s => s.enabled);
  const result: Allocation[] = [];
  const selectedYccds: { id: string; defaultLevel: CognitionLevel }[] = [];

  for (const yId of Object.keys(yccdSelections)) {
    const y = getYCCDById(yId);
    if (y) selectedYccds.push(y);
  }

  if (selectedYccds.length === 0) return existing;

  const lockedAllocs = existing.filter(a => a.locked);
  const usedTagsPerSec = new Map<string, Set<string>>();

  for (const lk of lockedAllocs) {
    result.push({ ...lk });
    if (!usedTagsPerSec.has(lk.sectionId)) usedTagsPerSec.set(lk.sectionId, new Set());
    lk.assignedItems?.forEach(t => usedTagsPerSec.get(lk.sectionId)!.add(t));
  }

  const yccdUsageCount = new Map<string, number>();
  selectedYccds.forEach(y => yccdUsageCount.set(y.id, 0));
  for (const lk of lockedAllocs) {
    const c = yccdUsageCount.get(lk.yccdId) || 0;
    yccdUsageCount.set(lk.yccdId, c + lk.count);
  }

  const totalRatio = targetRatio.NB + targetRatio.TH + targetRatio.VD || 100;
  const pNB = targetRatio.NB / totalRatio;
  const pTH = targetRatio.TH / totalRatio;

  const yccdQuestionMap = new Map<string, Set<number>>();

  for (const sec of activeSections) {
    const allItems = getSectionItems(sec);
    const usedTags = usedTagsPerSec.get(sec.id) || new Set();
    const lockedCount = lockedAllocs.filter(l => l.sectionId === sec.id).reduce((sum, l) => sum + l.count, 0);
    const needToAllocate = Math.max(0, allItems.length - lockedCount);

    if (needToAllocate === 0) continue;

    const availableItems = allItems.filter(it => !usedTags.has(it.tag)).slice(0, needToAllocate);
    if (availableItems.length === 0) continue;

    const nbCount = Math.round(availableItems.length * pNB);
    const thCount = Math.round(availableItems.length * pTH);

    const plannedItems: { item: (typeof availableItems)[0]; level: CognitionLevel }[] = [];
    availableItems.forEach((it, idx) => {
      let lvl: CognitionLevel = 'VD';
      if (idx < nbCount) lvl = 'NB';
      else if (idx < nbCount + thCount) lvl = 'TH';
      plannedItems.push({ item: it, level: lvl });
    });

    for (const { item, level } of plannedItems) {
      const candidates = selectedYccds.filter(
        y => !result.find(r => r.yccdId === y.id && r.sectionId === sec.id && r.level === level)?.locked
      );
      const pool = candidates.length > 0 ? candidates : selectedYccds;

      const chosen = [...pool].sort((a, b) => {
        const countA = yccdUsageCount.get(a.id) || 0;
        const countB = yccdUsageCount.get(b.id) || 0;
        if (countA === 0 && countB > 0) return -1;
        if (countB === 0 && countA > 0) return 1;

        const setA = yccdQuestionMap.get(`${a.id}__${sec.id}`);
        const setB = yccdQuestionMap.get(`${b.id}__${sec.id}`);
        const hasA = setA?.has(item.questionNum) ? 1 : 0;
        const hasB = setB?.has(item.questionNum) ? 1 : 0;

        if (hasA !== hasB) return hasA - hasB;
        if (countA !== countB) return countA - countB;

        const prefA = a.defaultLevel === level ? 0 : 1;
        const prefB = b.defaultLevel === level ? 0 : 1;
        return prefA - prefB;
      })[0];

      if (!chosen) continue;

      yccdUsageCount.set(chosen.id, (yccdUsageCount.get(chosen.id) || 0) + 1);
      const qKey = `${chosen.id}__${sec.id}`;
      if (!yccdQuestionMap.has(qKey)) yccdQuestionMap.set(qKey, new Set());
      yccdQuestionMap.get(qKey)!.add(item.questionNum);

      const existingItem = result.find(r => r.yccdId === chosen.id && r.sectionId === sec.id && r.level === level);
      if (existingItem) {
        existingItem.count += 1;
        if (!existingItem.assignedItems) existingItem.assignedItems = [];
        existingItem.assignedItems.push(item.tag);
      } else {
        result.push({
          sectionId: sec.id,
          yccdId: chosen.id,
          level,
          count: 1,
          assignedItems: [item.tag],
          locked: false
        });
      }
    }
  }

  // Adjust overflow
  for (const sec of activeSections) {
    const targetCount = getSectionItems(sec).length;
    let curr = result.filter(r => r.sectionId === sec.id).reduce((sum, r) => sum + r.count, 0);

    while (curr > targetCount) {
      const removable = result.find(r => r.sectionId === sec.id && !r.locked && r.count > 0);
      if (!removable) break;
      removable.count--;
      removable.assignedItems?.pop();
      curr--;
      if (removable.count === 0) {
        const idx = result.indexOf(removable);
        if (idx >= 0) result.splice(idx, 1);
      }
    }
  }

  return result;
}

export function validateProject(project: ExamProject): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const { generalInfo, sections, allocations, yccdSelections, targetRatio } = project;
  const activeSections = sections.filter(s => s.enabled);

  let totalPoints = activeSections.reduce((sum, s) => sum + s.totalPoints, 0);
  totalPoints = Math.round(totalPoints * 100) / 100;

  if (Math.abs(totalPoints - generalInfo.maxScore) > 0.01) {
    issues.push({
      id: 'val-score-sum',
      type: 'error',
      message: `Tổng điểm các phần thi (${totalPoints}đ) không khớp với thang điểm khai báo (${generalInfo.maxScore}đ).`,
      step: 4,
      field: 'totalPoints'
    });
  }

  if (activeSections.length === 0) {
    issues.push({
      id: 'val-no-sections',
      type: 'error',
      message: 'Chưa kích hoạt phần thi nào. Hãy bật ít nhất một phần trong Bước 4.',
      step: 4
    });
  }

  for (const sec of activeSections) {
    const required = sec.type === 'true_false' ? sec.questionCount * sec.subItemsPerQuestion : sec.questionCount;
    const allocated = allocations.filter(a => a.sectionId === sec.id).reduce((sum, a) => sum + a.count, 0);

    if (allocated !== required) {
      issues.push({
        id: `val-section-count-${sec.id}`,
        type: allocated === 0 ? 'error' : 'warning',
        message: `${sec.title}: đã phân bổ ${allocated}/${required} ${sec.type === 'true_false' ? 'lệnh hỏi' : 'câu'}.`,
        step: 5,
        field: sec.id
      });
    }
  }

  const selectedYccdIds = Object.keys(yccdSelections);
  if (selectedYccdIds.length === 0) {
    issues.push({
      id: 'val-no-yccds',
      type: 'error',
      message: 'Chưa có yêu cầu cần đạt (YCCĐ) nào được chọn trong phạm vi kiểm tra.',
      step: 3
    });
  } else {
    let unallocatedCount = 0;
    for (const yId of selectedYccdIds) {
      if (!allocations.some(a => a.yccdId === yId && a.count > 0)) {
        unallocatedCount++;
      }
    }
    if (unallocatedCount > 0) {
      issues.push({
        id: 'val-unallocated-yccd',
        type: 'warning',
        message: `Có ${unallocatedCount} YCCĐ đã chọn nhưng chưa được phân bổ câu hỏi nào.`,
        step: 5
      });
    }
  }

  const summary = calculateMatrixSummary(calculateMatrixRows(project), project);
  if (summary.totalPoints > 0) {
    const actualNB = Math.round((summary.summaryLevelPoints.NB / summary.totalPoints) * 100);
    const actualTH = Math.round((summary.summaryLevelPoints.TH / summary.totalPoints) * 100);
    const actualVD = Math.round((summary.summaryLevelPoints.VD / summary.totalPoints) * 100);

    const devNB = Math.abs(actualNB - targetRatio.NB);
    const devTH = Math.abs(actualTH - targetRatio.TH);
    const devVD = Math.abs(actualVD - targetRatio.VD);

    if (devNB > 10 || devTH > 10 || devVD > 10) {
      issues.push({
        id: 'val-ratio-deviation',
        type: 'info',
        message: `Tỉ lệ nhận thức hiện tại (${actualNB}% NB - ${actualTH}% TH - ${actualVD}% VD) chênh lệch so với mục tiêu (${targetRatio.NB}% - ${targetRatio.TH}% - ${targetRatio.VD}%).`,
        step: 5
      });
    }
  }

  if (!generalInfo.examName.trim()) {
    issues.push({
      id: 'val-no-exam-name',
      type: 'warning',
      message: 'Chưa nhập Tên bài kiểm tra (ví dụ: "Đề kiểm tra giữa học kì I").',
      step: 1,
      field: 'examName'
    });
  }

  return issues;
}

