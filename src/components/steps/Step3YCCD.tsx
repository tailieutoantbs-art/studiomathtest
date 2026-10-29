import React, { useState } from 'react';
import {
  CheckSquare,
  Search,
  Plus,
  Edit2,
  Trash2,
  Check,
  ArrowLeft,
  ArrowRight,
  Info,
  RotateCcw,
  X
} from 'lucide-react';
import { ExamProject, YCCDSelection, CognitionLevel, getSubjectName } from '../../types/exam';
import { FlatYCCD } from '../../types/curriculum';
import { getCurriculumBySubjectAndGrade } from '../../data/curriculum';

interface Step3YCCDProps {
  project: ExamProject;
  onChangeYccdSelections: (selections: Record<string, YCCDSelection>) => void;
  onUpdateScope?: (chapterIds: string[], lessonIds: string[]) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const Step3YCCD: React.FC<Step3YCCDProps> = ({
  project,
  onChangeYccdSelections,
  onUpdateScope,
  onNext,
  onPrev
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [flashMessage, setFlashMessage] = useState<string | null>(null);

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingYccd, setEditingYccd] = useState<FlatYCCD | null>(null);
  const [deletingYccd, setDeletingYccd] = useState<FlatYCCD | null>(null);

  // Form states for manual add
  const [addChapterId, setAddChapterId] = useState('');
  const [addLessonId, setAddLessonId] = useState('');
  const [customChapterName, setCustomChapterName] = useState('');
  const [customLessonName, setCustomLessonName] = useState('');
  const [customContent, setCustomContent] = useState('');
  const [customSource, setCustomSource] = useState('Giáo viên tự thêm thủ công vào đề');
  const [customLevel, setCustomLevel] = useState<CognitionLevel>('NB');

  // Load all available YCCDs in scope
  const availableChapters = getCurriculumBySubjectAndGrade(
    project.generalInfo.subject,
    project.generalInfo.grade
  );

  const allScopeYccds: FlatYCCD[] = [];
  for (const ch of availableChapters) {
    for (const ls of ch.lessons) {
      if (project.selectedLessonIds.includes(ls.id)) {
        allScopeYccds.push(...ls.yccds);
      }
    }
  }

  const showFlash = (msg: string) => {
    setFlashMessage(msg);
    setTimeout(() => setFlashMessage(null), 3500);
  };

  const toggleSelectYccd = (y: FlatYCCD) => {
    const isSelected = !!project.yccdSelections[y.id];
    const next = { ...project.yccdSelections };
    if (isSelected) {
      delete next[y.id];
    } else {
      next[y.id] = { yccdId: y.id, workingText: y.officialText };
    }
    onChangeYccdSelections(next);
  };

  const selectAll = () => {
    const next: Record<string, YCCDSelection> = {};
    for (const y of allScopeYccds) {
      next[y.id] = { yccdId: y.id, workingText: y.officialText };
    }
    onChangeYccdSelections(next);
  };

  const deselectAll = () => {
    onChangeYccdSelections({});
  };

  const openAddModal = () => {
    const defaultCh = availableChapters.find(c => project.selectedChapterIds.includes(c.id)) || availableChapters[0];
    const defaultLs = defaultCh?.lessons.find(l => project.selectedLessonIds.includes(l.id)) || defaultCh?.lessons[0];
    setAddChapterId(defaultCh?.id || '');
    setAddLessonId(defaultLs?.id || '');
    setCustomChapterName('');
    setCustomLessonName('');
    setCustomContent('');
    setCustomSource('Giáo viên tự thêm thủ công vào đề');
    setCustomLevel('NB');
    setIsAddModalOpen(true);
  };

  const handleAddCustomYccd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customContent.trim()) return;

    let finalChId = addChapterId;
    let finalChName = '';
    let finalLsId = addLessonId;
    let finalLsName = '';

    if (addChapterId === 'CUSTOM') {
      finalChId = `CH-CUSTOM-${Date.now()}`;
      finalChName = customChapterName.trim() || 'Chương kiến thức tự tạo';
    } else {
      finalChName = availableChapters.find(c => c.id === addChapterId)?.name || 'Chương SGK';
    }

    if (addLessonId === 'CUSTOM' || addChapterId === 'CUSTOM') {
      finalLsId = `B-CUSTOM-${Date.now()}`;
      finalLsName = customLessonName.trim() || 'Bài học tự tạo';
    } else {
      finalLsName =
        availableChapters.find(c => c.id === addChapterId)?.lessons.find(l => l.id === addLessonId)?.name ||
        'Bài học SGK';
    }

    const rand = Math.floor(100 + Math.random() * 900);
    const newYccdId = `${project.generalInfo.subject.toUpperCase()}${project.generalInfo.grade}-MANUAL-${rand}`;

