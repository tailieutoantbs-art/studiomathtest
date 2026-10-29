import React, { useState } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  Mail,
  Lock,
  Phone,
  Key,
  School,
  User,
  CheckCircle2,
  Clock,
  Sparkles,
  AlertTriangle,
  FileSpreadsheet
} from 'lucide-react';
import { useAuth, AUTHOR_NAME, AUTHOR_PHONE, ADMIN_EMAIL, WEBSITE_NAME, DEFAULT_ADMIN_PASSWORD } from '../../context/AuthContext';

export const AuthGate: React.FC = () => {
  const {
    user,
    canEdit,
    loginWithGmail,
    loginWithAdmin,
    requestAccess,
    activeRequest,
    redeemCode,
    loading
  } = useAuth();

  const [activeTab, setActiveTab] = useState<'gmail' | 'admin' | 'code'>('gmail');

  // Gmail form state
  const [emailInput, setEmailInput] = useState(user?.email || '');
  const [gmailError, setGmailError] = useState<string | null>(null);
  const [gmailSuccess, setGmailSuccess] = useState<string | null>(null);
  const [unapprovedEmail, setUnapprovedEmail] = useState<string | null>(
    user && !user.isApproved ? user.email : null
  );

  // Admin form state
  const [adminPassword, setAdminPassword] = useState('');
  const [adminError, setAdminError] = useState<string | null>(null);

  // Request form state
  const [fullName, setFullName] = useState(user?.displayName || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [schoolName, setSchoolName] = useState(user?.schoolName || '');
  const [subject, setSubject] = useState(user?.subject || 'Toán');
  const [note, setNote] = useState('');
  const [requestSent, setRequestSent] = useState(false);
  const [requestSending, setRequestSending] = useState(false);

  // Code form state
  const [codeEmail, setCodeEmail] = useState(user?.email || '');
  const [codeVal, setCodeVal] = useState('');
  const [codeError, setCodeError] = useState<string | null>(null);
  const [codeSuccess, setCodeSuccess] = useState<string | null>(null);

  // If user is already approved and can edit, do not show gate
  if (canEdit) return null;

  const handleGmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGmailError(null);
    setGmailSuccess(null);
    try {
      const res = await loginWithGmail(emailInput);
      if (res.isApproved) {
        setGmailSuccess(res.message);
      } else {
        setUnapprovedEmail(emailInput.trim().toLowerCase());
        setGmailError(res.message);
      }
    } catch (err: any) {
      setGmailError(err.message || 'Có lỗi xảy ra khi xác thực Gmail.');
    }
  };

  const handleAdminSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdminError(null);
    try {
      await loginWithAdmin(adminPassword);
    } catch (err: any) {
      setAdminError(err.message || 'Mật khẩu quản trị viên không chính xác.');
    }
  };

  const handleSendRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    const targetEmail = unapprovedEmail || emailInput.trim().toLowerCase();
    if (!targetEmail) {
      alert('Vui lòng nhập địa chỉ Gmail!');
      return;
    }
    if (!fullName.trim() || !schoolName.trim()) {
      alert('Vui lòng điền Họ tên và Trường / Đơn vị công tác.');
      return;
    }
    setRequestSending(true);
    try {
      await requestAccess({
        email: targetEmail,
        displayName: fullName,
        phone,
        schoolName,
        subject,
        note
      });
      setRequestSent(true);
    } catch (err: any) {
      alert('Lỗi: ' + (err.message || 'Không thể gửi yêu cầu'));
    } finally {
      setRequestSending(false);
    }
  };

  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCodeError(null);
    setCodeSuccess(null);
    try {
      // First ensure user profile exists with this email
      if (!user || user.email.toLowerCase() !== codeEmail.trim().toLowerCase()) {
        await loginWithGmail(codeEmail);
      }
      const res = await redeemCode(codeVal);
      setCodeSuccess(res.message);
    } catch (err: any) {
      setCodeError(err.message || 'Kích hoạt mã thất bại.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 flex flex-col items-center justify-center p-4 sm:p-6 text-slate-100">
      {/* Brand & Header */}
      <div className="w-full max-w-xl text-center mb-6 space-y-2">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 shadow-xl shadow-blue-500/25 mb-1">
          <FileSpreadsheet className="w-9 h-9 text-white" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white uppercase drop-shadow-sm">
          {WEBSITE_NAME}
        </h1>
        <p className="text-xs sm:text-sm text-blue-200 font-medium">
          Hệ thống xây dựng Ma Trận & Bản Đặc Tả Đề Kiểm Tra Định Kì Toán THPT (GDPT 2018 - Cấu trúc 2025)
        </p>
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-800/80 border border-slate-700/80 text-xs text-slate-300">
          <span>Tác giả & Phụ trách chuyên môn:</span>
          <strong className="text-white font-semibold">{AUTHOR_NAME}</strong>
          <span>•</span>
          <a
            href={`tel:${AUTHOR_PHONE}`}
            className="text-amber-400 font-bold hover:underline flex items-center gap-1"
          >
            <Phone className="w-3 h-3" />
            {AUTHOR_PHONE}
          </a>
        </div>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-xl bg-white text-slate-900 rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden">
        {/* Top Notice */}
        <div className="bg-amber-500/10 border-b border-amber-200/60 px-6 py-3 flex items-center gap-3 text-amber-900 text-xs">
          <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0" />
          <div>
            <p className="font-bold">Hệ thống phân quyền truy cập nghiêm ngặt</p>
            <p className="text-[11px] text-amber-800">
              Chỉ các tài khoản Gmail đã được Quản trị viên (<strong className="font-semibold">{AUTHOR_NAME}</strong>) phê duyệt mới có thể vào sử dụng.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50 text-xs font-bold text-slate-600">
          <button
            type="button"
            onClick={() => {
              setActiveTab('gmail');
              setGmailError(null);
            }}
            className={`flex-1 py-3.5 px-3 flex items-center justify-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'gmail'
                ? 'border-blue-600 text-blue-700 bg-white shadow-xs'
                : 'border-transparent hover:text-slate-900 hover:bg-slate-100/60'
            }`}
          >
            <Mail className="w-4 h-4 text-blue-600" />
            <span>1. Giáo viên (Gmail)</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('admin');
              setAdminError(null);
            }}
            className={`flex-1 py-3.5 px-3 flex items-center justify-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'admin'
                ? 'border-purple-600 text-purple-700 bg-white shadow-xs'
                : 'border-transparent hover:text-slate-900 hover:bg-slate-100/60'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-purple-600" />
            <span>2. Quản trị viên (Admin)</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('code');
              setCodeError(null);
            }}
            className={`flex-1 py-3.5 px-3 flex items-center justify-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'code'
                ? 'border-amber-600 text-amber-700 bg-white shadow-xs'
                : 'border-transparent hover:text-slate-900 hover:bg-slate-100/60'
            }`}
          >
            <Key className="w-4 h-4 text-amber-600" />
            <span>3. Mã kích hoạt VIP</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* TAB 1: GMAIL LOGIN & ACCESS REQUEST */}
          {activeTab === 'gmail' && (
            <div className="space-y-5">
              {!unapprovedEmail ? (
                <form onSubmit={handleGmailSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Nhập địa chỉ Gmail của Thầy/Cô <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        value={emailInput}
                        onChange={e => setEmailInput(e.target.value)}
                        placeholder="VD: giaovien.toan@gmail.com"
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden transition"
                      />
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">
                      Hệ thống sẽ kiểm tra danh sách Gmail được cấp quyền của Thầy Hùng TBS.
                    </p>
                  </div>

                  {gmailError && (
                    <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <p className="font-semibold">{gmailError}</p>
                      </div>
                    </div>
                  )}

                  {gmailSuccess && (
                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{gmailSuccess}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading || !emailInput.trim()}
                    className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>{loading ? 'Đang kiểm tra quyền truy cập...' : 'Xác thực & Vào Studio'}</span>
                  </button>
                </form>
              ) : (
                /* Unapproved Gmail View -> Show Access Request Form */
                <div className="space-y-4">
                  <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-900 space-y-1">
                    <div className="flex items-center gap-2 font-bold text-amber-950">
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                      <span>Gmail chưa có trong danh sách được cấp quyền:</span>
                    </div>
                    <p className="font-mono font-semibold text-slate-800 text-sm bg-white/80 px-2 py-1 rounded border border-amber-200">
                      {unapprovedEmail}
                    </p>
                    <p className="text-[11px] text-amber-800 pt-1">
                      Để vào sử dụng, Thầy/Cô vui lòng gửi thông tin bên dưới để <strong>{AUTHOR_NAME}</strong> phê duyệt, hoặc liên hệ trực tiếp qua số Hotline/Zalo: <strong>{AUTHOR_PHONE}</strong>.
                    </p>
                  </div>

                  {requestSent || (activeRequest && activeRequest.status === 'pending') ? (
                    <div className="text-center py-6 px-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                      <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
                        <Clock className="w-6 h-6 animate-pulse" />
                      </div>
                      <h3 className="font-bold text-slate-800 text-sm">
                        Đã gửi yêu cầu cấp quyền thành công!
                      </h3>
                      <p className="text-xs text-slate-600 max-w-sm mx-auto">
                        Yêu cầu của bạn đang chờ <strong className="text-slate-800">{AUTHOR_NAME}</strong> phê duyệt. Khi được duyệt, bạn chỉ cần nhập lại Gmail này là có thể vào ngay.
                      </p>
                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={() => {
                            setUnapprovedEmail(null);
                            setRequestSent(false);
                          }}
                          className="text-xs font-semibold text-blue-600 hover:underline"
                        >
                          ← Thử tài khoản Gmail khác
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSendRequest} className="space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Họ và tên Thầy/Cô <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                              type="text"
                              required
                              value={fullName}
                              onChange={e => setFullName(e.target.value)}
                              placeholder="VD: Thầy Nguyễn Văn A"
                              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Số điện thoại / Zalo <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                              type="tel"
                              required
                              value={phone}
                              onChange={e => setPhone(e.target.value)}
                              placeholder="VD: 0912345678"
                              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Trường / Đơn vị công tác <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <School className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                              type="text"
                              required
                              value={schoolName}
                              onChange={e => setSchoolName(e.target.value)}
                              placeholder="VD: THPT Chuyên Lê Hồng Phong"
                              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Bộ môn giảng dạy
                          </label>
                          <select
                            value={subject}
                            onChange={e => setSubject(e.target.value)}
                            className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl"
                          >
                            <option value="Toán">Toán THPT</option>
                            <option value="Vật lí">Vật lí THPT</option>
                            <option value="Toán & Vật lí">Toán & Vật lí</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Lời nhắn gửi Thầy Hùng TBS (nếu có)
                        </label>
                        <input
                          type="text"
                          value={note}
                          onChange={e => setNote(e.target.value)}
                          placeholder="Xin cấp quyền làm ma trận thi định kì..."
                          className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl"
                        />
                      </div>

                      <div className="flex items-center gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setUnapprovedEmail(null)}
                          className="px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition"
                        >
                          Quay lại
                        </button>
                        <button
                          type="submit"
                          disabled={requestSending}
                          className="flex-1 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition disabled:opacity-50 flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <span>{requestSending ? 'Đang gửi...' : 'Gửi yêu cầu tới Thầy Hùng TBS'}</span>
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: ADMIN LOGIN */}
          {activeTab === 'admin' && (
            <form onSubmit={handleAdminSubmit} className="space-y-4">
              <div className="p-3 bg-purple-50 border border-purple-200 rounded-xl text-xs text-purple-900 leading-relaxed">
                <p className="font-bold flex items-center gap-1.5 text-purple-950">
                  <ShieldCheck className="w-4 h-4 text-purple-600" />
                  Đăng nhập dành cho Quản trị viên hệ thống
                </p>
                <p className="text-[11px] text-purple-800 mt-0.5">
                  Tài khoản Admin quản lý danh sách cấp quyền và duyệt các yêu cầu của giáo viên.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tài khoản Admin</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    disabled
                    value={ADMIN_EMAIL}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-100 border border-slate-300 rounded-xl text-xs font-mono font-bold text-slate-700"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-slate-700">
                    Mật khẩu quản trị <span className="text-red-500">*</span>
                  </label>
                  <span className="text-[11px] text-slate-400">
                    Mặc định: <code className="font-mono text-purple-700 font-bold">{DEFAULT_ADMIN_PASSWORD}</code>
                  </span>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={adminPassword}
                    onChange={e => setAdminPassword(e.target.value)}
                    placeholder="Nhập mật khẩu admin..."
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium focus:bg-white focus:ring-2 focus:ring-purple-500 focus:outline-hidden transition"
                  />
                </div>
              </div>

              {adminError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{adminError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !adminPassword.trim()}
                className="w-full py-2.5 px-4 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs shadow-md shadow-purple-600/20 transition disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>{loading ? 'Đang xác thực...' : 'Đăng nhập Quản Trị Viên (Admin)'}</span>
              </button>
            </form>
          )}

          {/* TAB 3: CODE REDEEM */}
          {activeTab === 'code' && (
            <form onSubmit={handleCodeSubmit} className="space-y-4">
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 leading-relaxed">
                <p className="font-bold flex items-center gap-1.5 text-amber-950">
                  <Key className="w-4 h-4 text-amber-600" />
                  Kích hoạt tức thì bằng Mã VIP
                </p>
                <p className="text-[11px] text-amber-800 mt-0.5">
                  Nếu Thầy Hùng TBS đã cấp cho Thầy/Cô mã kích hoạt, hãy nhập mã tại đây để vào thẳng Studio mà không cần chờ duyệt.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Địa chỉ Gmail của bạn <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={codeEmail}
                  onChange={e => setCodeEmail(e.target.value)}
                  placeholder="giaovien@gmail.com"
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Mã kích hoạt VIP (Ví dụ: TBS2026, MATH01...) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={codeVal}
                  onChange={e => setCodeVal(e.target.value.toUpperCase())}
                  placeholder="TBS2026"
                  className="w-full px-3.5 py-2.5 text-center font-mono font-black text-lg tracking-widest uppercase bg-slate-50 border-2 border-slate-300 rounded-xl focus:border-amber-500 focus:bg-white"
                />
              </div>

              {codeError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{codeError}</span>
                </div>
              )}

              {codeSuccess && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{codeSuccess}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !codeEmail.trim() || !codeVal.trim()}
                className="w-full py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md transition disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>{loading ? 'Đang kích hoạt...' : 'Kích hoạt quyền & Vào Studio'}</span>
              </button>
            </form>
          )}
        </div>

        {/* Footer Support Info */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-600 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-slate-700">Liên hệ hỗ trợ / Zalo:</span>
            <a
              href={`tel:${AUTHOR_PHONE}`}
              className="text-blue-700 font-bold hover:underline"
            >
              {AUTHOR_PHONE}
            </a>
            <span className="text-slate-400">({AUTHOR_NAME})</span>
          </div>
          <div className="text-[11px] text-slate-500 font-mono">
            {ADMIN_EMAIL}
          </div>
        </div>
      </div>
    </div>
  );
};
