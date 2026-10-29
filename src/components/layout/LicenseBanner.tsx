import React from 'react';
import { Key, AlertCircle, LogIn, Clock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface LicenseBannerProps {
  onOpenActivationModal: (tab?: 'code' | 'request') => void;
}

export const LicenseBanner: React.FC<LicenseBannerProps> = ({ onOpenActivationModal }) => {
  const { user, canEdit, isExpired, login, activeRequest } = useAuth();

  if (canEdit) return null;

  return (
    <div
      className={`border-b px-4 py-2.5 sm:px-6 transition-colors ${
        isExpired ? 'bg-rose-50 border-rose-200 text-rose-950' : 'bg-amber-50 border-amber-200 text-amber-950'
      }`}
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 text-xs text-center sm:text-left">
          <div
            className={`p-1.5 rounded-lg shrink-0 ${
              isExpired ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
            }`}
          >
            {isExpired ? <AlertCircle className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
          </div>
          <div>
            {isExpired ? (
              <>
                <span className="font-bold text-rose-900">Bản dùng thử / kích hoạt đã hết hạn: </span>
                <span className="text-rose-800">
                  Tài khoản ({user?.email}) đã hết hạn vào ngày{' '}
                  {user?.accessExpiresAt ? new Date(user.accessExpiresAt).toLocaleDateString('vi-VN') : ''}. Vui lòng
                  nhập mã 6 ký tự mới để tiếp tục tạo và lưu ma trận.
                </span>
              </>
            ) : user ? (
              <>
                <span className="font-bold">Chế độ xem tổng quan: </span>
                <span>
                  Tài khoản ({user.email}) hiện ở chế độ khách. Để mở khóa toàn bộ tính năng biên tập và lưu đề, hãy
                  nhập mã kích hoạt 6 ký tự hoặc gửi yêu cầu duyệt.
                </span>
              </>
            ) : (
              <>
                <span className="font-bold">Chế độ xem tổng quan (Chỉ đọc): </span>
                <span>
                  Bạn đang xem cấu trúc và ma trận mẫu. Đăng nhập tài khoản Google để lưu trữ ma trận cá nhân hoặc kích
                  hoạt quyền biên tập.
                </span>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {user ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onOpenActivationModal('code')}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-xs transition-colors cursor-pointer"
              >
                <Key className="w-3.5 h-3.5 text-amber-300" />
                <span>Nhập mã kích hoạt (6 ký tự)</span>
              </button>

              {activeRequest?.status === 'pending' ? (
                <div className="flex items-center gap-1 px-2.5 py-1.5 bg-amber-200 text-amber-900 border border-amber-300 rounded-lg text-xs font-semibold">
                  <Clock className="w-3.5 h-3.5 text-amber-700 animate-pulse" />
                  <span>Đang chờ duyệt</span>
                </div>
              ) : (
                <button
                  onClick={() => onOpenActivationModal('request')}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-lg text-xs font-medium transition-colors cursor-pointer"
                >
                  <span>Xin cấp quyền thủ công</span>
                </button>
              )}
            </div>
          ) : (
            <button
              onClick={() => login()}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Đăng nhập Google</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