    // Add into scope if not present
    if (onUpdateScope && !project.selectedLessonIds.includes(finalLsId)) {
      const nextChs = project.selectedChapterIds.includes(finalChId)
        ? project.selectedChapterIds
        : [...project.selectedChapterIds, finalChId];
      onUpdateScope(nextChs, [...project.selectedLessonIds, finalLsId]);
    }

    onChangeYccdSelections({
      ...project.yccdSelections,
      [newYccdId]: { yccdId: newYccdId, workingText: customContent.trim() }
    });

    setIsAddModalOpen(false);
    showFlash(`✓ Đã thêm thủ công YCCĐ [${newYccdId}] vào đề thi thành công!`);
  };

  const openEditModal = (y: FlatYCCD, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingYccd(y);
    setCustomContent(project.yccdSelections[y.id]?.workingText || y.officialText);
    setCustomSource(y.source || '');
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingYccd || !customContent.trim()) return;

    if (project.yccdSelections[editingYccd.id]) {
      onChangeYccdSelections({
        ...project.yccdSelections,
        [editingYccd.id]: {
          ...project.yccdSelections[editingYccd.id],
          workingText: customContent.trim()
        }
      });
    }

    setEditingYccd(null);
    showFlash(`✓ Đã lưu thay đổi nội dung YCCĐ [${editingYccd.id}]!`);
  };

  const handleDeleteYccd = () => {
    if (deletingYccd) {
      if (project.yccdSelections[deletingYccd.id]) {
        const next = { ...project.yccdSelections };
        delete next[deletingYccd.id];
        onChangeYccdSelections(next);
      }
      setDeletingYccd(null);
      showFlash(`✓ Đã xoá YCCĐ [${deletingYccd.id}] khỏi đề thi!`);
    }
  };

  const filteredYccds = allScopeYccds.filter(y => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const currText = project.yccdSelections[y.id]?.workingText || y.officialText;
    return (
      currText.toLowerCase().includes(q) ||
      y.id.toLowerCase().includes(q) ||
      y.lessonName.toLowerCase().includes(q)
    );
  });

  const selectedCount = Object.keys(project.yccdSelections).length;

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-blue-600 rounded-xl text-white shadow-xs">
            <CheckSquare className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Bước 3: Chọn Yêu cầu cần đạt (YCCĐ) theo SGK Kết nối tri thức
            </h3>
            <p className="text-sm text-slate-600 mt-0.5">
              Tích chọn các YCCĐ đưa vào phạm vi kiểm tra. Bạn có thể tự ý{' '}
              <strong className="text-blue-700">thêm thủ công một YCCĐ ngoài kho</strong>,{' '}
              <strong className="text-blue-700">sửa câu chữ</strong> hoặc{' '}
              <strong className="text-blue-700">xoá</strong> theo nhu cầu.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <button
            type="button"
            onClick={openAddModal}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-md shadow-blue-500/20 transition cursor-pointer"
          >
            <Plus className="w-4 h-4 text-amber-300" />
            <span>+ Thêm thủ công YCCĐ vào đề</span>
          </button>
          <button
            type="button"
            onClick={selectAll}
            className="px-3 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 shadow-xs cursor-pointer"
          >
            Chọn tất cả ({allScopeYccds.length})
          </button>
          <button
            type="button"
            onClick={deselectAll}
            className="px-3 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 shadow-xs cursor-pointer"
          >
            Bỏ chọn
          </button>
        </div>
      </div>

      {/* Flash Alert */}
      {flashMessage && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-semibold flex items-center justify-between animate-in fade-in duration-200">
          <span>{flashMessage}</span>
          <button onClick={() => setFlashMessage(null)} className="text-emerald-600 hover:text-emerald-900 cursor-pointer">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Cognition Level Note */}
      <div className="flex items-start space-x-3 bg-amber-50 border border-amber-200/80 rounded-xl p-3.5 text-xs text-amber-900">
        <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <p>
          <strong>Lưu ý về Mức độ nhận thức:</strong> Ở Bước 3 này, Quý Thầy/Cô chỉ cần tích chọn các YCCĐ đưa vào đề
          thi. Mức độ nhận thức (<strong>Nhận biết</strong>, <strong>Thông hiểu</strong>, <strong>Vận dụng</strong>) sẽ
          được phân bổ trực tiếp tại <strong>Bước 5 (Ma trận câu hỏi)</strong> bằng cách tăng/giảm số lượng câu ở mỗi ô.
          Nếu số lượng ô là 0 thì hiểu là không lấy.
        </p>
      </div>

      {/* Search Bar & Selection Stats */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm nội dung YCCĐ, mã YCCĐ hoặc bài học..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-xs"
          />
        </div>

        <div className="text-xs text-slate-600 bg-slate-100 px-3.5 py-2.5 rounded-xl shrink-0">
          Đã chọn: <strong className="text-blue-700 text-sm font-bold">{selectedCount}</strong> / {allScopeYccds.length}{' '}
          YCCĐ
        </div>
      </div>

      {/* YCCDs List */}
      <div className="space-y-3">
        {allScopeYccds.length === 0 ? (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-center text-amber-800">
            <Info className="w-8 h-8 text-amber-600 mx-auto mb-2" />
            <p className="font-semibold text-sm">Chưa có bài học nào được chọn ở Bước 2</p>
            <p className="text-xs text-amber-700 mt-1">
              Vui lòng quay lại Bước 2 và tích chọn các chương, bài học muốn đưa vào đề kiểm tra, hoặc bấm nút "+ Thêm
              thủ công YCCĐ vào đề" phía trên.
            </p>
          </div>
        ) : filteredYccds.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-500">
            Không tìm thấy YCCĐ nào với từ khóa tìm kiếm "{searchQuery}".
          </div>
        ) : (
          filteredYccds.map(y => {
            const isSelected = !!project.yccdSelections[y.id];
            const sel = project.yccdSelections[y.id];
            const displayText = sel?.workingText || y.officialText;
            const isCustomEdited = !!(sel?.workingText && sel.workingText !== y.officialText);

            return (
              <div
                key={y.id}
                onClick={() => toggleSelectYccd(y)}
                className={`rounded-2xl border p-4 transition cursor-pointer select-none ${
                  isSelected
                    ? 'bg-blue-50/50 border-blue-400 shadow-xs ring-1 ring-blue-300'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50 opacity-80'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start space-x-3.5 flex-1">
                    <div
                      className={`w-5 h-5 mt-0.5 rounded-md border flex items-center justify-center transition shrink-0 ${
                        isSelected
                          ? 'bg-blue-600 border-blue-600 text-white shadow-xs'
                          : 'border-slate-300 bg-white hover:border-slate-400'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>

                    <div className="space-y-1.5 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                          {y.id}
                        </span>
                        <span className="text-xs text-slate-600 font-medium bg-slate-100/70 px-2 py-0.5 rounded">
                          {y.lessonName}
                        </span>
                        {y.verified ? (
                          <span className="inline-flex items-center text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                            <Check className="w-3 h-3 mr-1" />
                            Chính thức KNTT
                          </span>
                        ) : (
                          <span className="inline-flex items-center text-[11px] text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200 font-medium">
                            ★ Thủ công ngoài kho ({y.source})
                          </span>
                        )}
                        {isCustomEdited && (
                          <span className="text-[11px] text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200 font-medium">
                            Đã biên tập
                          </span>
                        )}
                      </div>

                      <p className="text-sm text-slate-800 leading-relaxed font-normal">{displayText}</p>

                      {isCustomEdited && (
                        <p className="text-xs text-slate-400 italic">Gốc: {y.officialText}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-1 shrink-0" onClick={e => e.stopPropagation()}>
                    <button
                      type="button"
                      onClick={e => openEditModal(y, e)}
                      title="Sửa nội dung YCCĐ"
                      className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-white border border-transparent hover:border-slate-200 transition cursor-pointer"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={e => {
                        e.stopPropagation();
                        setDeletingYccd(y);
                      }}
                      title="Xóa YCCĐ khỏi danh mục"
                      className="p-1.5 rounded-lg text-slate-500 hover:text-red-600 hover:bg-white border border-transparent hover:border-slate-200 transition cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Manual Add Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/70">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 bg-blue-600 rounded-xl text-white">
                  <Plus className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Thêm thủ công YCCĐ vào đề thi</h3>
                  <p className="text-xs text-slate-500">Tự ý tạo YCCĐ ngoài kho theo mục đích kiểm tra riêng của Thầy/Cô</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddCustomYccd} className="p-5 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Chương học (môn {getSubjectName(project.generalInfo.subject)} {project.generalInfo.grade}):
                </label>
                <select
                  value={addChapterId}
                  onChange={e => {
                    const val = e.target.value;
                    setAddChapterId(val);
                    const ch = availableChapters.find(c => c.id === val);
                    if (ch && ch.lessons.length > 0) {
                      setAddLessonId(ch.lessons[0].id);
                    } else if (val === 'CUSTOM') {
                      setAddLessonId('CUSTOM');
                    }
                  }}
                  className="w-full rounded-xl border border-slate-200 p-2.5 bg-white focus:border-blue-500"
                >
                  {availableChapters.map(ch => (
                    <option key={ch.id} value={ch.id}>
                      {ch.name}
                    </option>
                  ))}
                  <option value="CUSTOM">+ Chương bổ sung ngoài SGK...</option>
                </select>
                {addChapterId === 'CUSTOM' && (
                  <input
                    type="text"
                    value={customChapterName}
                    onChange={e => setCustomChapterName(e.target.value)}
                    placeholder="Nhập tên chương mới..."
                    required
                    className="w-full mt-2 rounded-xl border border-slate-200 p-2.5 bg-white text-xs"
                  />
                )}
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Bài học / Đơn vị kiến thức:</label>
                {addChapterId !== 'CUSTOM' && (
                  <select
                    value={addLessonId}
                    onChange={e => setAddLessonId(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 p-2.5 bg-white focus:border-blue-500"
                  >
                    {availableChapters
                      .find(c => c.id === addChapterId)
                      ?.lessons.map(l => (
                        <option key={l.id} value={l.id}>
                          {l.name}
                        </option>
                      ))}
                    <option value="CUSTOM">+ Bài học bổ sung khác...</option>
                  </select>
                )}
                {(addLessonId === 'CUSTOM' || addChapterId === 'CUSTOM') && (
                  <input
                    type="text"
                    value={customLessonName}
                    onChange={e => setCustomLessonName(e.target.value)}
                    placeholder="Nhập tên bài học / chủ đề mới..."
                    required
                    className="w-full mt-2 rounded-xl border border-slate-200 p-2.5 bg-white text-xs"
                  />
                )}
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Nội dung Yêu cầu cần đạt (YCCĐ): *
                </label>
                <textarea
                  value={customContent}
                  onChange={e => setCustomContent(e.target.value)}
                  rows={4}
                  required
                  placeholder="Nhập chuẩn hành vi kiến thức, kĩ năng hoặc năng lực học sinh cần đạt trong đề thi..."
                  className="w-full rounded-xl border border-slate-200 p-2.5 bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 leading-relaxed text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Nguồn / Ghi chú:</label>
                  <input
                    type="text"
                    value={customSource}
                    onChange={e => setCustomSource(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 p-2.5 bg-white text-xs"
                    placeholder="VD: Giáo viên tự biên soạn"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Mức độ gợi ý:</label>
                  <select
                    value={customLevel}
                    onChange={e => setCustomLevel(e.target.value as CognitionLevel)}
                    className="w-full rounded-xl border border-slate-200 p-2.5 bg-white text-xs"
                  >
                    <option value="NB">Nhận biết (NB)</option>
                    <option value="TH">Thông hiểu (TH)</option>
                    <option value="VD">Vận dụng (VD)</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20 cursor-pointer transition"
                >
                  Thêm thủ công vào đề thi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingYccd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/60">
              <div className="flex items-center space-x-2.5">
                <Edit2 className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-slate-900 text-base">Chỉnh sửa YCCĐ [{editingYccd.id}]</h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingYccd(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="p-5 space-y-4 text-xs">
              <div>
                <span className="text-slate-500 block mb-1">
                  {editingYccd.chapterName} • {editingYccd.lessonName}
                </span>
                <label className="block font-semibold text-slate-700 mb-1">Nội dung Yêu cầu cần đạt:</label>
                <textarea
                  value={customContent}
                  onChange={e => setCustomContent(e.target.value)}
                  rows={4}
                  required
                  className="w-full text-xs rounded-xl border border-slate-200 p-2.5 bg-white focus:border-blue-500 leading-relaxed"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Nguồn YCCĐ:</label>
                <input
                  type="text"
                  value={customSource}
                  onChange={e => setCustomSource(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-2.5 bg-white"
                />
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setCustomContent(editingYccd.officialText);
                    setCustomSource(editingYccd.source);
                  }}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg font-medium text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Khôi phục gốc</span>
                </button>

                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => setEditingYccd(null)}
                    className="px-4 py-2 rounded-xl font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
                  >
                    Hủy bỏ
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xs cursor-pointer transition"
                  >
                    Lưu cập nhật
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingYccd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-md w-full overflow-hidden p-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-start space-x-3.5 mb-4">
              <div className="p-2.5 bg-red-100 text-red-600 rounded-xl shrink-0">
                <Trash2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">Xác nhận xóa YCCĐ?</h3>
                <p className="text-xs text-slate-600 mt-1">
                  Bạn có chắc muốn xóa YCCĐ mã <strong>{deletingYccd.id}</strong>? Thao tác này sẽ bỏ chọn YCCĐ này
                  khỏi đề thi của bạn.
                </p>
                <div className="mt-2.5 p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-700 italic">
                  "{deletingYccd.officialText}"
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setDeletingYccd(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                onClick={handleDeleteYccd}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-700 text-white shadow-xs cursor-pointer transition"
              >
                Xóa YCCĐ này
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
          <span>Quay lại: Chọn phạm vi</span>
        </button>

        <button
          type="button"
          onClick={onNext}
          disabled={selectedCount === 0}
          className="flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md shadow-blue-600/30 transition disabled:opacity-50 cursor-pointer"
        >
          <span>Tiếp tục: Cấu trúc đề thi</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

