import React from 'react';
import {
  Sliders,
  Sparkles,
  CheckCircle,
  AlertTriangle,
  Plus,
  Trash2,
  Minus,
  ArrowLeft,
  ArrowRight,
  PieChart,
  ListOrdered
} from 'lucide-react';
import { ExamProject, Section, TargetRatio } from '../../types/exam';
import { SECTION_PRESETS, getSectionsPreset } from '../../data/sectionPresets';

interface Step4StructureProps {
  project: ExamProject;
  onChangeSections: (sections: Section[]) => void;
  onChangeTargetRatio: (ratio: TargetRatio) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const Step4Structure: React.FC<Step4StructureProps> = ({
  project,
  onChangeSections,
  onChangeTargetRatio,
  onNext,
  onPrev
}) => {
  const { sections, targetRatio, generalInfo } = project;

  const toggleSection = (id: string) => {
    onChangeSections(sections.map(s => (s.id === id ? { ...s, enabled: !s.enabled } : s)));
  };

  const updateSection = (id: string, patch: Partial<Section>) => {
    onChangeSections(sections.map(s => (s.id === id ? { ...s, ...patch } : s)));
  };

  const applyPreset = (presetId: string) => {
    onChangeSections(getSectionsPreset(presetId));
  };

  const addCustomSection = () => {
    const newSec: Section = {
      id: `sec-custom-${Date.now()}`,
      title: 'Tự luận',
      shortTitle: 'Tự luận',
      type: 'essay',
      enabled: true,
      questionCount: 2,
      subItemsPerQuestion: 1,
      pointsPerItem: 1,
      totalPoints: 2,
      description: 'Phần thi tự luận bổ sung'
    };
    onChangeSections([...sections, newSec]);
  };

  const removeSection = (id: string) => {
    onChangeSections(sections.filter(s => s.id !== id));
  };

  const totalPoints = sections.filter(s => s.enabled).reduce((sum, s) => sum + s.totalPoints, 0);
  const roundedPoints = Math.round(totalPoints * 100) / 100;
  const isPointsMatching = Math.abs(roundedPoints - generalInfo.maxScore) < 0.01;

  const setRatio = (nb: number, th: number, vd: number) => {
    onChangeTargetRatio({ ...targetRatio, NB: nb, TH: th, VD: vd });
  };

  // Detect which preset matches
  const currentPresetId = (() => {
    const s1 = sections.find(s => s.id === 'sec-1' && s.enabled);
    const s2 = sections.find(s => s.id === 'sec-2' && s.enabled);
    const s3 = sections.find(s => s.id === 'sec-3' && s.enabled);
    const s4 = sections.find(s => s.id === 'sec-4' && s.enabled);

    if (s1?.questionCount === 12 && s2?.questionCount === 4 && s3?.questionCount === 6 && !s4) {
      return 'thpt_toan';
    }
    if (s1?.questionCount === 18 && s2?.questionCount === 4 && s3?.questionCount === 6 && !s4) {
      return generalInfo.subject === 'Hoa' ? 'thpt_hoa' : 'thpt_ly';
    }
    if (s1?.questionCount === 40 && (!s2 || !s2.enabled) && (!s3 || !s3.enabled) && (!s4 || !s4.enabled)) {
      return 'thpt_tienganh';
    }
    if (s1?.questionCount === 12 && s2?.questionCount === 2 && s3?.questionCount === 4 && s4?.questionCount === 3) {
      return 'kt_dinh_ky';
    }
    return null;
  })();

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-5 shadow-xs">
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-blue-600 rounded-xl text-white shadow-xs">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Bước 4: Thiết lập cấu trúc các phần thi & Tỉ lệ nhận thức
            </h3>
            <p className="text-sm text-slate-600 mt-0.5 leading-relaxed">
              Chọn nhanh cấu trúc mẫu chuẩn Bộ GD&ĐT hoặc cấu hình tùy biến. Mặc định 4 phần thi:{' '}
              <strong className="text-slate-800">Trắc nghiệm</strong> (4 phương án),{' '}
              <strong className="text-slate-800">Đúng sai</strong> (4 lệnh hỏi a, b, c, d),{' '}
              <strong className="text-slate-800">Trả lời ngắn</strong> và{' '}
              <strong className="text-slate-800">Tự luận</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Preset Cards */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-slate-100 gap-1">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
              3 Tùy chọn nhanh cấu trúc đề chuẩn
            </h4>
          </div>
          <span className="text-xs text-slate-500">Bấm chọn để tự động thiết lập số câu và thang điểm 10.0đ</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {SECTION_PRESETS.map(preset => {
            const isSelected = currentPresetId === preset.id;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => applyPreset(preset.id)}
                className={`relative text-left p-4 rounded-xl border-2 transition-all flex flex-col justify-between cursor-pointer group ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/70 shadow-sm ring-2 ring-blue-500/20'
                    : 'border-slate-200 bg-slate-50/60 hover:bg-white hover:border-blue-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-blue-600 transition">
                      {preset.name}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isSelected ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {preset.badge}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-blue-800 mb-2.5">{preset.shortDesc}</p>
                  <div className="space-y-1 text-[11px] text-slate-600 bg-white/70 rounded-lg p-2.5 border border-slate-200/60">
                    {preset.sections
                      .filter(s => s.enabled)
                      .map(s => (
                        <div key={s.id} className="flex items-center justify-between">
                          <span className="text-slate-600">{s.title}:</span>
                          <span className="font-semibold text-slate-900">
                            {s.questionCount} câu ({s.totalPoints.toFixed(s.totalPoints % 1 === 0 ? 0 : 1)}đ)
                          </span>
                        </div>
                      ))}
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-200/70 flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800">Tổng: 10.0 điểm</span>
                  <span
                    className={`font-semibold flex items-center space-x-1 ${
                      isSelected ? 'text-blue-600' : 'text-slate-500 group-hover:text-blue-600'
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <CheckCircle className="w-3.5 h-3.5 text-blue-600" />
                        <span>Đang chọn</span>
                      </>
                    ) : (
                      <span>Áp dụng mẫu này →</span>
                    )}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Points Status Alert */}
      <div
        className={`p-4 rounded-2xl border flex items-center justify-between transition ${
          isPointsMatching ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-amber-50 border-amber-200 text-amber-900'
        }`}
      >
        <div className="flex items-center space-x-3">
          {isPointsMatching ? (
            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
          )}
          <div>
            <p className="text-sm font-bold">
              Tổng điểm cấu hình: {roundedPoints} / {generalInfo.maxScore} điểm
            </p>
            <p className="text-xs text-slate-600">
              {isPointsMatching
                ? 'Tổng điểm các phần thi khớp hoàn toàn với thang điểm khai báo (10.0 điểm).'
                : `Điểm các phần thi lệch ${Math.abs(roundedPoints - generalInfo.maxScore).toFixed(
                    2
                  )} điểm so với thang điểm đề (${generalInfo.maxScore}đ). Vui lòng điều chỉnh lại.`}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={addCustomSection}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 shadow-xs shrink-0 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Thêm phần thi</span>
        </button>
      </div>

      {/* Sections Config Cards */}
      <div className="space-y-4">
        {sections.map(sec => (
          <div
            key={sec.id}
            className={`rounded-2xl border transition overflow-hidden ${
              sec.enabled ? 'bg-white border-slate-300 shadow-xs' : 'bg-slate-50 border-slate-200 opacity-60'
            }`}
          >
            {/* Section Header */}
            <div className="p-4 flex items-center justify-between bg-slate-50/70 border-b border-slate-100">
              <div className="flex items-center space-x-3">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={sec.enabled}
                    onChange={() => toggleSection(sec.id)}
                    className="sr-only peer"
                  />
                  <div className="w-10 h-5 bg-slate-300 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600" />
                </label>

                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="text-sm font-bold text-slate-900">{sec.title}</h4>
                    {sec.type === 'multiple_choice' && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                        4 phương án (A, B, C, D)
                      </span>
                    )}
                    {sec.type === 'true_false' && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                        4 lệnh hỏi (a, b, c, d)
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">{sec.description}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-100 text-blue-800">
                  {sec.totalPoints.toFixed(2)} điểm
                </span>
                {sections.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeSection(sec.id)}
                    className="p-1 rounded-lg text-slate-400 hover:text-red-600 transition cursor-pointer"
                    title="Xóa phần thi này"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Section Controls */}
            {sec.enabled && (
              <div className="p-5 border-t border-slate-100 bg-white grid grid-cols-1 sm:grid-cols-3 gap-5 items-start">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Tên phần thi (hiển thị)</label>
                  <input
                    type="text"
                    value={sec.title}
                    onChange={e => updateSection(sec.id, { title: e.target.value, shortTitle: e.target.value })}
                    className="w-full text-sm rounded-xl border-slate-300 bg-slate-50 px-3 py-2.5 focus:border-blue-500 focus:bg-white transition font-medium"
                  />
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    {sec.type === 'multiple_choice' && '4 phương án (A, B, C, D) • 1 YCCĐ/câu'}
                    {sec.type === 'true_false' && 'Trắc nghiệm Đúng - Sai • 4 lệnh hỏi/câu'}
                    {sec.type === 'short_answer' && 'Trả lời ngắn • 1 câu duy nhất 1 ý'}
                    {sec.type === 'essay' && 'Tự luận • Tùy chọn số ý hỏi từng câu bên dưới'}
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Số câu hỏi</label>
                  <div className="flex items-center space-x-1.5">
                    <button
                      type="button"
                      onClick={() => updateSection(sec.id, { questionCount: Math.max(0, sec.questionCount - 1) })}
                      disabled={sec.questionCount <= 0}
                      className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 active:bg-slate-300 disabled:opacity-30 border border-slate-300 flex items-center justify-center font-bold text-slate-700 transition cursor-pointer shrink-0 select-none"
                      title="Giảm 1 câu"
                    >
                      <Minus className="w-4 h-4 stroke-[2.5]" />
                    </button>
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={sec.questionCount}
                      onChange={e =>
                        updateSection(sec.id, { questionCount: Math.max(0, Number(e.target.value) || 0) })
                      }
                      className="w-full text-center text-sm font-bold rounded-xl border-slate-300 bg-slate-50 py-2 focus:border-blue-500 focus:bg-white transition"
                    />
                    <button
                      type="button"
                      onClick={() => updateSection(sec.id, { questionCount: sec.questionCount + 1 })}
                      className="w-10 h-10 rounded-xl bg-blue-50 hover:bg-blue-100 active:bg-blue-200 border border-blue-300 flex items-center justify-center font-bold text-blue-700 transition cursor-pointer shrink-0 select-none"
                      title="Tăng 1 câu"
                    >
                      <Plus className="w-4 h-4 stroke-[2.5]" />
                    </button>
                  </div>
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    {sec.type === 'multiple_choice' && 'Mỗi câu 4 phương án (0.25 đ/câu)'}
                    {sec.type === 'true_false' && `${sec.questionCount * 4} lệnh hỏi tổng cộng (4 ý a, b, c, d)`}
                    {sec.type === 'short_answer' && 'Mỗi câu 1 kết quả số'}
                    {sec.type === 'essay' && 'Câu hỏi / bài toán tự luận'}
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Tổng điểm phần</label>
                  <div className="flex items-center space-x-1.5">
                    <button
                      type="button"
                      onClick={() =>
                        updateSection(sec.id, {
                          totalPoints: Math.max(0, Math.round((sec.totalPoints - 0.25) * 100) / 100)
                        })
                      }
                      disabled={sec.totalPoints <= 0}
                      className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 active:bg-slate-300 disabled:opacity-30 border border-slate-300 flex items-center justify-center font-bold text-slate-700 transition cursor-pointer shrink-0 select-none"
                      title="Giảm 0.25 điểm"
                    >
                      <Minus className="w-4 h-4 stroke-[2.5]" />
                    </button>
                    <input
                      type="number"
                      min={0}
                      max={100}
                      step={0.25}
                      value={sec.totalPoints}
                      onChange={e =>
                        updateSection(sec.id, { totalPoints: Math.max(0, Number(e.target.value) || 0) })
                      }
                      className="w-full text-center text-sm font-bold text-blue-700 rounded-xl border-slate-300 bg-slate-50 py-2 focus:border-blue-500 focus:bg-white transition"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        updateSection(sec.id, { totalPoints: Math.round((sec.totalPoints + 0.25) * 100) / 100 })
                      }
                      className="w-10 h-10 rounded-xl bg-blue-50 hover:bg-blue-100 active:bg-blue-200 border border-blue-300 flex items-center justify-center font-bold text-blue-700 transition cursor-pointer shrink-0 select-none"
                      title="Tăng 0.25 điểm"
                    >
                      <Plus className="w-4 h-4 stroke-[2.5]" />
                    </button>
                  </div>
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    TB{' '}
                    {sec.type === 'true_false'
                      ? `${(sec.totalPoints / (sec.questionCount * 4 || 1)).toFixed(
                          2
                        )} đ/lệnh hỏi (1.0 đ/câu 4 ý)`
                      : `${(sec.totalPoints / (sec.questionCount || 1)).toFixed(2)} đ/câu`}
                  </span>
                </div>

                {/* Sub-items for Essay Questions */}
                {sec.type === 'essay' && sec.questionCount > 0 && (
                  <div className="col-span-1 sm:col-span-3 mt-3 pt-3 border-t border-slate-200 bg-purple-50/50 p-4 rounded-xl border">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
                      <div className="flex items-center space-x-2">
                        <ListOrdered className="w-4 h-4 text-purple-600" />
                        <h5 className="text-xs font-bold uppercase tracking-wider text-purple-900">
                          Khai báo số ý hỏi ở từng câu tự luận (1a, 1b, 2a, 2b...)
                        </h5>
                      </div>
                      <span className="text-[11px] text-purple-700 font-medium">
                        Mỗi ý hỏi có thể phân bổ ở các YCCĐ và mức độ nhận thức khác nhau tại Bước 5
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {Array.from({ length: sec.questionCount }).map((_, idx) => {
                        const qNum = idx + 1;
                        const subCount =
                          sec.essayQuestions?.find(e => e.questionIndex === qNum)?.subItemsCount || 1;
                        const letters = ['a', 'b', 'c', 'd', 'e', 'f'];

                        return (
                          <div
                            key={qNum}
                            className="p-3 bg-white rounded-xl border border-purple-200 shadow-xs flex items-center justify-between"
                          >
                            <div>
                              <span className="text-xs font-bold text-slate-800">Câu {qNum}</span>
                              <p className="text-[11px] text-purple-700 font-semibold mt-0.5">
                                {subCount > 1
                                  ? `Ý: ${Array.from(
                                      { length: subCount },
                                      (__, s) => `${qNum}${letters[s] || s + 1}`
                                    ).join(', ')}`
                                  : `1 ý (Câu ${qNum})`}
                              </p>
                            </div>

                            <div className="flex items-center space-x-1.5">
                              <button
                                type="button"
                                disabled={subCount <= 1}
                                onClick={() => {
                                  const updated = [...(sec.essayQuestions || [])];
                                  const exIdx = updated.findIndex(e => e.questionIndex === qNum);
                                  if (exIdx >= 0) {
                                    updated[exIdx].subItemsCount = Math.max(1, subCount - 1);
                                  } else {
                                    updated.push({ questionIndex: qNum, subItemsCount: Math.max(1, subCount - 1) });
                                  }
                                  updateSection(sec.id, { essayQuestions: updated });
                                }}
                                className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-30 border border-slate-300 flex items-center justify-center font-bold text-slate-700 cursor-pointer"
                                title="Giảm số ý hỏi"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="w-6 text-center font-bold text-xs text-slate-800">{subCount}</span>
                              <button
                                type="button"
                                disabled={subCount >= 6}
                                onClick={() => {
                                  const updated = [...(sec.essayQuestions || [])];
                                  const exIdx = updated.findIndex(e => e.questionIndex === qNum);
                                  if (exIdx >= 0) {
                                    updated[exIdx].subItemsCount = Math.min(6, subCount + 1);
                                  } else {
                                    updated.push({ questionIndex: qNum, subItemsCount: Math.min(6, subCount + 1) });
                                  }
                                  updateSection(sec.id, { essayQuestions: updated });
                                }}
                                className="w-8 h-8 rounded-lg bg-purple-50 hover:bg-purple-100 border border-purple-300 flex items-center justify-center font-bold text-purple-700 cursor-pointer"
                                title="Tăng số ý hỏi"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Target Cognition Ratios */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
          <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center space-x-2">
            <PieChart className="w-4 h-4 text-blue-600" />
            <span>Mục tiêu tỉ lệ mức độ nhận thức (NB - TH - VD)</span>
          </h4>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-500">Mẫu gợi ý:</span>
            <button
              type="button"
              onClick={() => setRatio(40, 30, 30)}
              className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
            >
              40 : 30 : 30
            </button>
            <button
              type="button"
              onClick={() => setRatio(50, 30, 20)}
              className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
            >
              50 : 30 : 20
            </button>
            <button
              type="button"
              onClick={() => setRatio(30, 40, 30)}
              className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
            >
              30 : 40 : 30
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-semibold text-blue-700 mb-1">Nhận biết (NB) %</label>
            <div className="relative">
              <input
                type="number"
                min={0}
                max={100}
                value={targetRatio.NB}
                onChange={e => onChangeTargetRatio({ ...targetRatio, NB: Number(e.target.value) || 0 })}
                className="w-full text-sm font-bold rounded-xl border-blue-200 bg-blue-50/50 px-3 py-2 focus:border-blue-500"
              />
              <span className="absolute right-3 top-2 text-xs text-blue-500 font-bold">%</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-emerald-700 mb-1">Thông hiểu (TH) %</label>
            <div className="relative">
              <input
                type="number"
                min={0}
                max={100}
                value={targetRatio.TH}
                onChange={e => onChangeTargetRatio({ ...targetRatio, TH: Number(e.target.value) || 0 })}
                className="w-full text-sm font-bold rounded-xl border-emerald-200 bg-emerald-50/50 px-3 py-2 focus:border-emerald-500"
              />
              <span className="absolute right-3 top-2 text-xs text-emerald-500 font-bold">%</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-amber-700 mb-1">Vận dụng (VD) %</label>
            <div className="relative">
              <input
                type="number"
                min={0}
                max={100}
                value={targetRatio.VD}
                onChange={e => onChangeTargetRatio({ ...targetRatio, VD: Number(e.target.value) || 0 })}
                className="w-full text-sm font-bold rounded-xl border-amber-200 bg-amber-50/50 px-3 py-2 focus:border-amber-500"
              />
              <span className="absolute right-3 top-2 text-xs text-amber-500 font-bold">%</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Cơ sở tính tỉ lệ</label>
            <select
              value={targetRatio.basis}
              onChange={e => onChangeTargetRatio({ ...targetRatio, basis: e.target.value as any })}
              className="w-full text-sm rounded-xl border-slate-300 bg-slate-50 px-3 py-2 focus:border-blue-500"
            >
              <option value="points">Theo Điểm số (Khuyên dùng)</option>
              <option value="questions">Theo Số câu / lệnh hỏi</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs pt-1">
          <span className="text-slate-500">
            Tổng cộng: {targetRatio.NB + targetRatio.TH + targetRatio.VD}%
          </span>
          {targetRatio.NB + targetRatio.TH + targetRatio.VD !== 100 && (
            <span className="text-amber-600 font-medium">
              * Tổng tỉ lệ nên bằng 100% để thuật toán phân bổ chính xác nhất.
            </span>
          )}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <button
          type="button"
          onClick={onPrev}
          className="flex items-center space-x-2 px-5 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-medium transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại: Chọn YCCĐ</span>
        </button>

        <button
          type="button"
          onClick={onNext}
          className="flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md shadow-blue-600/30 transition cursor-pointer"
        >
          <span>Tiếp tục: Phân bổ câu hỏi</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

