import React, { useState, useRef, useEffect } from 'react';
import {
  FileText,
  Save,
  Download,
  AlertTriangle,
  CheckCircle,
  Settings,
  BookOpen,
  FolderOpen,
  Sparkles,
  HelpCircle,
  ChevronDown,
  User,
  ShieldCheck,
  Key,
  Cloud
} from 'lucide-react';
import { ExamProject, ValidationIssue } from '../../types/exam';
import { useAuth } from '../../context/AuthContext';

interface HeaderProps {
  project: ExamProject;
  validationIssues: ValidationIssue[];
  onSave: () => void;
  onOpenSavedModal: () => void;
  onOpenCurriculumModal: () => void;
  onOpenSettingsModal: () => void;
  onOpenHelpModal: () => void;
  onLoadSample: (sampleKey: 'physics10' | 'math10' | 'math12' | 'chemistry10' | 'english10') => void;
  onExportWord: () => void;
  onLoadExam: (exam: ExamProject) => void;
  onNewExam: () => void;
  onOpenActivationModal: () => void;
  onOpenCloudExamsModal: () => void;
  onOpenOnlineStorageModal: () => void;
  onOpenAdminModal: () => void;
  onNavigateStep?: (step: number) => void;
  isExporting: boolean;
  saveStatus: string | null;
}

