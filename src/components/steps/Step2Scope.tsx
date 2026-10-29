import React, { useState } from 'react';
import {
  Layers,
  Search,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  Check,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';
import { ExamProject, getSubjectName } from '../../types/exam';
import { getCurriculumBySubjectAndGrade } from '../../data/curriculum';

interface Step2ScopeProps {
  project: ExamProject;
  onUpdateSelection: (chapterIds: string[], lessonIds: string[]) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const Step2Scope: React.FC<Step2ScopeProps> = ({
  project,
  onUpdateSelection,
  onNext,
  onPrev
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [collapsedChapters, setCollapsedChapters] = useState<Record<string, boolean>>({});

  const availableChapters = getCurriculumBySubjectAndGrade(
    project.generalInfo.subject,
    project.generalInfo.grade
  );

  const toggleChapterCollapse = (chapterId: string) => {
    setCollapsedChapters(prev => ({ ...prev, [chapterId]: !prev[chapterId] }));
  };

  const handleToggleChapter = (chapterId: string) => {
    const chapter = availableChapters.find(c => c.id === chapterId);
    if (!chapter) return;

    const lessonIds = chapter.lessons.map(l => l.id);
    const isChapterSelected = project.selectedChapterIds.includes(chapterId);

    let nextChapters: string[];
    let nextLessons: string[];

    if (isChapterSelected) {
      nextChapters = project.selectedChapterIds.filter(id => id !== chapterId);
      nextLessons = project.selectedLessonIds.filter(id => !lessonIds.includes(id));
    } else {
      nextChapters = [...project.selectedChapterIds, chapterId];
      const newLessons = lessonIds.filter(id => !project.selectedLessonIds.includes(id));
      nextLessons = [...project.selectedLessonIds, ...newLessons];
    }

    onUpdateSelection(nextChapters, nextLessons);
  };

  const handleToggleLesson = (chapterId: string, lessonId: string) => {
    const isSelected = project.selectedLessonIds.includes(lessonId);
    let nextLessons: string[];

    if (isSelected) {
      nextLessons = project.selectedLessonIds.filter(id => id !== lessonId);
    } else {
      nextLessons = [...project.selectedLessonIds, lessonId];
    }

    const chapterLessons = availableChapters.find(c => c.id === chapterId)?.lessons || [];
    const hasRemainingInChapter = chapterLessons.some(l => nextLessons.includes(l.id));

    let nextChapters = [...project.selectedChapterIds];
    if (hasRemainingInChapter && !nextChapters.includes(chapterId)) {
      nextChapters.push(chapterId);
    } else if (!hasRemainingInChapter && nextChapters.includes(chapterId)) {
      nextChapters = nextChapters.filter(id => id !== chapterId);
    }

    onUpdateSelection(nextChapters, nextLessons);
  };

  const selectAll = () => {
    const allChapters = availableChapters.map(c => c.id);
    const allLessons = availableChapters.flatMap(c => c.lessons.map(l => l.id));
    onUpdateSelection(allChapters, allLessons);
  };

  const clearAll = () => {
    onUpdateSelection([], []);
  };

  const filteredChapters = availableChapters.filter(ch => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const chMatch = ch.name.toLowerCase().includes(q);
    const lessonMatch = ch.lessons.some(l => l.name.toLowerCase().includes(q));
    return chMatch || lessonMatch;
  });

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-indigo-600 rounded-xl text-white shadow-xs">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Bước 2: Chọn phạm vi kiến thức kiểm tra</h3>
            <p className="text-sm text-slate-600 mt-0.5">
              Chọn các chương và bài học kiểm tra cho môn{' '}
              <span className="font-semibold text-blue-700">
                {getSubjectName(project.generalInfo.subject)} {project.generalInfo.grade}
              </span>
              . YCCĐ tương ứng sẽ được tự động đồng bộ sang bước tiếp theo.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <button
            type="button"
            onClick={selectAll}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 shadow-xs cursor-pointer"
          >
            Chọn tất cả
          </button>
          <button
            type="button"
            onClick={clearAll}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 shadow-xs cursor-pointer"
          >
            Bỏ chọn
          </button>
        </div>
      </div>

      {/* Search & Stats Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm bài học, chủ đề kiến thức..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-xs"
          />
        </div>

        <div className="flex items-center space-x-2 text-xs text-slate-600 bg-slate-100 px-3.5 py-2.5 rounded-xl">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          <span>
            Đã chọn <strong>{project.selectedLessonIds.length}</strong> bài học thuộc{' '}
            <strong>{project.selectedChapterIds.length}</strong> chương
          </span>
        </div>
      </div>

      {/* Chapters & Lessons List */}
      <div className="space-y-3">
        {filteredChapters.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-500">
            Không tìm thấy chương hoặc bài học nào phù hợp với từ khóa "{searchQuery}".
          </div>
        ) : (
          filteredChapters.map(ch => {
            const isCollapsed = collapsedChapters[ch.id] ?? false;
            const selectedLessonsInCh = ch.lessons.filter(l => project.selectedLessonIds.includes(l.id));
            const isAllSelected = ch.lessons.length > 0 && selectedLessonsInCh.length === ch.lessons.length;
            const isPartiallySelected = selectedLessonsInCh.length > 0 && selectedLessonsInCh.length < ch.lessons.length;

            return (
              <div key={ch.id} className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden transition">
                {/* Chapter Row */}
                <div className="flex items-center justify-between p-4 bg-slate-50/70 border-b border-slate-100 hover:bg-slate-100/70 transition">
                  <div className="flex items-center space-x-3">
                    <button
                      type="button"
                      onClick={() => toggleChapterCollapse(ch.id)}
                      className="p-1 rounded-lg text-slate-500 hover:bg-slate-200 transition cursor-pointer"
                    >
                      {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleToggleChapter(ch.id)}
                      className={`w-5 h-5 rounded-md border flex items-center justify-center transition cursor-pointer ${
                        isAllSelected
                          ? 'bg-blue-600 border-blue-600 text-white'
                          : isPartiallySelected
                          ? 'bg-blue-200 border-blue-400 text-blue-800'
                          : 'border-slate-300 bg-white hover:border-slate-400'
                      }`}
                    >
                      {isAllSelected ? (
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      ) : isPartiallySelected ? (
                        <div className="w-2.5 h-1 bg-blue-700 rounded-full" />
                      ) : null}
                    </button>

                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{ch.name}</h4>
                      <p className="text-xs text-slate-500">
                        {ch.lessons.length} bài học • Tổng {ch.lessons.reduce((s, l) => s + l.yccds.length, 0)} YCCĐ chuẩn
                      </p>
                    </div>
                  </div>

                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-200/70 text-slate-700">
                    {selectedLessonsInCh.length}/{ch.lessons.length} bài đã chọn
                  </span>
                </div>

                {/* Lessons List */}
                {!isCollapsed && (
                  <div className="p-3 divide-y divide-slate-100">
                    {ch.lessons.map(lesson => {
                      const isSelected = project.selectedLessonIds.includes(lesson.id);

                      return (
                        <div
                          key={lesson.id}
                          onClick={() => handleToggleLesson(ch.id, lesson.id)}
                          className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition ${
                            isSelected
                              ? 'bg-blue-50/60 text-blue-900 font-medium'
                              : 'hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <div
                              className={`w-4 h-4 rounded-sm border flex items-center justify-center transition ${
                                isSelected ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300 bg-white'
                              }`}
                            >
                              {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                            <div>
                              <span className="text-sm">{lesson.name}</span>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            <span className="text-xs px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200">
                              {lesson.yccds.length} YCCĐ
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <button
          type="button"
          onClick={onPrev}
          className="flex items-center space-x-2 px-5 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-medium transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại: Khai báo đề</span>
        </button>

        <button
          type="button"
          onClick={onNext}
          disabled={project.selectedLessonIds.length === 0}
          className="flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md shadow-blue-600/30 transition disabled:opacity-50 cursor-pointer"
        >
          <span>Tiếp tục: Chọn YCCĐ</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

