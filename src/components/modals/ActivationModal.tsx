import React, { useState } from 'react';
import {
  Key,
  ShieldCheck,
  CheckCircle,
  Clock,
  Send,
  AlertCircle,
  X,
  School,
  BookOpen
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface ActivationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'code' | 'request';
}

export const ActivationModal: React.FC<ActivationModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'code'
}) => {
  const { user, canEdit, isExpired, daysRemaining, activeRequest, requestAccess, redeemCode } = useAuth();

  const [activeTab, setActiveTab] = useState<'code' | 'request'>(initialTab);
  const [activationCode, setActivationCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Request form state
  const [schoolName, setSchoolName] = useState('');
  const [subject, setSubject] = useState('Vật lí');
  const [note, setNote] = useState('');
  const [requestSending, setRequestSending] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const [forceInputAnotherCode, setForceInputAnotherCode] = useState(false);

  if (!isOpen) return null;

  const handleCodeChange = (val: string) => {
    const formatted = val.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 6);
    setActivationCode(formatted);
    setErrorMessage(null);
  };

  const handleRedeem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (activationCode.length !== 6) {
      setErrorMessage('Vui lòng nhập đúng 6 ký tự mã kích hoạt.');
      return;
    }
    setLoading(true);
    setErrorMessage(null);
    try {
      const res = await redeemCode(activationCode);
      setSuccessMessage(res.message);
      setActivationCode('');
    } catch (err: any) {
      setErrorMessage(err.message || 'Kích hoạt thất bại.');
    } finally {
      setLoading(false);
    }
  };

  const handleSendRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!schoolName.trim()) {
      alert('Vui lòng nhập tên trường / đơn vị công tác.');
      return;
    }
    setRequestSending(true);
    try {
      await requestAccess({
        email: user?.email || '',
        displayName: user?.displayName || user?.email?.split('@')[0] || 'Giáo viên',
        phone: user?.phone,
        schoolName: schoolName.trim(),
        subject,
        note: note.trim()
      });
      setRequestSent(true);
    } catch (err: any) {
      alert('Không thể gửi yêu cầu: ' + (err.message || 'Lỗi'));
    } finally {
      setRequestSending(false);
    }
  };

  const isCurrentActive = canEdit && !isExpired;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 text-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-xl">
              <ShieldCheck className="w-5 h-5 text-blue-200" />
            </div>
            <div>
              <h2 className="text-base font-bold">Cấp quyền biên tập & Lưu trữ Ma trận</h2>
              <p className="text-xs text-blue-200">
                Kích hoạt tức thì bằng mã 6 ký tự hoặc gửi yêu cầu duyệt thủ công
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab buttons */}
        {(!isCurrentActive || forceInputAnotherCode) && (
          <div className="flex border-b border-slate-200 bg-slate-50 shrink-0">
            <button
              onClick={() => {
                setActiveTab('code');
                setErrorMessage(null);
              }}
              className={`flex-1 py-3 px-4 text-xs font-semibold flex items-center justify-center gap-2 border-b-2 transition-all cursor-pointer ${
                activeTab === 'code'
                  ? 'border-blue-600 text-blue-700 bg-white shadow-xs'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100/50'
              }`}
            >
              <Key className="w-4 h-4 text-amber-500" />
              <span>Cách 1: Nhập mã kích hoạt (6 ký tự)</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] bg-amber-100 text-amber-800 font-bold">
                Nhanh
              </span>
            </button>

            <button
              onClick={() => {
                setActiveTab('request');
                setErrorMessage(null);
              }}
              className={`flex-1 py-3 px-4 text-xs font-semibold flex items-center justify-center gap-2 border-b-2 transition-all cursor-pointer ${
                activeTab === 'request'
                  ? 'border-blue-600 text-blue-700 bg-white shadow-xs'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100/50'
              }`}
            >
              <Send className="w-4 h-4 text-blue-500" />
              <span>Cách 2: Quản trị duyệt thủ công</span>
            </button>
          </div>
        )}

        <div className="p-6 overflow-y-auto">
          {/* Active status */}
          {isCurrentActive && !forceInputAnotherCode && (
            <div className="text-center py-4">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3 border border-emerald-200 shadow-xs">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Tài khoản đang có quyền biên tập!</h3>
              <p className="text-xs text-slate-600 mt-1.5 max-w-sm mx-auto">
                Tài khoản <span className="font-semibold text-slate-800 font-mono">({user?.email})</span> đã được cấp
                quyền tạo, sửa và lưu trữ ma trận đề thi.
              </p>

              <div className="mt-4 p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-left text-xs space-y-2 max-w-sm mx-auto">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Trạng thái:</span>
                  <span className="font-semibold text-emerald-600 flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" />
                    Đang hoạt động
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Thời hạn sử dụng:</span>
                  <span className="font-semibold text-slate-800">
                    {user?.accessExpiresAt ? (
                      <span className="flex items-center gap-1 text-blue-700">
                        <Clock className="w-3.5 h-3.5" />
                        Còn {daysRemaining ?? 0} ngày ({new Date(user.accessExpiresAt).toLocaleDateString('vi-VN')})
                      </span>
                    ) : (
                      'Vô thời hạn (Vĩnh viễn)'
                    )}
                  </span>
                </div>
                {user?.activatedWithCode && (
                  <div className="flex items-center justify-between pt-1 border-t border-slate-200">
                    <span className="text-slate-500">Mã đã dùng:</span>
                    <span className="font-mono font-bold text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                      {user.activatedWithCode}
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-6 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setForceInputAnotherCode(true)}
                  className="px-4 py-2 text-xs font-semibold text-blue-600 hover:text-blue-700 hover:bg-blue-50 border border-blue-200 rounded-lg transition-colors cursor-pointer"
                >
                  Nhập mã gia hạn khác
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                >
                  Tiếp tục sử dụng
                </button>
              </div>
            </div>
          )}

          {/* Expired warning */}
          {isExpired && !successMessage && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2.5 text-xs text-red-800">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Thời hạn dùng thử / kích hoạt của bạn đã kết thúc.</p>
                <p className="text-red-700 mt-0.5">
                  Hạn đã hết vào ngày{' '}
                  {user?.accessExpiresAt ? new Date(user.accessExpiresAt).toLocaleDateString('vi-VN') : ''}. Vui lòng
                  nhập mã kích hoạt 6 ký tự mới bên dưới để tiếp tục sử dụng.
                </p>
              </div>
            </div>
          )}

          {/* Success Flash */}
          {successMessage && (
            <div className="text-center py-4">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3 border border-emerald-200 shadow-xs">
                <CheckCircle className="w-8 h-8 text-emerald-500 animate-bounce" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Kích hoạt tài khoản thành công!</h3>
              <p className="text-xs text-slate-600 mt-2 max-w-sm mx-auto leading-relaxed">{successMessage}</p>
              <button
                type="button"
                onClick={onClose}
                className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer"
              >
                <span>Bắt đầu làm việc ngay</span>
              </button>
            </div>
          )}

          {/* Tab 1: Enter Code */}
          {(!isCurrentActive || forceInputAnotherCode) && activeTab === 'code' && !successMessage && (
            <form onSubmit={handleRedeem} className="space-y-4">
              <div className="p-3 bg-amber-50/80 border border-amber-200/80 rounded-xl text-xs text-amber-900 leading-relaxed">
                <div className="flex items-center gap-1.5 font-semibold text-amber-950 mb-1">
                  <Key className="w-3.5 h-3.5 text-amber-600" />
                  Mã kích hoạt gồm 6-7 ký tự (Ví dụ: TBS2026, MATH01, TEST01...)
                </div>
                <p className="text-slate-600 text-[11px]">
                  Mã kích hoạt do Quản trị viên (
                  <span className="font-semibold text-slate-800">Thầy Hùng TBS - 0907117193</span>) cung cấp
                  dành cho giáo viên trải nghiệm hoặc bản quyền chính thức.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Nhập mã kích hoạt (6 ký tự) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    maxLength={6}
                    value={activationCode}
                    onChange={e => handleCodeChange(e.target.value)}
                    placeholder="VD: TEST01"
                    autoFocus
                    className="w-full px-4 py-3 text-center font-mono text-2xl font-black tracking-[0.35em] uppercase bg-slate-50 border-2 border-slate-300 rounded-xl focus:border-blue-600 focus:bg-white focus:outline-hidden transition-all shadow-inner"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono font-semibold text-slate-400">
                    {activationCode.length}/6
                  </div>
                </div>

                <div className="flex justify-center gap-1.5 mt-2">
                  {[0, 1, 2, 3, 4, 5].map(i => {
                    const char = activationCode[i] || '';
                    return (
                      <div
                        key={i}
                        className={`w-7 h-8 flex items-center justify-center text-xs font-mono font-bold rounded border ${
                          char
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-slate-200 bg-slate-50 text-slate-300'
                        }`}
                      >
                        {char || '•'}
                      </div>
                    );
                  })}
                </div>
              </div>

              {errorMessage && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="pt-2 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                >
                  Đóng
                </button>
                <button
                  type="submit"
                  disabled={activationCode.length !== 6 || loading}
                  className="flex-1 flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  <Key className="w-4 h-4" />
                  <span>{loading ? 'Đang kiểm tra & kích hoạt...' : 'Kích hoạt tài khoản ngay'}</span>
                </button>
              </div>
            </form>
          )}

          {/* Tab 2: Manual Request Approval */}
          {(!isCurrentActive || forceInputAnotherCode) && activeTab === 'request' && !successMessage && (
            activeRequest?.status === 'pending' || requestSent ? (
              <div className="text-center py-6">
                <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-3 border border-amber-200">
                  <Clock className="w-6 h-6 animate-pulse" />
                </div>
                <h3 className="text-base font-semibold text-slate-800">Đã gửi yêu cầu cấp quyền!</h3>
                <p className="text-xs text-slate-500 mt-2 max-w-sm mx-auto leading-relaxed">
                  Yêu cầu của bạn đang được quản trị viên (
                  <span className="font-semibold text-slate-700">tailieutoantbs@gmail.com</span>) xem xét duyệt.
                  Sau khi Thầy Hùng TBS phê duyệt, quyền hạn sẽ tự động kích hoạt ngay trên tài khoản của bạn.
                </p>

                <div className="mt-4 p-3 bg-slate-50 rounded-lg text-left text-xs text-slate-600 border border-slate-200 space-y-1">
                  <p>
                    <span className="text-slate-400">Tài khoản:</span> {user?.email}
                  </p>
                  <p>
                    <span className="text-slate-400">Trạng thái:</span>{' '}
                    <span className="font-semibold text-amber-600">Đang chờ phê duyệt</span>
                  </p>
                </div>

                <button
                  onClick={onClose}
                  className="mt-6 px-5 py-2 bg-slate-800 text-white rounded-lg text-sm font-medium hover:bg-slate-900 shadow-xs cursor-pointer"
                >
                  Đóng
                </button>
              </div>
            ) : (
              <form onSubmit={handleSendRequest} className="space-y-3.5">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 leading-relaxed">
                  Cung cấp thông tin giảng dạy của bạn để Thầy Hùng TBS xét duyệt cấp quyền thao tác trên hệ thống.
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email đăng nhập Google</label>
                  <input
                    type="text"
                    disabled
                    value={user?.email || ''}
                    className="w-full px-3 py-2 text-xs bg-slate-100 border border-slate-300 rounded-lg text-slate-600 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Trường / Đơn vị công tác <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <School className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="VD: THPT Chuyên Hà Nội - Amsterdam"
                      value={schoolName}
                      onChange={e => setSchoolName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Môn giảng dạy</label>
                  <div className="relative">
                    <BookOpen className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <select
                      value={subject}
                      onChange={e => setSubject(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden bg-white"
                    >
                      <option value="Vật lí">Vật lí</option>
                      <option value="Toán">Toán</option>
                      <option value="Toán & Vật lí">Toán & Vật lí</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Ghi chú bổ sung (tuỳ chọn)</label>
                  <textarea
                    rows={2}
                    placeholder="VD: Giáo viên tổ Vật lí trường THPT..."
                    value={note}
                    onChange={e => setNote(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden resize-none"
                  />
                </div>

                <div className="pt-2 border-t border-slate-200 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    disabled={requestSending}
                    className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-medium shadow-xs transition-colors disabled:opacity-50 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{requestSending ? 'Đang gửi...' : 'Gửi yêu cầu xét duyệt'}</span>
                  </button>
                </div>
              </form>
            )
          )}
        </div>
      </div>
    </div>
  );
};

