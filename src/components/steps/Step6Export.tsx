import React, { useState } from 'react';
import {
  Download,
  Table,
  FileText,
  CheckCircle,
  AlertTriangle,
  AlertCircle,
  Palette,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';
import { ExamProject, ExportSettings, getSubjectName } from '../../types/exam';
import {
  calculateMatrixRows,
  calculateMatrixSummary,
  generateSpecificationRows,
  validateProject
} from '../../services/matrixEngine';

interface Step6ExportProps {
  project: ExamProject;
  onUpdateExportSettings: (settings: Partial<ExportSettings>) => void;
  onExportWord: () => void;
  isExporting: boolean;
  onJumpToStep: (step: number) => void;
  onPrev: () => void;
}

export const Step6Export: React.FC<Step6ExportProps> = ({
  project,
  onUpdateExportSettings,
  onExportWord,
  isExporting,
  onJumpToStep,
  onPrev
}) => {
  const [activeTab, setActiveTab] = useState<'matrix' | 'spec' | 'validation'>('matrix');

  const { generalInfo, sections, exportSettings } = project;
  const activeSections = sections.filter(s => s.enabled);
  const matrixRows = calculateMatrixRows(project);
  const matrixSummary = calculateMatrixSummary(matrixRows, project);
  const specRows = generateSpecificationRows(project);
  const issues = validateProject(project);

  const errorCount = issues.filter(i => i.type === 'error').length;
  const warningCount = issues.filter(i => i.type === 'warning').length;

  const colorThemes = [
    { id: '#1E3A8A', name: 'Xanh Navy (Chuẩn Bộ GD&ĐT)' },
    { id: '#0F766E', name: 'Xanh Lục bảo (Toán học)' },
    { id: '#7C3AED', name: 'Tím Tri thức (Hiện đại)' },
    { id: '#1E293B', name: 'Than chì (Thanh lịch in ấn)' }
  ];

  return (
    <div className="space-y-6">
      {/* Banner Summary */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white rounded-2xl p-6 shadow-lg shadow-blue-900/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-white/20 text-white uppercase tracking-wider">
              {getSubjectName(generalInfo.subject)} {generalInfo.grade}
            </span>
            <span className="text-blue-200 text-xs">
              {generalInfo.schoolYear} • Thang điểm {generalInfo.maxScore}đ
            </span>
          </div>
          <h2 className="text-xl font-extrabold mt-1 tracking-tight text-white">{generalInfo.examName}</h2>
          <p className="text-xs text-blue-100 mt-1 max-w-2xl">
            {generalInfo.schoolName} — {generalInfo.deptName}. Đề gồm {matrixSummary.totalItems} câu/lệnh hỏi trên{' '}
            {matrixRows.length} đơn vị bài học.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onExportWord}
            disabled={isExporting}
            className="flex items-center justify-center space-x-2 px-6 py-3 rounded-xl bg-white text-blue-900 hover:bg-blue-50 font-bold shadow-lg transition transform active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            <Download className="w-5 h-5 text-blue-700" />
            <span>{isExporting ? 'Đang tạo tài liệu Word...' : 'Tải File Word (.docx)'}</span>
          </button>
        </div>
      </div>

      {/* Tabs & Export Settings Toolbar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-semibold text-slate-600">
          <button
            type="button"
            onClick={() => setActiveTab('matrix')}
            className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-lg transition cursor-pointer ${
              activeTab === 'matrix' ? 'bg-white text-blue-900 shadow-xs' : 'hover:text-slate-900'
            }`}
          >
            <Table className="w-4 h-4 text-blue-600" />
            <span>1. Khung Ma trận</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('spec')}
            className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-lg transition cursor-pointer ${
              activeTab === 'spec' ? 'bg-white text-indigo-900 shadow-xs' : 'hover:text-slate-900'
            }`}
          >
            <FileText className="w-4 h-4 text-indigo-600" />
            <span>2. Bản đặc tả</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('validation')}
            className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-lg transition cursor-pointer ${
              activeTab === 'validation' ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'
            }`}
          >
            {errorCount > 0 ? (
              <AlertTriangle className="w-4 h-4 text-red-500" />
            ) : warningCount > 0 ? (
              <AlertCircle className="w-4 h-4 text-amber-500" />
            ) : (
              <CheckCircle className="w-4 h-4 text-emerald-500" />
            )}
            <span>3. Kiểm tra tính hợp lệ ({errorCount + warningCount})</span>
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs">
          <div className="flex items-center space-x-1.5">
            <span className="text-slate-500 font-medium">Xuất:</span>
            <select
              value={exportSettings.exportFormat}
              onChange={e => onUpdateExportSettings({ exportFormat: e.target.value as any })}
              className="text-xs rounded-lg border-slate-300 bg-slate-50 py-1.5 px-2.5 font-medium"
            >
              <option value="both">Cả Ma trận & Bản đặc tả</option>
              <option value="matrix_only">Chỉ xuất Khung Ma trận</option>
              <option value="spec_only">Chỉ xuất Bản đặc tả</option>
            </select>
          </div>

          <div className="flex items-center space-x-1.5">
            <span className="text-slate-500 font-medium">Khổ giấy:</span>
            <select
              value={exportSettings.orientation}
              onChange={e => onUpdateExportSettings({ orientation: e.target.value as any })}
              className="text-xs rounded-lg border-slate-300 bg-slate-50 py-1.5 px-2.5 font-medium"
            >
              <option value="landscape">Khổ ngang (Ưu tiên ma trận)</option>
              <option value="portrait">Khổ dọc</option>
            </select>
          </div>

          <div className="flex items-center space-x-1.5">
            <Palette className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={exportSettings.primaryColor}
              onChange={e => onUpdateExportSettings({ primaryColor: e.target.value })}
              className="text-xs rounded-lg border-slate-300 bg-slate-50 py-1.5 px-2.5 font-medium"
            >
              {colorThemes.map(t => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Tab 1: Matrix Table */}
      {activeTab === 'matrix' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Table className="w-4 h-4 text-blue-700" />
              <h3 className="text-sm font-bold text-slate-900">KHUNG MA TRẬN ĐỀ KIỂM TRA ĐỊNH KÌ</h3>
            </div>
            <span className="text-xs text-slate-500 italic">
              * Tự động gộp ô theo chương và đơn vị kiến thức chuẩn Thông tư 32/2018
            </span>
          </div>

          <div className="overflow-x-auto p-4">
            <table className="w-full border-collapse border border-slate-300 text-xs text-center font-serif">
              <thead>
                <tr className="bg-blue-900 text-white font-sans font-bold">
                  <th rowSpan={2} className="border border-slate-300 p-2 w-10">
                    TT
                  </th>
                  <th rowSpan={2} className="border border-slate-300 p-2 w-44">
                    Chương / Chủ đề
                  </th>
                  <th rowSpan={2} className="border border-slate-300 p-2 w-52">
                    Nội dung / Đơn vị kiến thức
                  </th>
                  {activeSections.map(sec => (
                    <th key={sec.id} colSpan={3} className="border border-slate-300 p-2">
                      {sec.shortTitle}
                    </th>
                  ))}
                  <th colSpan={3} className="border border-slate-300 p-2 bg-blue-950">
                    Tổng hợp mức độ
                  </th>
                  <th rowSpan={2} className="border border-slate-300 p-2 w-16">
                    Tổng câu
                  </th>
                  <th rowSpan={2} className="border border-slate-300 p-2 w-16">
                    Điểm số
                  </th>
                  <th rowSpan={2} className="border border-slate-300 p-2 w-16">
                    Tỉ lệ %
                  </th>
                </tr>

                <tr className="bg-slate-100 text-slate-800 font-sans font-bold">
                  {activeSections.map(sec => (
                    <React.Fragment key={sec.id}>
                      <th className="border border-slate-300 p-1.5 text-blue-800 w-10">NB</th>
                      <th className="border border-slate-300 p-1.5 text-emerald-800 w-10">TH</th>
                      <th className="border border-slate-300 p-1.5 text-amber-800 w-10">VD</th>
                    </React.Fragment>
                  ))}
                  <th className="border border-slate-300 p-1.5 text-blue-900 bg-slate-200 w-10">NB</th>
                  <th className="border border-slate-300 p-1.5 text-emerald-900 bg-slate-200 w-10">TH</th>
                  <th className="border border-slate-300 p-1.5 text-amber-900 bg-slate-200 w-10">VD</th>
                </tr>
              </thead>

              <tbody>
                {matrixRows.map((row, idx) => (
                  <tr key={row.id} className="hover:bg-blue-50/30 transition">
                    <td className="border border-slate-300 p-2">{idx + 1}</td>
                    <td className="border border-slate-300 p-2 font-bold text-left">{row.chapterName}</td>
                    <td className="border border-slate-300 p-2 text-left font-sans">{row.lessonName}</td>

                    {activeSections.map(sec => (
                      <React.Fragment key={sec.id}>
                        <td className="border border-slate-300 p-2 text-blue-700">
                          {row.sectionLevels[sec.id]?.NB || ''}
                        </td>
                        <td className="border border-slate-300 p-2 text-emerald-700">
                          {row.sectionLevels[sec.id]?.TH || ''}
                        </td>
                        <td className="border border-slate-300 p-2 text-amber-700">
                          {row.sectionLevels[sec.id]?.VD || ''}
                        </td>
                      </React.Fragment>
                    ))}

                    <td className="border border-slate-300 p-2 font-bold text-blue-800 bg-slate-50">
                      {row.summaryLevels.NB || ''}
                    </td>
                    <td className="border border-slate-300 p-2 font-bold text-emerald-800 bg-slate-50">
                      {row.summaryLevels.TH || ''}
                    </td>
                    <td className="border border-slate-300 p-2 font-bold text-amber-800 bg-slate-50">
                      {row.summaryLevels.VD || ''}
                    </td>

                    <td className="border border-slate-300 p-2 font-bold bg-slate-50">{row.totalItems || ''}</td>
                    <td className="border border-slate-300 p-2 font-bold bg-slate-50">
                      {row.totalPoints > 0 ? row.totalPoints.toFixed(2) : ''}
                    </td>
                    <td className="border border-slate-300 p-2 font-sans text-slate-600">
                      {row.percentage > 0 ? `${row.percentage.toFixed(1)}%` : ''}
                    </td>
                  </tr>
                ))}
              </tbody>

              <tfoot>
                {/* Total Questions */}
                <tr className="bg-slate-100 font-sans font-bold text-slate-900 border-t-2 border-slate-400">
                  <td colSpan={3} className="border border-slate-300 p-2 text-right">
                    Tổng số câu / lệnh hỏi:
                  </td>
                  {activeSections.map(sec => (
                    <React.Fragment key={sec.id}>
                      <td className="border border-slate-300 p-2 text-blue-700">
                        {matrixSummary.sectionLevels[sec.id]?.NB || 0}
                      </td>
                      <td className="border border-slate-300 p-2 text-emerald-700">
                        {matrixSummary.sectionLevels[sec.id]?.TH || 0}
                      </td>
                      <td className="border border-slate-300 p-2 text-amber-700">
                        {matrixSummary.sectionLevels[sec.id]?.VD || 0}
                      </td>
                    </React.Fragment>
                  ))}
                  <td className="border border-slate-300 p-2 text-blue-800 bg-slate-200">
                    {matrixSummary.summaryLevels.NB}
                  </td>
                  <td className="border border-slate-300 p-2 text-emerald-800 bg-slate-200">
                    {matrixSummary.summaryLevels.TH}
                  </td>
                  <td className="border border-slate-300 p-2 text-amber-800 bg-slate-200">
                    {matrixSummary.summaryLevels.VD}
                  </td>
                  <td className="border border-slate-300 p-2 bg-blue-100 font-extrabold text-blue-900">
                    {matrixSummary.totalItems}
                  </td>
                  <td className="border border-slate-300 p-2 bg-blue-100 font-extrabold text-blue-900">
                    {matrixSummary.totalPoints.toFixed(2)}
                  </td>
                  <td className="border border-slate-300 p-2 bg-blue-100 font-extrabold text-blue-900">100%</td>
                </tr>

                {/* Total Points */}
                <tr className="bg-slate-100 font-sans font-bold text-slate-900">
                  <td colSpan={3} className="border border-slate-300 p-2 text-right">
                    Tổng điểm:
                  </td>
                  {activeSections.map(sec => (
                    <td key={sec.id} colSpan={3} className="border border-slate-300 p-2 text-blue-700">
                      {matrixSummary.sectionPoints[sec.id]?.toFixed(2)} đ
                    </td>
                  ))}
                  <td className="border border-slate-300 p-2 text-blue-800 bg-slate-200">
                    {matrixSummary.summaryLevelPoints.NB.toFixed(2)}
                  </td>
                  <td className="border border-slate-300 p-2 text-emerald-800 bg-slate-200">
                    {matrixSummary.summaryLevelPoints.TH.toFixed(2)}
                  </td>
                  <td className="border border-slate-300 p-2 text-amber-800 bg-slate-200">
                    {matrixSummary.summaryLevelPoints.VD.toFixed(2)}
                  </td>
                  <td colSpan={3} className="border border-slate-300 p-2 bg-blue-100 font-black text-blue-950">
                    {matrixSummary.totalPoints.toFixed(2)} điểm
                  </td>
                </tr>

                {/* Percentage Points */}
                <tr className="bg-slate-100 font-sans font-bold text-slate-900">
                  <td colSpan={3} className="border border-slate-300 p-2 text-right">
                    Tỉ lệ % điểm:
                  </td>
                  {activeSections.map(sec => {
                    const pct =
                      matrixSummary.totalPoints > 0
                        ? ((matrixSummary.sectionPoints[sec.id] || 0) / matrixSummary.totalPoints) * 100
                        : 0;
                    return (
                      <td key={sec.id} colSpan={3} className="border border-slate-300 p-2 text-slate-700">
                        {pct.toFixed(1)}%
                      </td>
                    );
                  })}
                  <td className="border border-slate-300 p-2 text-blue-800 bg-slate-200">
                    {matrixSummary.totalPoints > 0
                      ? ((matrixSummary.summaryLevelPoints.NB / matrixSummary.totalPoints) * 100).toFixed(1)
                      : 0}
                    %
                  </td>
                  <td className="border border-slate-300 p-2 text-emerald-800 bg-slate-200">
                    {matrixSummary.totalPoints > 0
                      ? ((matrixSummary.summaryLevelPoints.TH / matrixSummary.totalPoints) * 100).toFixed(1)
                      : 0}
                    %
                  </td>
                  <td className="border border-slate-300 p-2 text-amber-800 bg-slate-200">
                    {matrixSummary.totalPoints > 0
                      ? ((matrixSummary.summaryLevelPoints.VD / matrixSummary.totalPoints) * 100).toFixed(1)
                      : 0}
                    %
                  </td>
                  <td colSpan={3} className="border border-slate-300 p-2 bg-blue-100 font-black text-blue-950">
                    100%
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Specification Table */}
      {activeTab === 'spec' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FileText className="w-4 h-4 text-indigo-700" />
              <h3 className="text-sm font-bold text-slate-900">BẢN ĐẶC TẢ MA TRẬN ĐỀ KIỂM TRA</h3>
            </div>
            <span className="text-xs text-slate-500 italic">
              * Tự động gán vị trí câu hỏi (Câu 1, Câu 1.a, Câu 2...) tương ứng các phần thi
            </span>
          </div>

          <div className="overflow-x-auto p-4">
            <table className="w-full border-collapse border border-slate-300 text-xs font-serif">
              <thead>
                <tr className="bg-blue-900 text-white font-sans font-bold text-center">
                  <th className="border border-slate-300 p-2 w-10">TT</th>
                  <th className="border border-slate-300 p-2 w-40">Chương / Chủ đề</th>
                  <th className="border border-slate-300 p-2 w-48">Đơn vị kiến thức</th>
                  <th className="border border-slate-300 p-2 min-w-[320px]">
                    Mức độ đánh giá – Yêu cầu cần đạt
                  </th>
                  {activeSections.map(sec => (
                    <th key={sec.id} className="border border-slate-300 p-2 w-32">
                      {sec.shortTitle}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200">
                {specRows.map((row, idx) => {
                  const levelTitle =
                    row.level === 'NB' ? 'Nhận biết:' : row.level === 'TH' ? 'Thông hiểu:' : 'Vận dụng:';
                  const levelStyle =
                    row.level === 'NB'
                      ? 'text-blue-700 bg-blue-50 border-blue-200'
                      : row.level === 'TH'
                      ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
                      : 'text-amber-700 bg-amber-50 border-amber-200';

                  return (
                    <tr key={row.id} className="hover:bg-slate-50/50 transition">
                      <td className="border border-slate-300 p-2 text-center">{idx + 1}</td>
                      <td className="border border-slate-300 p-2 font-bold">{row.chapterName}</td>
                      <td className="border border-slate-300 p-2 font-sans">{row.lessonName}</td>
                      <td className="border border-slate-300 p-3 font-sans">
                        <div className="mb-1">
                          <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-bold border ${levelStyle}`}>
                            {levelTitle}
                          </span>
                        </div>
                        <ul className="space-y-1 list-disc list-inside text-slate-800 leading-relaxed text-xs">
                          {row.yccdList.map(y => (
                            <li key={y.id}>
                              <span>{y.text}</span>
                              <span className="font-mono text-[10px] text-slate-400 ml-1">[{y.id}]</span>
                            </li>
                          ))}
                        </ul>
                      </td>

                      {activeSections.map(sec => {
                        const qStr = row.sectionQuestions[sec.id] || '-';
                        return (
                          <td
                            key={sec.id}
                            className={`border border-slate-300 p-2 text-center font-sans font-semibold ${
                              qStr === '-' ? 'text-slate-400' : 'text-blue-900 bg-blue-50/20'
                            }`}
                          >
                            {qStr}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Validation Criteria */}
      {activeTab === 'validation' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 mb-2 flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-blue-600" />
              <span>Hệ thống kiểm tra 10 tiêu chí quy chuẩn ma trận đề thi</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Trước khi in hoặc xuất file Word chính thức, hệ thống tự động đối soát tổng điểm, số câu, tính nhất quán
              giữa ma trận và bản đặc tả, tính đầy đủ của YCCĐ và nguồn gốc dữ liệu.
            </p>
          </div>

          <div className="space-y-3">
            {issues.map(iss => {
              const isErr = iss.type === 'error';
              const isWarn = iss.type === 'warning';

              return (
                <div
                  key={iss.id}
                  className={`p-4 rounded-2xl border flex items-start justify-between gap-4 transition ${
                    isErr
                      ? 'bg-red-50 border-red-200 text-red-900'
                      : isWarn
                      ? 'bg-amber-50 border-amber-200 text-amber-900'
                      : 'bg-blue-50 border-blue-200 text-blue-900'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    {isErr ? (
                      <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
                    ) : isWarn ? (
                      <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
                    ) : (
                      <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                    )}
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider block mb-0.5">
                        {isErr ? 'Lỗi bắt buộc xử lí' : isWarn ? 'Cảnh báo cần lưu ý' : 'Thông tin gợi ý'}
                      </span>
                      <p className="text-sm font-medium">{iss.message}</p>
                    </div>
                  </div>

                  {iss.step && (
                    <button
                      type="button"
                      onClick={() => onJumpToStep(iss.step)}
                      className="flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 shadow-xs shrink-0 cursor-pointer"
                    >
                      <span>Sửa ở Bước {iss.step}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              );
            })}

            {issues.length === 0 && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center text-emerald-900">
                <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                <h4 className="text-base font-bold">Ma trận và bản đặc tả hoàn toàn hợp lệ!</h4>
                <p className="text-xs text-emerald-700 mt-1 max-w-md mx-auto">
                  Tổng điểm 10.0đ, số lượng câu hỏi khớp hoàn hảo với cấu trúc, tất cả YCCĐ đã được gán vị trí câu hỏi
                  và đối chiếu nguồn chuẩn Thông tư 32/2018. Bạn có thể xuất file Word ngay.
                </p>
              </div>
            )}
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
          <span>Quay lại: Phân bổ câu hỏi</span>
        </button>

        <button
          type="button"
          onClick={onExportWord}
          disabled={isExporting}
          className="flex items-center space-x-2 px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold shadow-lg shadow-blue-600/30 transition disabled:opacity-50 cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>{isExporting ? 'Đang xuất Word...' : 'Xuất file Word (.docx) ngay'}</span>
        </button>
      </div>
    </div>
  );
};

