import React, { useState } from 'react';
import {
  Cloud,
  Search,
  Plus,
  Copy,
  Trash2,
  Clock,
  BookOpen,
  X,
  FileText
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ExamProject, SubjectType, getSubjectName, getSubjectIcon } from '../../types/exam';

interface CloudExamsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoadExam: (exam: ExamProject) => void;
  onNewExam: () => void;
}

export const CloudExamsModal: React.FC<CloudExamsModalProps> = ({
  isOpen,
  onClose,
  onLoadExam,
  onNewExam
}) => {
  const { user, myExams, myExamsLoading, deleteExam } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  if (!isOpen) return null;

  const filtered = myExams.filter(item => {
    const q = searchQuery.toLowerCase();
    const matchTitle = item.title.toLowerCase().includes(q);
    const matchSubject = getSubjectName(item.subject as SubjectType).toLowerCase().includes(q);
    const matchGrade = `lớp ${item.grade}`.includes(q);
    return matchTitle || matchSubject || matchGrade;
  });

  const handleOpen = (item: any) => {
    try {
      const parsed = JSON.parse(item.projectData);
      onLoadExam(parsed);
      onClose();
    } catch {
      alert('Không thể mở đề thi: Dữ liệu bị lỗi.');
    }
  };

  const handleDuplicate = (item: any) => {
    try {
      const parsed = JSON.parse(item.projectData);
      onLoadExam({
        ...parsed,
        id: `exam-${Date.now()}`,
        generalInfo: {
          ...parsed.generalInfo,
          examName: `${parsed.generalInfo.examName} (Bản sao)`
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      onClose();
    } catch {
      alert('Không thể nhân bản ma trận này.');
    }
  };

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (confirm('Bạn có chắc chắn muốn xóa ma trận đề kiểm tra này khỏi kho lưu trữ cá nhân?')) {
      setDeletingId(id);
      try {
        await deleteExam(id);
      } catch {
        alert('Lỗi khi xóa đề thi. Vui lòng thử lại.');
      } finally {
        setDeletingId(null);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/10 rounded-xl">
              <Cloud className="w-6 h-6 text-blue-200" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight">Ma trận của cá nhân tôi</h2>
              <p className="text-xs text-blue-200">
                Lưu trữ trên đám mây Firebase của giáo viên:{' '}
                <span className="font-semibold">{user?.displayName}</span> ({user?.email})
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm kiếm ma trận theo tên, môn, lớp..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={() => {
                onNewExam();
                onClose();
              }}
              className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Tạo ma trận mới</span>
            </button>
          </div>
        </div>

        {/* List of cloud exams */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3 bg-slate-50/50">
          {myExamsLoading ? (
            <div className="py-16 text-center">
              <div className="inline-block w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
              <p className="text-sm text-slate-500 mt-3">Đang tải danh sách ma trận của bạn...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-16 text-center bg-white rounded-xl border border-dashed border-slate-300 p-8">
              <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-semibold text-slate-800">
                {searchQuery ? 'Không tìm thấy ma trận phù hợp' : 'Chưa có ma trận nào được lưu'}
              </h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                {searchQuery
                  ? 'Hãy thử tìm kiếm với từ khóa khác như tên bài kiểm tra, môn học hoặc khối lớp.'
                  : 'Hãy tạo ma trận mới hoặc mở mẫu tham khảo để lưu vào kho cá nhân của bạn.'}
              </p>
              {!searchQuery && (
                <button
                  onClick={() => {
                    onNewExam();
                    onClose();
                  }}
                  className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 shadow-xs cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Bắt đầu tạo đề ngay</span>
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filtered.map(item => {
                const subjectBadge = {
                  label: `${getSubjectIcon(item.subject as SubjectType)} ${getSubjectName(item.subject as SubjectType)}`,
                  bg:
                    item.subject === 'VatLi'
                      ? 'bg-blue-50 text-blue-700 border-blue-200'
                      : item.subject === 'Toan'
                      ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                      : item.subject === 'Hoa'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-purple-50 text-purple-700 border-purple-200'
                };

                let parsedProject: any = {};
                try {
                  parsedProject = JSON.parse(item.projectData);
                } catch {}

                const school = parsedProject.generalInfo?.schoolName || 'Chưa đặt trường';
                const duration = parsedProject.generalInfo?.durationMinutes || 45;
                const formattedDate = new Date(item.updatedAt).toLocaleDateString('vi-VN', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                });

                return (
                  <div
                    key={item.id}
                    className="bg-white border border-slate-200 hover:border-blue-400 rounded-xl p-4 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 text-xs font-semibold rounded-md border ${subjectBadge.bg}`}>
                            {subjectBadge.label}
                          </span>
                          <span className="px-2 py-0.5 text-xs font-semibold rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200 flex items-center gap-1">
                            <BookOpen className="w-3 h-3" />
                            Lớp {item.grade}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formattedDate}
                        </span>
                      </div>

                      <h3 className="font-semibold text-slate-900 text-sm line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {item.title}
                      </h3>

                      <div className="mt-2.5 text-xs text-slate-500 space-y-1">
                        <p className="truncate">
                          <span className="text-slate-400 font-normal">Đơn vị:</span> {school}
                        </p>
                        <p className="flex items-center gap-1.5 text-slate-500">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          {duration} phút • Mặc định SGK KNTT
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleDuplicate(item)}
                          title="Nhân bản ma trận này"
                          className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors text-xs flex items-center gap-1 cursor-pointer"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Nhân bản</span>
                        </button>
                        <button
                          onClick={e => handleDelete(e, item.id)}
                          disabled={deletingId === item.id}
                          title="Xóa ma trận"
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors text-xs flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Xóa</span>
                        </button>
                      </div>

                      <button
                        onClick={() => handleOpen(item)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white rounded-lg text-xs font-medium transition-colors cursor-pointer"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Mở ma trận</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-200 bg-white flex items-center justify-between text-xs text-slate-500">
          <span>Tổng số: {myExams.length} ma trận đã lưu trên đám mây tài khoản</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