export const Header: React.FC<HeaderProps> = ({
  project,
  validationIssues,
  onSave,
  onOpenSavedModal,
  onOpenCurriculumModal,
  onOpenSettingsModal,
  onOpenHelpModal,
  onLoadSample,
  onExportWord,
  onNewExam,
  onOpenActivationModal,
  onOpenCloudExamsModal,
  onOpenOnlineStorageModal,
  onOpenAdminModal,
  onNavigateStep,
  isExporting,
  saveStatus
}) => {
  const { user, isAdmin, canEdit, login, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [issuesOpen, setIssuesOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const issuesRef = useRef<HTMLDivElement>(null);

  const errorCount = validationIssues.filter(i => i.type === 'error').length;
  const warningCount = validationIssues.filter(i => i.type === 'warning').length;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
      if (issuesRef.current && !issuesRef.current.contains(e.target as Node)) {
        setIssuesOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-30 shadow-md">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
        {/* Logo & Author */}
        <div className="flex items-center space-x-2.5 sm:space-x-3 shrink-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-md shadow-blue-500/20 shrink-0">
            <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <div className="leading-tight">
            <h1 className="font-bold text-sm sm:text-base tracking-tight text-white truncate max-w-[180px] sm:max-w-none">
              STUDIO &quot;MATH TEST&quot;
            </h1>
            <p className="text-xs text-blue-300 font-medium truncate max-w-[180px] sm:max-w-none">
              Thầy Hùng TBS - 0907117193
            </p>
          </div>
        </div>

        {/* Validation Badges & Actions */}
        <div className="flex items-center space-x-1.5 sm:space-x-2">
          <div className="relative" ref={issuesRef}>
            {errorCount > 0 ? (
              <button
                type="button"
                onClick={() => setIssuesOpen(!issuesOpen)}
                className="flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-red-900/60 hover:bg-red-900 text-red-200 border border-red-700 transition cursor-pointer"
                title="Bấm để xem chi tiết các lỗi cần hoàn thiện"
              >
                <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                <span>{errorCount} lỗi</span>
                <ChevronDown className={`w-3 h-3 text-red-300 transition-transform ${issuesOpen ? 'rotate-180' : ''}`} />
              </button>
            ) : warningCount > 0 ? (
              <button
                type="button"
                onClick={() => setIssuesOpen(!issuesOpen)}
                className="flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-amber-900/60 hover:bg-amber-900 text-amber-200 border border-amber-700 transition cursor-pointer"
                title="Bấm để xem các lưu ý"
              >
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                <span>{warningCount} lưu ý</span>
                <ChevronDown className={`w-3 h-3 text-amber-300 transition-transform ${issuesOpen ? 'rotate-180' : ''}`} />
              </button>
            ) : (
              <div className="hidden sm:flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs bg-emerald-900/40 text-emerald-300 border border-emerald-700 shrink-0">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>Hợp lệ</span>
              </div>
            )}

            {issuesOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-slate-800 rounded-xl shadow-2xl border border-slate-700 p-3 z-50 text-slate-200 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between pb-2 border-b border-slate-700 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center space-x-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                    <span>Chi tiết lỗi & lưu ý ({validationIssues.length})</span>
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">Chuẩn 2025</span>
                </div>
                <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                  {validationIssues.map(issue => (
                    <div
                      key={issue.id}
                      className={`p-2.5 rounded-lg border text-xs flex items-start justify-between gap-2 ${
                        issue.type === 'error'
                          ? 'bg-red-950/40 border-red-800/60 text-red-200'
                          : issue.type === 'warning'
                          ? 'bg-amber-950/40 border-amber-800/60 text-amber-200'
                          : 'bg-blue-950/40 border-blue-800/60 text-blue-200'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="font-semibold">{issue.message}</div>
                        <div className="text-[10px] opacity-75">Vị trí: Bước {issue.step}</div>
                      </div>
                      {onNavigateStep && (
                        <button
                          type="button"
                          onClick={() => {
                            onNavigateStep(issue.step);
                            setIssuesOpen(false);
                          }}
                          className="shrink-0 px-2 py-1 bg-slate-700 hover:bg-slate-600 rounded text-[11px] font-medium text-white transition cursor-pointer"
                        >
                          Tới Bước {issue.step}
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Tools Dropdown */}
          <div className="relative" ref={menuRef}>
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>Công cụ</span>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${menuOpen ? 'rotate-180' : ''}`} />
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-slate-800 rounded-xl shadow-2xl border border-slate-700 py-1.5 z-50 text-slate-200 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-700/60 flex items-center justify-between">
                  <span>Tiện ích soạn ma trận</span>
                  <span className="text-[9px] text-blue-400 font-semibold">KNTT 2018</span>
                </div>

                <button
                  onClick={() => {
                    onOpenCurriculumModal();
                    setMenuOpen(false);
                  }}
                  className="w-full text-left px-3.5 py-2 text-xs hover:bg-slate-700/70 flex items-center space-x-2.5 transition cursor-pointer"
                >
                  <BookOpen className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <p className="font-semibold text-white">Kho YCCĐ (SGK KNTT)</p>
                    <p className="text-[11px] text-slate-400">Tra cứu 4 môn: Toán, Lí, Hóa, Anh</p>
                  </div>
                </button>

                <button
                  onClick={() => {
                    onOpenSavedModal();
                    setMenuOpen(false);
                  }}
                  className="w-full text-left px-3.5 py-2 text-xs hover:bg-slate-700/70 flex items-center space-x-2.5 transition cursor-pointer"
                >
                  <FolderOpen className="w-4 h-4 text-indigo-400 shrink-0" />
                  <div>
                    <p className="font-semibold text-white">Đề đã lưu trên máy</p>
                    <p className="text-[11px] text-slate-400">Xem và khôi phục các bản nháp</p>
                  </div>
                </button>

                <button
                  onClick={() => {
                    onOpenOnlineStorageModal();
                    setMenuOpen(false);
                  }}
                  className="w-full text-left px-3.5 py-2 text-xs hover:bg-slate-700/70 flex items-center space-x-2.5 transition cursor-pointer"
                >
                  <Cloud className="w-4 h-4 text-sky-400 shrink-0" />
                  <div>
                    <p className="font-semibold text-white">Đám mây & Google Sheets</p>
                    <p className="text-[11px] text-slate-400">Đồng bộ Firebase & Xuất bảng tính</p>
                  </div>
                </button>

                <div className="px-3.5 pt-2 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-t border-slate-700/60">
                  Nạp đề mẫu chuẩn
                </div>

                <div className="px-2 space-y-1">
                  <button
                    onClick={() => {
                      onLoadSample('physics10');
                      setMenuOpen(false);
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs hover:bg-slate-700/70 text-slate-200 flex items-center space-x-2 transition cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <div className="truncate">
                      <span className="font-medium text-blue-300">Vật lí 10</span>
                      <span className="text-slate-400 text-[11px] ml-1.5">(Chuẩn PDF Bộ GD)</span>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      onLoadSample('math10');
                      setMenuOpen(false);
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs hover:bg-slate-700/70 text-slate-200 flex items-center space-x-2 transition cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                    <div className="truncate">
                      <span className="font-medium text-teal-300">Toán 10</span>
                      <span className="text-slate-400 text-[11px] ml-1.5">(Giữa kì I)</span>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      onLoadSample('math12');
                      setMenuOpen(false);
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs hover:bg-slate-700/70 text-slate-200 flex items-center space-x-2 transition cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                    <div className="truncate">
                      <span className="font-medium text-purple-300">Toán 12</span>
                      <span className="text-slate-400 text-[11px] ml-1.5">(Khảo sát hàm số, Oxyz)</span>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      onLoadSample('chemistry10');
                      setMenuOpen(false);
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs hover:bg-slate-700/70 text-slate-200 flex items-center space-x-2 transition cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <div className="truncate">
                      <span className="font-medium text-emerald-300">Hóa học 10</span>
                      <span className="text-slate-400 text-[11px] ml-1.5">(Cấu tạo NT & BTH)</span>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      onLoadSample('english10');
                      setMenuOpen(false);
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs hover:bg-slate-700/70 text-slate-200 flex items-center space-x-2 transition cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                    <div className="truncate">
                      <span className="font-medium text-indigo-300">Tiếng Anh 10</span>
                      <span className="text-slate-400 text-[11px] ml-1.5">(Global Success U1-U2)</span>
                    </div>
                  </button>
                </div>

                <div className="border-t border-slate-700/60 my-1" />

                <button
                  onClick={() => {
                    onOpenSettingsModal();
                    setMenuOpen(false);
                  }}
                  className="w-full text-left px-3.5 py-2 text-xs hover:bg-slate-700/70 flex items-center space-x-2.5 transition cursor-pointer"
                >
                  <Settings className="w-4 h-4 text-slate-400 shrink-0" />
                  <div>
                    <p className="font-medium text-white">Cài đặt xuất Word</p>
                    <p className="text-[11px] text-slate-400">Màu sắc bảng, font chữ, khổ giấy</p>
                  </div>
                </button>

                <button
                  onClick={() => {
                    onOpenHelpModal();
                    setMenuOpen(false);
                  }}
                  className="w-full text-left px-3.5 py-2 text-xs hover:bg-slate-700/70 flex items-center space-x-2.5 transition cursor-pointer"
                >
                  <HelpCircle className="w-4 h-4 text-slate-400 shrink-0" />
                  <div>
                    <p className="font-medium text-white">Hướng dẫn & Cơ sở pháp lý</p>
                    <p className="text-[11px] text-slate-400">Quy định GDPT 2018 & Thông tư 32</p>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* Online Storage & Sync */}
          <button
            onClick={onOpenOnlineStorageModal}
            title="Đồng bộ kho đề lên Firebase & Google Sheets"
            className="flex items-center space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold bg-sky-950/70 hover:bg-sky-900 text-sky-200 border border-sky-700/60 transition cursor-pointer"
          >
            <Cloud className="w-3.5 h-3.5 text-sky-400" />
            <span className="hidden md:inline">Cloud & Sheets</span>
          </button>

          {/* New Exam */}
          <button
            onClick={onNewExam}
            title="Tạo ma trận đề mới"
            className="flex items-center space-x-1 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition cursor-pointer"
          >
            <span>Mới</span>
          </button>

          {/* Save button */}
          <button
            onClick={onSave}
            title="Lưu bản nháp đề thi"
            className="flex items-center space-x-1 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition cursor-pointer"
          >
            <Save className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden sm:inline">Lưu</span>
          </button>

          {/* Export Word */}
          <button
            onClick={onExportWord}
            disabled={isExporting}
            className="flex items-center space-x-1.5 px-3 sm:px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-md shadow-blue-600/30 transition disabled:opacity-50 shrink-0 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isExporting ? 'Đang tạo...' : 'Xuất Word'}</span>
          </button>

          <div className="h-5 w-px bg-slate-800 mx-0.5 sm:mx-1 hidden sm:block" />

          {/* User / Authentication Dropdown */}
          <div className="relative" ref={userMenuRef}>
            {user ? (
              <button
                type="button"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition cursor-pointer"
              >
                <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[10px]">
                  {user.displayName.charAt(0).toUpperCase()}
                </div>
                <span className="max-w-[80px] sm:max-w-[120px] truncate">{user.displayName}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => login()}
                className="flex items-center space-x-1 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium bg-amber-600 hover:bg-amber-700 text-white transition cursor-pointer"
              >
                <User className="w-3.5 h-3.5" />
                <span>Đăng nhập</span>
              </button>
            )}

            {userMenuOpen && user && (
              <div className="absolute right-0 mt-2 w-64 bg-slate-800 rounded-xl shadow-2xl border border-slate-700 py-1.5 z-50 text-slate-200 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3.5 py-2 border-b border-slate-700/60">
                  <p className="text-xs font-bold text-white truncate">{user.displayName}</p>
                  <p className="text-[11px] text-slate-400 truncate font-mono">{user.email}</p>
                  <div className="mt-1 flex items-center gap-1.5">
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                        isAdmin
                          ? 'bg-purple-900 text-purple-200 border border-purple-700'
                          : canEdit
                          ? 'bg-emerald-900 text-emerald-200 border border-emerald-700'
                          : 'bg-amber-900 text-amber-200 border border-amber-700'
                      }`}
                    >
                      {isAdmin ? 'Quản trị viên' : canEdit ? 'Giáo viên đã kích hoạt' : 'Chế độ khách'}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onOpenCloudExamsModal();
                    setUserMenuOpen(false);
                  }}
                  className="w-full text-left px-3.5 py-2 text-xs hover:bg-slate-700/70 flex items-center space-x-2 transition cursor-pointer"
                >
                  <FolderOpen className="w-3.5 h-3.5 text-blue-400" />
                  <span>Ma trận đám mây của tôi</span>
                </button>

                <button
                  onClick={() => {
                    onOpenActivationModal();
                    setUserMenuOpen(false);
                  }}
                  className="w-full text-left px-3.5 py-2 text-xs hover:bg-slate-700/70 flex items-center space-x-2 transition cursor-pointer"
                >
                  <Key className="w-3.5 h-3.5 text-amber-400" />
                  <span>Kích hoạt quyền / Gia hạn (Mã 6 ký tự)</span>
                </button>

                {isAdmin && (
                  <button
                    onClick={() => {
                      onOpenAdminModal();
                      setUserMenuOpen(false);
                    }}
                    className="w-full text-left px-3.5 py-2 text-xs hover:bg-slate-700/70 flex items-center space-x-2 text-purple-300 transition cursor-pointer border-t border-slate-700/60"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                    <span>Quản trị hệ thống (Thầy Hùng TBS)</span>
                  </button>
                )}

                <div className="border-t border-slate-700/60 my-1" />

                <button
                  onClick={() => {
                    logout();
                    setUserMenuOpen(false);
                  }}
                  className="w-full text-left px-3.5 py-2 text-xs text-red-400 hover:bg-slate-700/70 transition cursor-pointer"
                >
                  Đăng xuất
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {saveStatus && (
        <div className="bg-emerald-600 text-white text-xs py-1 px-4 text-center transition-all animate-pulse">
          {saveStatus}
        </div>
      )}
    </header>
  );
};

