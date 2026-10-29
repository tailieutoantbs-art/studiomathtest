import React, { useRef } from 'react';
import {
  FolderOpen,
  X,
  Upload,
  Download,
  Copy,
  Trash2,
  CheckCircle,
  FileText
} from 'lucide-react';
import { ExamProject, getSubjectName, getSubjectIcon } from '../../types/exam';
import { exportBackupJson, importBackupJson } from '../../services/storageService';

interface SavedExamsModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedProjects: ExamProject[];
  currentProjectId: string;
  onSelectProject: (project: ExamProject) => void;
  onDuplicateProject: (project: ExamProject) => void;
  onDeleteProject: (id: string) => void;
  onReloadAllProjects: () => void;
}

export const SavedExamsModal: React.FC<SavedExamsModalProps> = ({
  isOpen,
  onClose,
  savedProjects,
  currentProjectId,
  onSelectProject,
  onDuplicateProject,
  onDeleteProject,
  onReloadAllProjects
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = ev => {
      try {
        const text = ev.target?.result as string;
        importBackupJson(text);
        onReloadAllProjects();
        alert('Đã nhập thành công các đề kiểm tra từ file JSON!');
      } catch {
        alert('Lỗi nhập file JSON: Tệp không đúng định dạng sao lưu.');
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[85vh] flex flex-col overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-blue-600 rounded-xl text-white shadow-xs">
              <FolderOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Quản lý Danh sách Ma trận & Bản đặc tả đã lưu
              </h3>
              <p className="text-xs text-slate-500">
                Lưu trữ bền vững trên trình duyệt • Hỗ trợ sao lưu và đồng bộ dạng file JSON
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action bar */}
        <div className="p-3 bg-slate-100/70 border-b border-slate-200 flex items-center justify-between gap-3 text-xs">
          <span className="font-semibold text-slate-700">
            Hiện có: <strong>{savedProjects.length}</strong> ma trận đề thi
          </span>
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => exportBackupJson(savedProjects)}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium transition cursor-pointer shadow-2xs"
            >
              <Download className="w-3.5 h-3.5 text-blue-600" />
              <span>Xuất sao lưu JSON</span>
            </button>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium transition cursor-pointer shadow-2xs"
            >
              <Upload className="w-3.5 h-3.5 text-emerald-600" />
              <span>Nhập file JSON</span>
            </button>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImportFile}
              accept=".json"
              className="hidden"
            />
          </div>
        </div>

        {/* Exams List */}
        <div className="p-5 overflow-y-auto space-y-3 flex-1">
          {savedProjects.length === 0 ? (
            <div className="text-center py-10 text-slate-400">Chưa có ma trận nào được lưu.</div>
          ) : (
            savedProjects.map(proj => {
              const isCurrent = proj.id === currentProjectId;
              return (
                <div
                  key={proj.id}
                  className={`p-4 rounded-2xl border transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    isCurrent
                      ? 'bg-blue-50/60 border-blue-400 shadow-xs ring-1 ring-blue-400'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                        {getSubjectIcon(proj.generalInfo.subject)} {getSubjectName(proj.generalInfo.subject)} {proj.generalInfo.grade}
                      </span>
                      <span className="text-xs font-semibold text-slate-500">
                        {proj.generalInfo.semester} • {proj.generalInfo.schoolYear}
                      </span>
                      {isCurrent && (
                        <span className="inline-flex items-center text-[10px] font-bold text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded-full">
                          <CheckCircle className="w-3 h-3 mr-0.5" />
                          Đang mở
                        </span>
                      )}
                    </div>

                    <h4 className="text-sm font-bold text-slate-900">{proj.generalInfo.examName}</h4>
                    <p className="text-xs text-slate-500">
                      {proj.generalInfo.schoolName || 'Chưa đặt trường'} • Thời gian:{' '}
                      {proj.generalInfo.durationMinutes}p • {Object.keys(proj.yccdSelections).length} YCCĐ
                    </p>
                  </div>

                  <div className="flex items-center space-x-2 self-end sm:self-center">
                    {!isCurrent && (
                      <button
                        type="button"
                        onClick={() => {
                          onSelectProject(proj);
                          onClose();
                        }}
                        className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition cursor-pointer"
                      >
                        Mở đề này
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => onDuplicateProject(proj)}
                      title="Tạo bản sao ma trận này"
                      className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition cursor-pointer"
                    >
                      <Copy className="w-4 h-4" />
                    </button>

                    {savedProjects.length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm(`Bạn chắc chắn muốn xóa ma trận "${proj.generalInfo.examName}"?`)) {
                            onDeleteProject(proj.id);
                          }
                        }}
                        title="Xóa ma trận"
                        className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 border border-slate-200 transition cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-100 transition cursor-pointer"
          >
            Đóng cửa sổ
          </button>
        </div>
      </div>
    </div>
  );
};

