import React, { useState } from 'react';
import {
  Grid,
  Sparkles,
  RotateCcw,
  CheckCircle,
  AlertTriangle,
  Lock,
  Unlock,
  Plus,
  Minus,
  ArrowLeft,
  ArrowRight,
  Info,
  X,
  ListOrdered
} from 'lucide-react';
import { ExamProject, Allocation, CognitionLevel } from '../../types/exam';
import { FlatYCCD } from '../../types/curriculum';
import {
  calculateMatrixRows,
  calculateMatrixSummary,
  getSectionItems,
  autoBalanceAllocations
} from '../../services/matrixEngine';
import { getCurriculumBySubjectAndGrade } from '../../data/curriculum';

interface Step5MatrixProps {
  project: ExamProject;
  onChangeAllocations: (allocations: Allocation[]) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const Step5Matrix: React.FC<Step5MatrixProps> = ({
  project,
  onChangeAllocations,
  onNext,
  onPrev
}) => {
  const { sections, allocations, yccdSelections, generalInfo } = project;
  const activeSections = sections.filter(s => s.enabled);

  // Modal states
  const [subItemModalConfig, setSubItemModalConfig] = useState<{
    yccdId: string;
    sectionId: string;
    level: CognitionLevel;
  } | null>(null);

  const [warningModalOpen, setWarningModalOpen] = useState(false);
  const [warningList, setWarningList] = useState<{ type: 'error' | 'warning'; title: string; message: string }[]>([]);

  // Collect all selected YCCDs
  const availableChapters = getCurriculumBySubjectAndGrade(generalInfo.subject, generalInfo.grade);
  const selectedYccds: FlatYCCD[] = [];
  for (const ch of availableChapters) {
    for (const ls of ch.lessons) {
      for (const y of ls.yccds) {
        if (yccdSelections[y.id]) {
          selectedYccds.push(y);
        }
      }
    }
  }

  // Find allocation helper
  const getAlloc = (yccdId: string, sectionId: string, level: CognitionLevel) => {
    return allocations.find(a => a.yccdId === yccdId && a.sectionId === sectionId && a.level === level);
  };

  // Find existing assigned tag
  const findAssignedTag = (sectionId: string, tag: string) => {
    return allocations.find(a => a.sectionId === sectionId && a.assignedItems?.includes(tag));
  };

  // Change count by delta (+1 or -1)
  const handleChangeCount = (yccdId: string, sectionId: string, level: CognitionLevel, delta: number) => {
    const sec = sections.find(s => s.id === sectionId);
    if (!sec) return;

    const idx = allocations.findIndex(a => a.yccdId === yccdId && a.sectionId === sectionId && a.level === level);
    const next = [...allocations];

    if (delta > 0) {
      const allItems = getSectionItems(sec);
      const usedTags = new Set<string>();
      next.forEach(a => {
        if (a.sectionId === sectionId) {
          a.assignedItems?.forEach(t => usedTags.add(t));
        }
      });
      const firstUnused = allItems.find(it => !usedTags.has(it.tag));

      if (idx >= 0) {
        const item = next[idx];
        const tags = [...(item.assignedItems || [])];
        if (firstUnused) tags.push(firstUnused.tag);
        next[idx] = { ...item, count: item.count + 1, assignedItems: tags };
      } else {
        next.push({
          yccdId,
          sectionId,
          level,
          count: 1,
          assignedItems: firstUnused ? [firstUnused.tag] : [],
          locked: false
        });
      }
    } else if (idx >= 0) {
      const item = next[idx];
      const count = Math.max(0, item.count - 1);
      const tags = [...(item.assignedItems || [])];
      if (tags.length > 0) tags.pop();

      if (count === 0 && !item.locked) {
        next.splice(idx, 1);
      } else {
        next[idx] = { ...item, count, assignedItems: tags };
      }
    }

    onChangeAllocations(next);
  };

  // Toggle single tag in sub-item modal
  const handleToggleTag = (yccdId: string, sectionId: string, level: CognitionLevel, tag: string) => {
    const next = [...allocations];

    for (let i = 0; i < next.length; i++) {
      const a = next[i];
      if (a.sectionId === sectionId && a.assignedItems?.includes(tag)) {
        if (a.yccdId === yccdId && a.level === level) {
          const filtered = a.assignedItems.filter(t => t !== tag);
          if (filtered.length === 0 && !a.locked) {
            next.splice(i, 1);
          } else {
            next[i] = { ...a, assignedItems: filtered, count: filtered.length };
          }
          onChangeAllocations(next);
          return;
        } else {
          const filtered = a.assignedItems.filter(t => t !== tag);
          if (filtered.length === 0 && !a.locked) {
            next.splice(i, 1);
            i--;
          } else {
            next[i] = { ...a, assignedItems: filtered, count: filtered.length };
          }
        }
      }
    }

    const idx = next.findIndex(a => a.yccdId === yccdId && a.sectionId === sectionId && a.level === level);
    if (idx >= 0) {
      const item = next[idx];
      const tags = [...(item.assignedItems || []), tag].sort();
      next[idx] = { ...item, assignedItems: tags, count: tags.length };
    } else {
      next.push({
        yccdId,
        sectionId,
        level,
        count: 1,
        assignedItems: [tag],
        locked: false
      });
    }

    onChangeAllocations(next);
  };

  // Assign all remaining free tags to this cell
  const handleAssignAllFreeTags = (yccdId: string, sectionId: string, level: CognitionLevel) => {
    const sec = sections.find(s => s.id === sectionId);
    if (!sec) return;

    const allItems = getSectionItems(sec);
    const usedTags = new Set<string>();
    allocations.forEach(a => {
      if (a.sectionId === sectionId) a.assignedItems?.forEach(t => usedTags.add(t));
    });

    const freeTags = allItems.filter(it => !usedTags.has(it.tag)).map(it => it.tag);
    if (freeTags.length === 0) return;

    const next = [...allocations];
    const idx = next.findIndex(a => a.yccdId === yccdId && a.sectionId === sectionId && a.level === level);

    if (idx >= 0) {
      const item = next[idx];
      const tags = [...(item.assignedItems || []), ...freeTags].sort();
      next[idx] = { ...item, assignedItems: tags, count: tags.length };
    } else {
      next.push({
        yccdId,
        sectionId,
        level,
        count: freeTags.length,
        assignedItems: freeTags,
        locked: false
      });
    }

    onChangeAllocations(next);
  };

  // Clear all tags in this cell
  const handleClearCell = (yccdId: string, sectionId: string, level: CognitionLevel) => {
    onChangeAllocations(allocations.filter(a => a.yccdId !== yccdId || a.sectionId !== sectionId || a.level !== level));
  };

  // Toggle lock
  const handleToggleLock = (yccdId: string, sectionId: string, level: CognitionLevel) => {
    const idx = allocations.findIndex(a => a.yccdId === yccdId && a.sectionId === sectionId && a.level === level);
    const next = [...allocations];
    if (idx >= 0) {
      next[idx] = { ...next[idx], locked: !next[idx].locked };
    } else {
      next.push({
        yccdId,
        sectionId,
        level,
        count: 0,
        locked: true
      });
    }
    onChangeAllocations(next);
  };

  // Auto balance
  const handleAutoBalance = () => {
    onChangeAllocations(autoBalanceAllocations(project));
  };

  // Reset unlocked
  const handleResetUnlocked = () => {
    onChangeAllocations(allocations.filter(a => a.locked));
  };

  const matrixSummary = calculateMatrixSummary(calculateMatrixRows(project), project);
  const coveredCount = selectedYccds.filter(y => allocations.some(a => a.yccdId === y.id && a.count > 0)).length;
  const isAllCovered = selectedYccds.length > 0 && coveredCount === selectedYccds.length;

  const getSectionTheme = (type: string) => {
    switch (type) {
      case 'multiple_choice':
        return {
          headerBg: 'bg-blue-900 text-blue-100',
          subHeaderBg: 'bg-blue-950/60 text-blue-200',
          cellBg: 'bg-blue-50/25',
          borderRight: 'border-r-2 border-slate-300',
          headerBorderRight: 'border-r-2 border-slate-700',
          badgeStyle: 'bg-blue-100 text-blue-800 border-blue-200',
          activeBg: 'bg-blue-50 border-blue-300 text-blue-900'
        };
      case 'true_false':
        return {
          headerBg: 'bg-emerald-900 text-emerald-100',
          subHeaderBg: 'bg-emerald-950/60 text-emerald-200',
          cellBg: 'bg-emerald-50/25',
          borderRight: 'border-r-2 border-slate-300',
          headerBorderRight: 'border-r-2 border-slate-700',
          badgeStyle: 'bg-emerald-100 text-emerald-800 border-emerald-200',
          activeBg: 'bg-emerald-50 border-emerald-300 text-emerald-900'
        };
      case 'short_answer':
        return {
          headerBg: 'bg-purple-900 text-purple-100',
          subHeaderBg: 'bg-purple-950/60 text-purple-200',
          cellBg: 'bg-purple-50/25',
          borderRight: 'border-r-2 border-slate-300',
          headerBorderRight: 'border-r-2 border-slate-700',
          badgeStyle: 'bg-purple-100 text-purple-800 border-purple-200',
          activeBg: 'bg-purple-50 border-purple-300 text-purple-900'
        };
      default:
        return {
          headerBg: 'bg-amber-900 text-amber-100',
          subHeaderBg: 'bg-amber-950/60 text-amber-200',
          cellBg: 'bg-amber-50/25',
          borderRight: 'border-r-2 border-slate-300',
          headerBorderRight: 'border-r-2 border-slate-700',
          badgeStyle: 'bg-amber-100 text-amber-800 border-amber-200',
          activeBg: 'bg-amber-50 border-amber-300 text-amber-900'
        };
    }
  };

  const checkValidation = () => {
    const list: { type: 'error' | 'warning'; title: string; message: string }[] = [];

    for (const sec of activeSections) {
      const required =
        sec.type === 'true_false'
          ? sec.questionCount * 4
          : sec.type === 'essay' && sec.essayQuestions && sec.essayQuestions.length > 0
          ? sec.essayQuestions.filter(q => q.questionIndex <= sec.questionCount).reduce((sum, q) => sum + (q.subItemsCount || 1), 0)
          : sec.questionCount;
      const count = allocations.filter(a => a.sectionId === sec.id).reduce((sum, a) => sum + a.count, 0);

      if (count < required) {
        list.push({
          type: 'error',
          title: `Phần ${sec.title}: Chưa đủ số câu`,
          message: `Cấu hình yêu cầu ${required} ${sec.type === 'true_false' ? 'lệnh hỏi' : 'câu'}, hiện mới phân bổ ${count} (còn thiếu ${required - count} ${sec.type === 'true_false' ? 'lệnh hỏi' : 'câu'}).`
        });
      } else if (count > required) {
        list.push({
          type: 'error',
          title: `Phần ${sec.title}: Vượt quá số câu`,
          message: `Cấu hình yêu cầu ${required} ${sec.type === 'true_false' ? 'lệnh hỏi' : 'câu'}, nhưng đang phân bổ ${count} (dư ${count - required} ${sec.type === 'true_false' ? 'lệnh hỏi' : 'câu'}).`
        });
      }
    }

    if (Math.abs(matrixSummary.totalPoints - generalInfo.maxScore) > 0.01) {
      list.push({
        type: 'warning',
        title: 'Tổng điểm ma trận chưa khớp thang điểm đề',
        message: `Tổng điểm các câu hỏi đã phân bổ là ${matrixSummary.totalPoints.toFixed(
          2
        )}đ, lệch ${Math.abs(matrixSummary.totalPoints - generalInfo.maxScore).toFixed(2)}đ so với thang điểm đề (${
          generalInfo.maxScore
        }đ).`
      });
    }

    const uncovered = selectedYccds.filter(y => !allocations.some(a => a.yccdId === y.id && a.count > 0));
    if (uncovered.length > 0) {
      list.push({
        type: 'warning',
        title: `Còn ${uncovered.length} YCCĐ chưa có câu hỏi`,
        message: `Có ${uncovered.length}/${selectedYccds.length} YCCĐ đã tích chọn ở Bước 3 nhưng chưa được phân bổ câu hỏi nào.`
      });
    }

    return list;
  };

  const handleNextClick = () => {
    const issues = checkValidation();
    if (issues.length > 0) {
      setWarningList(issues);
      setWarningModalOpen(true);
    } else {
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      {/* Intro Header & Action Buttons */}
      <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-slate-50 border border-blue-200/80 rounded-2xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start space-x-3.5">
          <div className="p-2.5 bg-blue-600 rounded-xl text-white shadow-xs shrink-0">
            <Grid className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-base font-bold text-slate-900">Bước 5: Phân bổ số câu & Gán ý hỏi</h3>
              {isAllCovered ? (
                <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 text-emerald-600" />
                  Đã phủ kín 100% YCCĐ
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3 text-amber-600" />
                  Phủ {coveredCount}/{selectedYccds.length} YCCĐ
                </span>
              )}
            </div>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Tùy chỉnh số lượng câu ở mỗi ô nhận thức (NB, TH, VD). Với câu{' '}
              <strong className="text-emerald-700">Đúng - Sai</strong> và{' '}
              <strong className="text-amber-700">Tự luận</strong>, khi có câu hỏi (&gt;0) sẽ hiển thị chi tiết các ý{' '}
              <strong className="font-mono text-blue-700">1a, 1b...</strong> để dàn trải sang nhiều YCCĐ.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={handleAutoBalance}
            className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-600/20 transition cursor-pointer"
            title="Tự động phân bổ phủ kín 100% YCCĐ đã chọn và phân chia đều các ý 1a, 1b, 1c, 1d"
          >
            <Sparkles className="w-4 h-4" />
            <span>Tự động phân bổ (Phủ kín YCCĐ)</span>
          </button>

          <button
            type="button"
            onClick={handleResetUnlocked}
            className="flex items-center space-x-1.5 px-3 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition cursor-pointer"
            title="Đặt lại các ô chưa khóa về 0"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span>Xóa ô chưa khóa</span>
          </button>
        </div>
      </div>

      {/* Progress Monitor Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {activeSections.map(sec => {
          const count = allocations.filter(a => a.sectionId === sec.id).reduce((sum, a) => sum + a.count, 0);
          const required =
            sec.type === 'true_false'
              ? sec.questionCount * 4
              : sec.type === 'essay' && sec.essayQuestions && sec.essayQuestions.length > 0
              ? sec.essayQuestions.filter(q => q.questionIndex <= sec.questionCount).reduce((sum, q) => sum + (q.subItemsCount || 1), 0)
              : sec.questionCount;
          const isDone = count === required;
          const isOver = count > required;

          return (
            <div
              key={sec.id}
              className={`p-3.5 rounded-2xl border transition shadow-2xs ${
                isDone ? 'bg-emerald-50/60 border-emerald-300' : isOver ? 'bg-red-50/60 border-red-300' : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-slate-800 line-clamp-1">{sec.title}</span>
                <span
                  className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                    isDone ? 'bg-emerald-100 text-emerald-800' : isOver ? 'bg-red-100 text-red-800' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {count}/{required} {sec.type === 'true_false' ? 'lệnh hỏi' : 'câu'}
                </span>
              </div>
              <div className="w-full bg-slate-200/80 rounded-full h-1.5 overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    isDone ? 'bg-emerald-500' : isOver ? 'bg-red-500' : 'bg-blue-600'
                  }`}
                  style={{ width: `${Math.min(100, (count / (required || 1)) * 100)}%` }}
                />
              </div>
            </div>
          );
        })}

        <div className="p-3.5 rounded-2xl border border-slate-200 bg-white shadow-2xs">
          <div className="flex items-center justify-between mb-1 text-xs">
            <span className="font-bold text-slate-800">Tỉ lệ NB - TH - VD</span>
            <span className="text-[10px] font-semibold text-blue-700">Tổng: {matrixSummary.totalPoints.toFixed(2)}đ</span>
          </div>
          <div className="flex items-center justify-between text-[11px] font-semibold pt-1">
            <span className="text-blue-700">
              NB: {matrixSummary.summaryLevelPoints.NB.toFixed(1)}đ (
              {matrixSummary.totalPoints > 0
                ? ((matrixSummary.summaryLevelPoints.NB / matrixSummary.totalPoints) * 100).toFixed(0)
                : 0}
              %)
            </span>
            <span className="text-emerald-700">
              TH: {matrixSummary.summaryLevelPoints.TH.toFixed(1)}đ (
              {matrixSummary.totalPoints > 0
                ? ((matrixSummary.summaryLevelPoints.TH / matrixSummary.totalPoints) * 100).toFixed(0)
                : 0}
              %)
            </span>
            <span className="text-amber-700">
              VD: {matrixSummary.summaryLevelPoints.VD.toFixed(1)}đ (
              {matrixSummary.totalPoints > 0
                ? ((matrixSummary.summaryLevelPoints.VD / matrixSummary.totalPoints) * 100).toFixed(0)
                : 0}
              %)
            </span>
          </div>
        </div>
      </div>

      {/* Cross-Matrix Grid Table */}
      <div className="bg-white rounded-2xl border border-slate-300 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-xs">
            <thead>
              <tr className="border-b border-slate-700">
                <th
                  rowSpan={2}
                  className="p-3 text-center w-14 font-bold bg-slate-900 text-white border-r-2 border-slate-700"
                >
                  Mã YCCĐ
                </th>
                <th
                  rowSpan={2}
                  className="p-3 min-w-[260px] font-bold bg-slate-900 text-white border-r-2 border-slate-700"
                >
                  Nội dung Yêu cầu cần đạt
                </th>
                {activeSections.map(sec => {
                  const theme = getSectionTheme(sec.type);
                  return (
                    <th
                      key={sec.id}
                      colSpan={3}
                      className={`p-2.5 text-center font-bold tracking-wide uppercase text-[11px] ${theme.headerBg} ${theme.headerBorderRight}`}
                    >
                      {sec.shortTitle}
                    </th>
                  );
                })}
                <th
                  colSpan={3}
                  className="p-2.5 text-center font-bold tracking-wide uppercase text-[11px] bg-slate-800 text-white border-r-2 border-slate-700"
                >
                  Tổng hợp mức độ
                </th>
                <th rowSpan={2} className="p-2 text-center w-16 font-bold bg-slate-900 text-white">
                  Tổng câu
                </th>
              </tr>

              <tr className="border-b border-slate-600 text-slate-200">
                {activeSections.map(sec => {
                  const theme = getSectionTheme(sec.type);
                  return (
                    <React.Fragment key={sec.id}>
                      <th className={`p-1.5 text-center border-l border-slate-700/80 w-24 font-bold text-blue-300 ${theme.subHeaderBg}`}>
                        NB
                      </th>
                      <th className={`p-1.5 text-center border-l border-slate-700/60 w-24 font-bold text-emerald-300 ${theme.subHeaderBg}`}>
                        TH
                      </th>
                      <th className={`p-1.5 text-center border-l border-slate-700/60 w-24 font-bold text-amber-300 ${theme.subHeaderBg} ${theme.headerBorderRight}`}>
                        VD
                      </th>
                    </React.Fragment>
                  );
                })}
                <th className="p-1.5 text-center border-l border-slate-700 text-blue-300 w-12 bg-slate-800 font-bold">
                  NB
                </th>
                <th className="p-1.5 text-center text-emerald-300 w-12 bg-slate-800 font-bold">
                  TH
                </th>
                <th className="p-1.5 text-center text-amber-300 w-12 bg-slate-800 font-bold border-r-2 border-slate-700">
                  VD
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {selectedYccds.length === 0 ? (
                <tr>
                  <td colSpan={activeSections.length * 3 + 6} className="p-8 text-center text-slate-500">
                    Chưa có YCCĐ nào được chọn trong Bước 3. Vui lòng quay lại Bước 3 để tích chọn YCCĐ.
                  </td>
                </tr>
              ) : (
                selectedYccds.map(y => {
                  const displayText = yccdSelections[y.id]?.workingText || y.officialText;
                  let sumNB = 0;
                  let sumTH = 0;
                  let sumVD = 0;

                  for (const s of activeSections) {
                    sumNB += getAlloc(y.id, s.id, 'NB')?.count || 0;
                    sumTH += getAlloc(y.id, s.id, 'TH')?.count || 0;
                    sumVD += getAlloc(y.id, s.id, 'VD')?.count || 0;
                  }
                  const totalRow = sumNB + sumTH + sumVD;

                  return (
                    <tr
                      key={y.id}
                      className={`hover:bg-blue-50/30 transition ${totalRow === 0 ? 'bg-amber-50/20' : ''}`}
                    >
                      <td className="p-2.5 text-center font-mono font-bold text-slate-700 text-[11px] bg-slate-50/80 border-r-2 border-slate-200">
                        {y.id}
                      </td>
                      <td className="p-2.5 border-r-2 border-slate-200">
                        <p className="text-slate-800 line-clamp-2 leading-relaxed" title={displayText}>
                          {displayText}
                        </p>
                        <span className="text-[10px] text-slate-400 block mt-0.5">
                          {y.chapterName} • {y.lessonName}
                        </span>
                      </td>

                      {activeSections.map(sec => {
                        const theme = getSectionTheme(sec.type);
                        const isSubItemSection = sec.type === 'true_false' || sec.type === 'essay';

                        return (['NB', 'TH', 'VD'] as CognitionLevel[]).map((lvl, lIdx) => {
                          const alloc = getAlloc(y.id, sec.id, lvl);
                          const count = alloc?.count || 0;
                          const assignedTags = alloc?.assignedItems || [];
                          const isLocked = !!alloc?.locked;
                          const borderCls = lIdx === 2 ? theme.borderRight : 'border-r border-slate-200';

                          return (
                            <td key={`${sec.id}-${lvl}`} className={`p-1.5 text-center relative group align-top ${theme.cellBg} ${borderCls}`}>
                              <div
                                className={`rounded-xl border p-1.5 transition flex flex-col items-center justify-between min-h-[58px] ${
                                  count > 0 ? theme.activeBg : 'bg-white border-slate-200 text-slate-400 hover:border-slate-300'
                                }`}
                              >
                                <div className="flex items-center justify-between w-full">
                                  <button
                                    type="button"
                                    onClick={e => {
                                      e.stopPropagation();
                                      handleChangeCount(y.id, sec.id, lvl, -1);
                                    }}
                                    disabled={count === 0}
                                    className="w-5 h-6 rounded text-slate-400 hover:text-slate-800 hover:bg-slate-100 disabled:opacity-20 flex items-center justify-center cursor-pointer disabled:cursor-not-allowed transition"
                                    title="Giảm 1 câu"
                                  >
                                    <Minus className="w-3 h-3 stroke-[2.5]" />
                                  </button>

                                  <span className={`font-bold text-xs px-1.5 py-0.5 rounded ${count > 0 ? 'text-slate-900' : 'text-slate-400'}`}>
                                    {count}
                                  </span>

                                  <button
                                    type="button"
                                    onClick={e => {
                                      e.stopPropagation();
                                      handleChangeCount(y.id, sec.id, lvl, 1);
                                    }}
                                    className="w-5 h-6 rounded text-slate-500 hover:text-blue-600 hover:bg-slate-100 flex items-center justify-center cursor-pointer transition"
                                    title="Tăng 1 câu"
                                  >
                                    <Plus className="w-3 h-3 stroke-[2.5]" />
                                  </button>
                                </div>

                                {isSubItemSection && count > 0 && (
                                  <div
                                    onClick={() => setSubItemModalConfig({ yccdId: y.id, sectionId: sec.id, level: lvl })}
                                    className="flex flex-wrap gap-0.5 justify-center mt-1 cursor-pointer hover:opacity-85"
                                    title="Bấm để tùy chỉnh các ý hỏi (1a, 1b...)"
                                  >
                                    {assignedTags.length > 0 ? (
                                      assignedTags.map(t => (
                                        <span key={t} className={`px-1 py-0.2 rounded text-[10px] font-mono font-bold border ${theme.badgeStyle}`}>
                                          {t}
                                        </span>
                                      ))
                                    ) : (
                                      <span className="text-[9px] text-blue-600 underline font-medium cursor-pointer">
                                        Gán ý...
                                      </span>
                                    )}
                                  </div>
                                )}
                              </div>

                              {/* Lock toggle button */}
                              <button
                                type="button"
                                onClick={() => handleToggleLock(y.id, sec.id, lvl)}
                                className={`absolute top-1 right-1 p-0.5 rounded transition ${
                                  isLocked
                                    ? 'text-amber-600 hover:text-amber-700'
                                    : 'text-slate-300 opacity-0 group-hover:opacity-100 hover:text-slate-500'
                                }`}
                                title={isLocked ? 'Đã khóa: không đổi khi tự động phân bổ' : 'Khóa ô này'}
                              >
                                {isLocked ? <Lock className="w-2.5 h-2.5" /> : <Unlock className="w-2.5 h-2.5" />}
                              </button>
                            </td>
                          );
                        });
                      })}

                      {/* Row totals */}
                      <td className="p-2 text-center border-l border-slate-200 font-bold text-blue-700 bg-slate-50">
                        {sumNB || ''}
                      </td>
                      <td className="p-2 text-center font-bold text-emerald-700 bg-slate-50">
                        {sumTH || ''}
                      </td>
                      <td className="p-2 text-center font-bold text-amber-700 bg-slate-50 border-r-2 border-slate-300">
                        {sumVD || ''}
                      </td>
                      <td className={`p-2 text-center font-extrabold ${totalRow === 0 ? 'text-red-500 bg-red-50' : 'text-slate-900 bg-slate-100'}`}>
                        {totalRow || 0}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>

            <tfoot>
              <tr className="bg-slate-100 font-bold text-slate-900 border-t-2 border-slate-300">
                <td colSpan={2} className="p-3 text-right border-r-2 border-slate-200">
                  Tổng số câu / lệnh hỏi:
                </td>
                {activeSections.map(sec => (
                  <React.Fragment key={sec.id}>
                    <td className="p-2 text-center border-l border-slate-200 text-blue-700 font-extrabold">
                      {matrixSummary.sectionLevels[sec.id]?.NB || 0}
                    </td>
                    <td className="p-2 text-center text-emerald-700 font-extrabold">
                      {matrixSummary.sectionLevels[sec.id]?.TH || 0}
                    </td>
                    <td className="p-2 text-center text-amber-700 font-extrabold border-r-2 border-slate-300">
                      {matrixSummary.sectionLevels[sec.id]?.VD || 0}
                    </td>
                  </React.Fragment>
                ))}
                <td className="p-2 text-center border-l border-slate-200 text-blue-700 font-extrabold">
                  {matrixSummary.summaryLevels.NB}
                </td>
                <td className="p-2 text-center text-emerald-700 font-extrabold">
                  {matrixSummary.summaryLevels.TH}
                </td>
                <td className="p-2 text-center text-amber-700 font-extrabold border-r-2 border-slate-300">
                  {matrixSummary.summaryLevels.VD}
                </td>
                <td className="p-2 text-center text-slate-900 font-black">
                  {matrixSummary.totalItems}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Sub-item Tag Mapping Modal */}
      {subItemModalConfig && (() => {
        const sec = sections.find(s => s.id === subItemModalConfig.sectionId);
        const yccd = selectedYccds.find(y => y.id === subItemModalConfig.yccdId);
        if (!sec || !yccd) return null;

        const currentTags = getAlloc(yccd.id, sec.id, subItemModalConfig.level)?.assignedItems || [];
        const allItems = getSectionItems(sec);
        const grouped = new Map<number, typeof allItems>();

        allItems.forEach(it => {
          const list = grouped.get(it.questionNum) || [];
          list.push(it);
          grouped.set(it.questionNum, list);
        });

        const levelBadgeColor =
          subItemModalConfig.level === 'NB'
            ? 'bg-blue-600 text-white'
            : subItemModalConfig.level === 'TH'
            ? 'bg-emerald-600 text-white'
            : 'bg-amber-600 text-white';
        const levelLabel =
          subItemModalConfig.level === 'NB'
            ? 'Nhận biết (NB)'
            : subItemModalConfig.level === 'TH'
            ? 'Thông hiểu (TH)'
            : 'Vận dụng (VD)';

        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
              <div className="p-5 border-b border-slate-100 flex items-start justify-between bg-slate-50">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono font-bold text-xs bg-slate-200 text-slate-800 px-2 py-0.5 rounded">
                      {yccd.id}
                    </span>
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${levelBadgeColor}`}>
                      {levelLabel}
                    </span>
                    <span className="text-xs font-semibold text-slate-700">{sec.title}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 leading-snug">
                    Phân bổ chi tiết lệnh hỏi & ý câu hỏi
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-2">{yccd.officialText}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSubItemModalConfig(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="px-5 py-2.5 bg-blue-50/70 border-b border-blue-100 text-xs text-blue-900 flex items-center space-x-2">
                <Info className="w-4 h-4 text-blue-600 shrink-0" />
                <span>
                  Bấm vào từng ý hỏi (<strong className="font-mono">1a, 1b, 1c, 1d...</strong>) để gán hoặc bỏ gán vào
                  YCCĐ này. Có thể phân bổ các ý của cùng một câu dàn trải sang nhiều YCCĐ khác nhau!
                </span>
              </div>

              <div className="p-5 overflow-y-auto space-y-4 flex-1">
                {Array.from(grouped.entries()).map(([qNum, items]) => (
                  <div key={qNum} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900 flex items-center space-x-1.5">
                        <ListOrdered className="w-3.5 h-3.5 text-blue-600" />
                        <span>Câu {qNum}</span>
                        <span className="text-slate-400 font-normal">
                          ({items.length} {sec.type === 'true_false' ? 'lệnh hỏi' : 'ý hỏi'})
                        </span>
                      </span>
                      <span className="text-[11px] text-slate-500">
                        Đang chọn tại ô này:{' '}
                        <strong className="text-blue-700">
                          {items.filter(it => currentTags.includes(it.tag)).length}
                        </strong>
                        /{items.length}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {items.map(it => {
                        const isChosenInThisCell = currentTags.includes(it.tag);
                        const assignedOther = isChosenInThisCell ? undefined : findAssignedTag(sec.id, it.tag);

                        return (
                          <button
                            key={it.tag}
                            type="button"
                            onClick={() => handleToggleTag(yccd.id, sec.id, subItemModalConfig.level, it.tag)}
                            className={`p-2 rounded-xl text-xs font-semibold border flex flex-col items-center justify-center transition cursor-pointer text-center ${
                              isChosenInThisCell
                                ? 'bg-blue-600 text-white border-blue-700 shadow-xs'
                                : assignedOther
                                ? 'bg-slate-100 text-slate-500 border-slate-200 hover:border-amber-300'
                                : 'bg-white text-slate-700 border-dashed border-slate-300 hover:border-blue-400 hover:bg-blue-50/30'
                            }`}
                          >
                            <span className="font-mono font-bold text-sm">{it.tag}</span>
                            <span className="text-[10px] mt-0.5 line-clamp-1">
                              {isChosenInThisCell
                                ? '✓ Đang chọn'
                                : assignedOther
                                ? `Ở ${assignedOther.yccdId} (${assignedOther.level})`
                                : '+ Chưa gán'}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-slate-100 bg-slate-50 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => handleAssignAllFreeTags(yccd.id, sec.id, subItemModalConfig.level)}
                    className="px-3 py-1.5 rounded-xl border border-blue-300 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold transition cursor-pointer"
                  >
                    + Gán tất cả ý trống còn lại
                  </button>
                  <button
                    type="button"
                    onClick={() => handleClearCell(yccd.id, sec.id, subItemModalConfig.level)}
                    className="px-3 py-1.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-600 text-xs font-medium transition cursor-pointer"
                  >
                    Xóa tất cả ý khỏi ô này
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setSubItemModalConfig(null)}
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition cursor-pointer"
                >
                  Xong / Đóng
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Warning Modal */}
      {warningModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="p-5 border-b border-amber-100 bg-amber-50/80 flex items-start space-x-3">
              <div className="p-2.5 bg-amber-500 rounded-xl text-white shadow-xs shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-amber-950">Cảnh báo cấu trúc đề chưa hoàn thiện</h4>
                <p className="text-xs text-amber-800 mt-0.5">
                  Hệ thống phát hiện một số điểm chưa khớp với cấu trúc đề đã khai báo:
                </p>
              </div>
            </div>

            <div className="p-5 space-y-2.5 max-h-[60vh] overflow-y-auto">
              {warningList.map((item, idx) => {
                const isErr = item.type === 'error';
                return (
                  <div
                    key={idx}
                    className={`p-3 rounded-2xl border text-xs flex items-start space-x-2.5 ${
                      isErr ? 'bg-red-50/70 border-red-200 text-red-900' : 'bg-amber-50/70 border-amber-200 text-amber-900'
                    }`}
                  >
                    {isErr ? (
                      <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    ) : (
                      <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <h5 className="font-bold">{item.title}</h5>
                      <p className="text-slate-600 mt-0.5 leading-relaxed">{item.message}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setWarningModalOpen(false)}
                className="px-5 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold transition cursor-pointer"
              >
                Ở lại điều chỉnh
              </button>

              <button
                type="button"
                onClick={() => {
                  setWarningModalOpen(false);
                  onNext();
                }}
                className="flex items-center space-x-1.5 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-md shadow-amber-600/20 transition cursor-pointer"
              >
                <span>Vẫn tiếp tục sang Bước 6</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <button
          type="button"
          onClick={onPrev}
          className="flex items-center space-x-2 px-5 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-medium transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại: Cấu trúc đề</span>
        </button>

        <button
          type="button"
          onClick={handleNextClick}
          className="flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md shadow-blue-600/30 transition cursor-pointer"
        >
          <span>Tiếp tục: Xem Ma trận & Đặc tả</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

