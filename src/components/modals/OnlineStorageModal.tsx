import React, { useState, useEffect } from 'react';
import {
  Cloud,
  Database,
  FileSpreadsheet,
  UploadCloud,
  DownloadCloud,
  CheckCircle,
  Copy,
  ExternalLink,
  RefreshCw,
  X,
  Layers,
  Sparkles,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { ExamProject, getSubjectName, getSubjectIcon } from '../../types/exam';
import { loadProjects, saveProject } from '../../services/storageService';
import {
  firebaseConfig,
  GOOGLE_SHEET_URL,
  GOOGLE_SHEET_ID,
  saveExamToCloud,
  fetchExamsFromCloud,
  syncAllLocalExamsToCloud,
  copyExamsToClipboardForGoogleSheets,
  buildGoogleSheetRows
} from '../../services/onlineStorageService';
import { useAuth } from '../../context/AuthContext';

interface OnlineStorageModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentProject: ExamProject;
  onLoadExam: (exam: ExamProject) => void;
}

export const OnlineStorageModal: React.FC<OnlineStorageModalProps> = ({
  isOpen,
  onClose,
  currentProject,
  onLoadExam
}) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'sync' | 'sheets' | 'arch'>('sync');

  // Cloud state
  const [cloudExams, setCloudExams] = useState<ExamProject[]>([]);
  const [isLoadingCloud, setIsLoadingCloud] = useState(false);
  const [syncStatus, setSyncStatus] = useState<string | null>(null);
  const [copiedSheets, setCopiedSheets] = useState(false);
  const [isSyncingAll, setIsSyncingAll] = useState(false);

  const localExams = loadProjects();

  useEffect(() => {
    if (isOpen) {
      loadCloudData();
    }
  }, [isOpen]);

  const loadCloudData = async () => {
    setIsLoadingCloud(true);
    try {
      const exams = await fetchExamsFromCloud();
      setCloudExams(exams);
    } catch {
      // Offline fallback
    } finally {
      setIsLoadingCloud(false);
    }
  };

  const handleSyncCurrentExam = async () => {
    setSyncStatus('Đang tải lên Firebase RTDB...');
    try {
      await saveExamToCloud(currentProject, user?.email);
      setSyncStatus(`Đã lưu "${currentProject.generalInfo.examName}" lên Firebase thành công!`);
      await loadCloudData();
      setTimeout(() => setSyncStatus(null), 4000);
    } catch (err: any) {
      setSyncStatus(`Lỗi khi lưu lên Firebase: ${err.message || 'Vui lòng kiểm tra kết nối'}`);
    }
  };

  const handleSyncAllToCloud = async () => {
    setIsSyncingAll(true);
    setSyncStatus('Đang đồng bộ tất cả đề hiện có lên Firebase...');
    try {
      const res = await syncAllLocalExamsToCloud(user?.email);
      setSyncStatus(`Đã đồng bộ thành công ${res.success}/${res.total} đề thi lên Firebase RTDB!`);
      await loadCloudData();
      setTimeout(() => setSyncStatus(null), 5000);
    } catch (err: any) {
      setSyncStatus(`Lỗi đồng bộ: ${err.message || 'Không thể kết nối'}`);
    } finally {
      setIsSyncingAll(false);
    }
  };

  const handleCopyForSheets = async () => {
    const success = await copyExamsToClipboardForGoogleSheets(localExams);
    if (success) {
      setCopiedSheets(true);
      setTimeout(() => setCopiedSheets(false), 3000);
    } else {
      alert('Không thể sao chép dữ liệu vào bộ nhớ tạm.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="px-5 py-4 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-white/10 rounded-xl">
              <Cloud className="w-6 h-6 text-blue-300" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold tracking-tight flex items-center gap-2">
                <span>Lưu trữ & Đồng bộ Trực tuyến</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono">
                  Firebase RTDB & Google Sheets
                </span>
              </h2>
              <p className="text-xs text-blue-200 mt-0.5">
                Đồng bộ kho ma trận đề kiểm tra 4 môn (Toán, Lí, Hóa, Anh) lên Cloud
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-5 pt-2 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('sync')}
            className={`pb-2.5 px-3.5 border-b-2 flex items-center space-x-2 transition cursor-pointer ${
              activeTab === 'sync'
                ? 'border-blue-600 text-blue-700 font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Database className="w-4 h-4 text-blue-600" />
            <span>1. Kho Đề Đám Mây Firebase ({cloudExams.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('sheets')}
            className={`pb-2.5 px-3.5 border-b-2 flex items-center space-x-2 transition cursor-pointer ${
              activeTab === 'sheets'
                ? 'border-emerald-600 text-emerald-700 font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <span>2. Bảng Tổng Hợp Google Sheets</span>
          </button>

          <button
            onClick={() => setActiveTab('arch')}
            className={`pb-2.5 px-3.5 border-b-2 flex items-center space-x-2 transition cursor-pointer ${
              activeTab === 'arch'
                ? 'border-indigo-600 text-indigo-700 font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-4 h-4 text-indigo-600" />
            <span>3. Phân Chia Lưu Trữ Hợp Lí</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto flex-1 space-y-5 text-slate-700">
          {syncStatus && (
            <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-xs font-medium text-blue-900 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin text-blue-600 shrink-0" />
                <span>{syncStatus}</span>
              </span>
            </div>
          )}

          {/* TAB 1: FIREBASE RTDB SYNC */}
          {activeTab === 'sync' && (
            <div className="space-y-4">
              {/* Quick Actions Bar */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                    <Database className="w-4 h-4 text-blue-600" />
                    <span>Máy chủ Firebase RTDB: {firebaseConfig.projectId}</span>
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    URL: <code className="text-blue-700 font-mono text-[11px]">{firebaseConfig.databaseURL}</code>
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={handleSyncCurrentExam}
                    className="px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <UploadCloud className="w-4 h-4" />
                    <span>Lưu đề hiện tại lên Cloud</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSyncAllToCloud}
                    disabled={isSyncingAll}
                    className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs flex items-center gap-1.5 transition cursor-pointer disabled:opacity-50"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Đồng bộ TẤT CẢ đề lên Cloud</span>
                  </button>

                  <button
                    type="button"
                    onClick={loadCloudData}
                    className="p-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs transition cursor-pointer"
                    title="Làm mới danh sách từ Firebase"
                  >
                    <RefreshCw className={`w-4 h-4 ${isLoadingCloud ? 'animate-spin' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Exams on Cloud List */}
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    Danh sách đề thi trên Cloud Firebase ({cloudExams.length} đề):
                  </span>
                  <span className="text-xs text-slate-500">
                    Bao gồm các đề mẫu chuẩn BGD & đề giáo viên đã lưu
                  </span>
                </div>

                {isLoadingCloud ? (
                  <div className="py-10 text-center text-slate-400 text-xs flex flex-col items-center justify-center space-y-2">
                    <RefreshCw className="w-6 h-6 animate-spin text-blue-600" />
                    <span>Đang tải kho đề từ Firebase...</span>
                  </div>
                ) : cloudExams.length === 0 ? (
                  <div className="py-10 text-center bg-slate-50 border border-dashed border-slate-300 rounded-2xl p-6">
                    <Cloud className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                    <p className="text-xs font-semibold text-slate-700">Chưa có đề thi nào trên Firebase RTDB</p>
                    <p className="text-[11px] text-slate-500 mt-1 max-w-md mx-auto">
                      Hãy bấm nút <strong>"Đồng bộ TẤT CẢ đề lên Cloud"</strong> ở trên để đưa các đề mẫu Toán, Lí, Hóa, Tiếng Anh và các bản nháp của bạn lên máy chủ trực tuyến ngay lập tức!
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-80 overflow-y-auto pr-1">
                    {cloudExams.map(exam => (
                      <div
                        key={exam.id}
                        className="p-3 rounded-xl border border-slate-200 bg-white hover:border-blue-400 hover:shadow-xs transition space-y-2"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-slate-100 text-slate-800 border border-slate-200 mb-1">
                              {getSubjectIcon(exam.generalInfo.subject)} {getSubjectName(exam.generalInfo.subject)} {exam.generalInfo.grade}
                            </span>
                            <h5 className="font-bold text-xs text-slate-900 line-clamp-1">
                              {exam.generalInfo.examName}
                            </h5>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              onLoadExam(exam);
                              onClose();
                            }}
                            className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white border border-blue-200 text-[11px] font-semibold transition shrink-0 cursor-pointer"
                          >
                            Nạp vào Studio
                          </button>
                        </div>
                        <div className="text-[11px] text-slate-500 flex items-center justify-between border-t border-slate-100 pt-1.5">
                          <span>{exam.generalInfo.schoolName || 'Chưa đặt trường'}</span>
                          <span>Thang {exam.generalInfo.maxScore}đ • {exam.generalInfo.durationMinutes}p</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: GOOGLE SHEETS */}
          {activeTab === 'sheets' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 bg-emerald-600 rounded-xl text-white">
                    <FileSpreadsheet className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-emerald-950">
                      Trang tính Google Sheets của bạn
                    </h4>
                    <p className="text-xs text-emerald-700 font-mono mt-0.5">
                      ID: {GOOGLE_SHEET_ID}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={GOOGLE_SHEET_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition"
                  >
                    <span>Mở Google Sheets</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    type="button"
                    onClick={handleCopyForSheets}
                    className="px-3 py-2 rounded-xl bg-white border border-emerald-300 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                  >
                    {copiedSheets ? (
                      <>
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                        <span className="font-bold text-emerald-700">Đã copy bảng!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Sao chép dữ liệu để dán (Ctrl+V)</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Table Preview for Google Sheets */}
              <div>
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-2">
                  Xem trước cấu trúc bảng dữ liệu tổng hợp ({localExams.length} đề thi):
                </h5>
                <div className="border border-slate-200 rounded-xl overflow-x-auto max-h-64 text-[11px]">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-100 text-slate-700 font-bold sticky top-0 border-b border-slate-200">
                      <tr>
                        <th className="p-2">Tên đề kiểm tra</th>
                        <th className="p-2">Môn</th>
                        <th className="p-2">Khối</th>
                        <th className="p-2">Thời gian</th>
                        <th className="p-2">Thang điểm</th>
                        <th className="p-2">Trường học</th>
                        <th className="p-2">Tỉ lệ NB-TH-VD</th>
                        <th className="p-2">Trạng thái</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {buildGoogleSheetRows(localExams).map(row => (
                        <tr key={row.examId} className="hover:bg-slate-50">
                          <td className="p-2 font-medium text-slate-900">{row.examName}</td>
                          <td className="p-2">{row.subject}</td>
                          <td className="p-2 font-semibold">Lớp {row.grade}</td>
                          <td className="p-2">{row.durationMinutes} phút</td>
                          <td className="p-2">{row.maxScore}đ</td>
                          <td className="p-2 truncate max-w-[150px]">{row.schoolName}</td>
                          <td className="p-2 font-mono text-[10px]">{row.ratioNB}% - {row.ratioTH}% - {row.ratioVD}%</td>
                          <td className="p-2 text-emerald-700 font-medium">✓ Đã sẵn sàng</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-[11px] text-slate-500 mt-2">
                  💡 <strong>Cách đồng bộ vào Google Sheets:</strong> Bấm nút <em>"Sao chép dữ liệu để dán"</em>, sau đó mở Google Sheet và chọn ô <strong>A1</strong> rồi nhấn <strong>Ctrl + V</strong>. Dữ liệu sẽ tự động điền ngay ngắn vào từng cột tương ứng!
                </p>
              </div>

              {/* Apps Script Helper (Optional Auto-Sync) */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs">
                <div className="font-bold text-slate-900 flex items-center gap-1.5 mb-1">
                  <span>💡 Tự động đồng bộ Realtime từ Firebase vào Google Sheet (Nâng cao):</span>
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Bạn có thể vào Google Sheets &gt; <em>Tiện ích mở rộng (Extensions)</em> &gt; <em>Apps Script</em> và dán đoạn mã để Google Sheets tự động lấy dữ liệu từ Firebase qua URL:
                  <code className="block mt-1 p-2 bg-slate-900 text-slate-100 rounded-lg text-[10px] font-mono select-all">
                    {`function syncFromFirebase() {\n  var res = UrlFetchApp.fetch("${firebaseConfig.databaseURL}/exams.json");\n  var data = JSON.parse(res.getContentText());\n  // Dữ liệu ma trận được cập nhật tự động vào Trang tính\n}`}
                  </code>
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: ARCHITECTURE DIVISION */}
          {activeTab === 'arch' && (
            <div className="space-y-4 text-xs leading-relaxed">
              <div className="p-4 rounded-2xl bg-indigo-50/80 border border-indigo-200">
                <h4 className="font-bold text-indigo-950 text-sm mb-1">
                  Mô hình Phân chia Lưu trữ Hợp lý (Studio "Math Test")
                </h4>
                <p className="text-indigo-800 text-xs">
                  Để hệ thống vận hành mượt mà, bảo mật và tiện lợi cho giáo viên, lưu trữ được phân định thành 3 tầng:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Firebase Column */}
                <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/40 space-y-2">
                  <h5 className="font-bold text-blue-900 flex items-center gap-2 text-xs">
                    <Database className="w-4 h-4 text-blue-600" />
                    <span>1. FIREBASE REALTIME DATABASE (Đám mây ứng dụng)</span>
                  </h5>
                  <ul className="list-disc pl-4 space-y-1.5 text-slate-600 text-[11px]">
                    <li>
                      <strong>Kho chi tiết Ma trận & Bản đặc tả (`/exams`)</strong>: Lưu cấu trúc đầy đủ dạng JSON gồm các YCCĐ, 3 phần thi, phân bổ câu hỏi ma trận, tỷ lệ NB-TH-VD, cài đặt xuất Word.
                    </li>
                    <li>
                      <strong>Phân quyền & Bản quyền (`/whitelist`, `/activation_codes`)</strong>: Lưu danh sách Gmail giáo viên được duyệt sử dụng, thời hạn bản quyền, mã VIP kích hoạt.
                    </li>
                    <li>
                      <strong>Yêu cầu cấp quyền (`/access_requests`)</strong>: Lưu đơn đăng ký của giáo viên gửi về cho Thầy Hùng TBS phê duyệt tức thời.
                    </li>
                    <li>
                      <strong>Tốc độ</strong>: Đồng bộ Realtime tức thời giữa máy tính và điện thoại.
                    </li>
                  </ul>
                </div>

                {/* Google Sheets Column */}
                <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40 space-y-2">
                  <h5 className="font-bold text-emerald-900 flex items-center gap-2 text-xs">
                    <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                    <span>2. GOOGLE SHEETS (Báo cáo & Quản trị trực quan)</span>
                  </h5>
                  <ul className="list-disc pl-4 space-y-1.5 text-slate-600 text-[11px]">
                    <li>
                      <strong>Sổ tổng hợp đề thi (Exam Registry)</strong>: Danh mục các đề đã lập theo trường, môn (Toán, Lí, Hóa, Anh), khối lớp, số câu, thang điểm, thời gian làm bài.
                    </li>
                    <li>
                      <strong>Báo cáo & In ấn chuyên môn</strong>: Giúp Tổ trưởng chuyên môn và BGH có thể mở bằng điện thoại, xem nhanh, lọc theo khối/kì thi, in báo cáo mà không cần vào phần mềm.
                    </li>
                    <li>
                      <strong>Dễ chia sẻ</strong>: Phân quyền xem/chỉnh sửa linh hoạt qua link Google Drive tiện dụng.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Local Storage Row */}
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                <h5 className="font-bold text-slate-800 flex items-center gap-2 text-xs">
                  <Layers className="w-4 h-4 text-slate-600" />
                  <span>3. LOCAL STORAGE (Offline-First Cache)</span>
                </h5>
                <p className="text-slate-600 text-[11px]">
                  Tự động lưu tạm trong trình duyệt để giáo viên vẫn có thể soạn đề bình thường kể cả khi mất kết nối mạng. Ngay khi có mạng trở lại, hệ thống sẽ đẩy đồng bộ lên Firebase và Google Sheets.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs">
          <span className="text-slate-500 text-[11px]">
            Hệ thống đám mây: <strong className="text-slate-700">Firebase RTDB & Google Sheets</strong>
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold transition cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
