import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  Key,
  Users,
  CheckCircle,
  XCircle,
  Clock,
  Plus,
  Trash2,
  Copy,
  Search,
  Lock,
  Phone,
  School,
  Mail,
  Calendar,
  AlertTriangle,
  RotateCw
} from 'lucide-react';
import {
  useAuth,
  ADMIN_EMAIL,
  AUTHOR_NAME,
  AUTHOR_PHONE,
  WEBSITE_NAME,
  DEFAULT_ADMIN_PASSWORD
} from '../../context/AuthContext';
import { AccessRequest, ApprovedGmail } from '../../types/auth';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose }) => {
  const {
    approvedEmails,
    accessRequests,
    activationCodes,
    approveRequest,
    rejectRequest,
    addApprovedGmail,
    removeApprovedGmail,
    toggleApprovedGmail,
    renewApprovedGmail,
    changeAdminPassword
  } = useAuth();

  const [activeTab, setActiveTab] = useState<'requests' | 'whitelist' | 'codes' | 'settings'>('requests');
  const [searchTerm, setSearchTerm] = useState('');

  // Add Direct Gmail Form
  const [newGmail, setNewGmail] = useState('');
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newSchool, setNewSchool] = useState('');
  const [newSubject, setNewSubject] = useState('Toán');
  const [newDuration, setNewDuration] = useState<number | null>(365);
  const [newNote, setNewNote] = useState('');

  // New Code Form
  const [newCode, setNewCode] = useState('');
  const [codeDuration, setCodeDuration] = useState(365);
  const [codeMaxUses, setCodeMaxUses] = useState(50);
  const [codeNote, setCodeNote] = useState('');
  const [copySuccess, setCopySuccess] = useState<string | null>(null);

  // Change Password Form
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [passMsg, setPassMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  if (!isOpen) return null;

  // Handlers
  const handleApprove = async (req: AccessRequest, days: number | null) => {
    try {
      await approveRequest(req.id, days);
      alert(`Đã phê duyệt thành công cho Thầy/Cô ${req.displayName} (${req.email})!`);
    } catch (err: any) {
      alert('Lỗi phê duyệt: ' + err.message);
    }
  };

  const handleReject = async (reqId: string) => {
    if (confirm('Bạn có chắc muốn từ chối yêu cầu này?')) {
      await rejectRequest(reqId);
    }
  };

  const handleAddDirectGmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGmail.trim() || !newGmail.includes('@')) {
      alert('Vui lòng nhập đúng định dạng Gmail!');
      return;
    }
    try {
      await addApprovedGmail({
        email: newGmail.trim(),
        displayName: newName.trim() || newGmail.split('@')[0],
        phone: newPhone.trim(),
        schoolName: newSchool.trim(),
        subject: newSubject,
        durationDays: newDuration,
        note: newNote.trim()
      });
      alert(`Đã cấp quyền thành công cho Gmail: ${newGmail.trim()}!`);
      setNewGmail('');
      setNewName('');
      setNewPhone('');
      setNewSchool('');
      setNewNote('');
    } catch (err: any) {
      alert('Lỗi: ' + err.message);
    }
  };

  const handleRemoveGmail = async (email: string) => {
    if (confirm(`Bạn có chắc chắn muốn thu hồi quyền và xóa Gmail: ${email}?`)) {
      try {
        await removeApprovedGmail(email);
      } catch (err: any) {
        alert(err.message);
      }
    }
  };

  const handleToggleActive = async (email: string, currentActive: boolean) => {
    try {
      await toggleApprovedGmail(email, !currentActive);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleRenew = async (email: string, days: number | null) => {
    try {
      await renewApprovedGmail(email, days);
      alert(`Đã gia hạn thành công cho ${email}!`);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopySuccess(text);
    setTimeout(() => setCopySuccess(null), 2000);
  };

  const handleChangePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPassMsg(null);
    if (newPass !== confirmPass) {
      setPassMsg({ type: 'error', text: 'Mật khẩu xác nhận không khớp!' });
      return;
    }
    try {
      await changeAdminPassword(oldPass, newPass);
      setPassMsg({ type: 'success', text: 'Đã đổi mật khẩu Admin thành công!' });
      setOldPass('');
      setNewPass('');
      setConfirmPass('');
    } catch (err: any) {
      setPassMsg({ type: 'error', text: err.message || 'Lỗi đổi mật khẩu' });
    }
  };

  const pendingRequests = accessRequests.filter(r => r.status === 'pending');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900 text-white shrink-0">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-gradient-to-tr from-purple-600 to-indigo-600 rounded-xl text-white shadow-md">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">
                  Bảng Quản Trị Hệ Thống - {AUTHOR_NAME}
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] bg-purple-900/80 text-purple-200 border border-purple-700 font-mono font-bold">
                  {ADMIN_EMAIL}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Phê duyệt yêu cầu cấp quyền, quản lý danh sách Gmail và phân quyền truy cập {WEBSITE_NAME}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-4 sm:px-6 gap-2 text-xs font-bold overflow-x-auto shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('requests')}
            className={`py-3 px-3.5 flex items-center space-x-2 border-b-2 transition whitespace-nowrap cursor-pointer ${
              activeTab === 'requests'
                ? 'border-blue-600 text-blue-700 bg-white shadow-xs'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Clock className="w-4 h-4 text-amber-500" />
            <span>Yêu cầu chờ duyệt</span>
            {pendingRequests.length > 0 && (
              <span className="px-1.5 py-0.5 text-[10px] rounded-full bg-red-600 text-white animate-pulse">
                {pendingRequests.length}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('whitelist')}
            className={`py-3 px-3.5 flex items-center space-x-2 border-b-2 transition whitespace-nowrap cursor-pointer ${
              activeTab === 'whitelist'
                ? 'border-blue-600 text-blue-700 bg-white shadow-xs'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Users className="w-4 h-4 text-blue-500" />
            <span>Danh sách Gmail đã cấp quyền ({approvedEmails.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('codes')}
            className={`py-3 px-3.5 flex items-center space-x-2 border-b-2 transition whitespace-nowrap cursor-pointer ${
              activeTab === 'codes'
                ? 'border-blue-600 text-blue-700 bg-white shadow-xs'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Key className="w-4 h-4 text-purple-500" />
            <span>Mã kích hoạt VIP ({activationCodes.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('settings')}
            className={`py-3 px-3.5 flex items-center space-x-2 border-b-2 transition whitespace-nowrap cursor-pointer ${
              activeTab === 'settings'
                ? 'border-blue-600 text-blue-700 bg-white shadow-xs'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Lock className="w-4 h-4 text-slate-600" />
            <span>Tài khoản & Mật khẩu Admin</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 bg-slate-50/50">
          {/* TAB 1: ACCESS REQUESTS */}
          {activeTab === 'requests' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-bold text-slate-800">
                  Danh sách yêu cầu cấp quyền từ giáo viên ({accessRequests.length})
                </h4>
                <span className="text-xs text-slate-500">
                  Có <strong className="text-red-600 font-bold">{pendingRequests.length}</strong> yêu cầu chưa duyệt
                </span>
              </div>

              {accessRequests.length === 0 ? (
                <div className="text-center py-12 text-slate-400 bg-white rounded-2xl border border-dashed border-slate-300">
                  <Clock className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                  <p className="text-sm font-medium">Hiện không có yêu cầu cấp quyền nào.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {accessRequests.map(req => (
                    <div
                      key={req.id}
                      className={`p-4 rounded-2xl border transition bg-white shadow-xs ${
                        req.status === 'pending'
                          ? 'border-amber-300 ring-2 ring-amber-100'
                          : req.status === 'approved'
                          ? 'border-emerald-200'
                          : 'border-slate-200 opacity-60'
                      }`}
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                        <div className="space-y-1.5 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-bold text-slate-900 text-sm">{req.displayName}</span>
                            <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                              {req.email}
                            </span>
                            {req.phone && (
                              <a
                                href={`tel:${req.phone}`}
                                className="text-xs text-blue-600 font-semibold flex items-center gap-1 hover:underline"
                              >
                                <Phone className="w-3 h-3" />
                                {req.phone}
                              </a>
                            )}
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                req.status === 'pending'
                                  ? 'bg-amber-100 text-amber-800 border border-amber-300'
                                  : req.status === 'approved'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-rose-100 text-rose-800'
                              }`}
                            >
                              {req.status === 'pending'
                                ? 'Đang chờ duyệt'
                                : req.status === 'approved'
                                ? 'Đã duyệt'
                                : 'Đã từ chối'}
                            </span>
                          </div>

                          <div className="text-xs text-slate-600 flex items-center gap-3 flex-wrap">
                            <span className="flex items-center gap-1">
                              <School className="w-3.5 h-3.5 text-slate-400" />
                              <strong>Trường:</strong> {req.schoolName}
                            </span>
                            <span>
                              <strong>Bộ môn:</strong> {req.subject}
                            </span>
                            <span className="text-slate-400 text-[11px]">
                              Gửi lúc: {new Date(req.createdAt).toLocaleString('vi-VN')}
                            </span>
                          </div>

                          {req.note && (
                            <p className="text-xs text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-200 italic">
                              "{req.note}"
                            </p>
                          )}
                        </div>

                        {/* Action buttons */}
                        <div className="flex items-center gap-1.5 shrink-0">
                          {req.status === 'pending' ? (
                            <>
                              <button
                                type="button"
                                onClick={() => handleApprove(req, 30)}
                                className="px-2.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold border border-emerald-300 transition cursor-pointer"
                              >
                                Duyệt 30 ngày
                              </button>
                              <button
                                type="button"
                                onClick={() => handleApprove(req, 365)}
                                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition cursor-pointer"
                              >
                                Duyệt 1 năm
                              </button>
                              <button
                                type="button"
                                onClick={() => handleApprove(req, null)}
                                className="px-2.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition cursor-pointer"
                              >
                                Vĩnh viễn
                              </button>
                              <button
                                type="button"
                                onClick={() => handleReject(req.id)}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                                title="Từ chối"
                              >
                                <XCircle className="w-5 h-5" />
                              </button>
                            </>
                          ) : (
                            <div className="flex items-center gap-2">
                              {req.status === 'approved' && (
                                <button
                                  type="button"
                                  onClick={() => handleApprove(req, 365)}
                                  className="text-xs text-blue-600 hover:underline font-semibold"
                                >
                                  Gia hạn thêm 1 năm
                                </button>
                              )}
                              <span className="text-xs text-slate-400">
                                {req.status === 'approved' ? '✓ Đã cấp quyền' : '✗ Đã hủy'}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: WHITELIST MANAGEMENT */}
          {activeTab === 'whitelist' && (
            <div className="space-y-6">
              {/* Form Add Direct Gmail */}
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <Plus className="w-4 h-4 text-blue-600" />
                  Cấp quyền truy cập trực tiếp cho Gmail mới
                </h4>
                <form onSubmit={handleAddDirectGmail} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Địa chỉ Gmail <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="giaovien@gmail.com"
                        value={newGmail}
                        onChange={e => setNewGmail(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-xl bg-slate-50 focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Họ và tên Thầy/Cô
                      </label>
                      <input
                        type="text"
                        placeholder="Thầy Nguyễn Văn B"
                        value={newName}
                        onChange={e => setNewName(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-xl bg-slate-50 focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Số điện thoại / Zalo
                      </label>
                      <input
                        type="tel"
                        placeholder="0912345678"
                        value={newPhone}
                        onChange={e => setNewPhone(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-xl bg-slate-50 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Trường / Đơn vị công tác
                      </label>
                      <input
                        type="text"
                        placeholder="THPT Chuyên..."
                        value={newSchool}
                        onChange={e => setNewSchool(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-xl bg-slate-50 focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Thời hạn cấp quyền
                      </label>
                      <select
                        value={newDuration === null ? 'null' : newDuration}
                        onChange={e =>
                          setNewDuration(e.target.value === 'null' ? null : Number(e.target.value))
                        }
                        className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-xl bg-slate-50 focus:bg-white"
                      >
                        <option value="30">30 ngày (1 tháng)</option>
                        <option value="90">90 ngày (3 tháng)</option>
                        <option value="180">180 ngày (Học kì)</option>
                        <option value="365">365 ngày (1 năm)</option>
                        <option value="null">Vĩnh viễn (Không giới hạn)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Ghi chú
                      </label>
                      <input
                        type="text"
                        placeholder="Tổ Toán..."
                        value={newNote}
                        onChange={e => setNewNote(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-xl bg-slate-50 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-1">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Thêm vào danh sách cấp quyền</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Whitelist Table */}
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <h4 className="text-sm font-bold text-slate-800">
                    Danh sách Gmail được phép truy cập ({approvedEmails.length})
                  </h4>
                  <div className="relative w-full sm:w-64">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="Tìm theo Gmail, tên, trường..."
                      value={searchTerm}
                      onChange={e => setSearchTerm(e.target.value)}
                      className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white"
                    />
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                        <tr>
                          <th className="p-3">Họ và tên / Gmail</th>
                          <th className="p-3">Trường / Bộ môn / SĐT</th>
                          <th className="p-3">Trạng thái</th>
                          <th className="p-3">Hạn sử dụng</th>
                          <th className="p-3 text-right">Thao tác</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {approvedEmails
                          .filter(
                            u =>
                              u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              (u.displayName && u.displayName.toLowerCase().includes(searchTerm.toLowerCase())) ||
                              (u.schoolName && u.schoolName.toLowerCase().includes(searchTerm.toLowerCase()))
                          )
                          .map(u => {
                            const isAdm = u.email.toLowerCase() === ADMIN_EMAIL.toLowerCase();
                            const isExp =
                              u.accessExpiresAt && new Date(u.accessExpiresAt).getTime() < Date.now();
                            return (
                              <tr key={u.email} className="hover:bg-slate-50 transition">
                                <td className="p-3">
                                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                                    <span>{u.displayName || u.email.split('@')[0]}</span>
                                    {isAdm && (
                                      <span className="px-1.5 py-0.2 rounded text-[10px] bg-purple-100 text-purple-800 font-bold">
                                        ADMIN
                                      </span>
                                    )}
                                  </div>
                                  <div className="text-slate-500 text-[11px] font-mono">{u.email}</div>
                                </td>
                                <td className="p-3">
                                  <div>{u.schoolName || 'Chưa cập nhật'}</div>
                                  <div className="text-slate-500 text-[11px] flex items-center gap-2">
                                    <span>{u.subject || 'Toán'}</span>
                                    {u.phone && <span>• SĐT: {u.phone}</span>}
                                  </div>
                                </td>
                                <td className="p-3">
                                  <button
                                    type="button"
                                    disabled={isAdm}
                                    onClick={() => handleToggleActive(u.email, u.isActive)}
                                    className={`px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer transition ${
                                      u.isActive
                                        ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                        : 'bg-rose-100 text-rose-800 hover:bg-rose-200'
                                    }`}
                                  >
                                    {u.isActive ? 'Đang bật' : 'Tạm khóa'}
                                  </button>
                                </td>
                                <td className="p-3">
                                  {isAdm || !u.accessExpiresAt ? (
                                    <span className="font-bold text-emerald-600">Vĩnh viễn</span>
                                  ) : isExp ? (
                                    <span className="font-bold text-rose-600">
                                      Đã hết hạn ({new Date(u.accessExpiresAt).toLocaleDateString('vi-VN')})
                                    </span>
                                  ) : (
                                    <div>
                                      <span className="font-bold text-blue-700">
                                        Đến {new Date(u.accessExpiresAt).toLocaleDateString('vi-VN')}
                                      </span>
                                      <div className="text-[10px] text-slate-400">
                                        Còn{' '}
                                        {Math.ceil(
                                          (new Date(u.accessExpiresAt).getTime() - Date.now()) /
                                            (1000 * 60 * 60 * 24)
                                        )}{' '}
                                        ngày
                                      </div>
                                    </div>
                                  )}
                                </td>
                                <td className="p-3 text-right">
                                  {!isAdm && (
                                    <div className="flex items-center justify-end gap-1">
                                      <button
                                        type="button"
                                        onClick={() => handleRenew(u.email, 365)}
                                        className="px-2 py-1 rounded bg-blue-50 text-blue-700 hover:bg-blue-100 font-semibold text-[11px]"
                                        title="Gia hạn 1 năm"
                                      >
                                        +1 năm
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => handleRemoveGmail(u.email)}
                                        className="p-1 text-slate-400 hover:text-red-600"
                                        title="Xóa quyền truy cập"
                                      >
                                        <Trash2 className="w-3.5 h-3.5" />
                                      </button>
                                    </div>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ACTIVATION CODES */}
          {activeTab === 'codes' && (
            <div className="space-y-6">
              {/* Form create code */}
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <Key className="w-4 h-4 text-purple-600" />
                  Tạo mã kích hoạt VIP mới
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Mã code (6 - 7 ký tự)
                    </label>
                    <input
                      type="text"
                      placeholder="VD: TBS2026"
                      value={newCode}
                      onChange={e => setNewCode(e.target.value.toUpperCase())}
                      className="w-full px-3 py-1.5 text-xs font-mono font-bold uppercase border border-slate-300 rounded-xl bg-slate-50"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Thời hạn sử dụng
                    </label>
                    <select
                      value={codeDuration}
                      onChange={e => setCodeDuration(Number(e.target.value))}
                      className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-xl bg-slate-50"
                    >
                      <option value="7">7 ngày (Dùng thử)</option>
                      <option value="30">30 ngày (1 tháng)</option>
                      <option value="180">180 ngày (Học kì)</option>
                      <option value="365">365 ngày (1 năm)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Lượt dùng tối đa
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={1000}
                      value={codeMaxUses}
                      onChange={e => setCodeMaxUses(Number(e.target.value))}
                      className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-xl bg-slate-50"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Ghi chú mã
                    </label>
                    <input
                      type="text"
                      placeholder="Mã tặng..."
                      value={codeNote}
                      onChange={e => setCodeNote(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-xl bg-slate-50"
                    />
                  </div>
                </div>
              </div>

              {/* Codes list */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Danh sách mã kích hoạt hiện hành ({activationCodes.length})
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {activationCodes.map(c => (
                    <div
                      key={c.id}
                      className="p-4 rounded-2xl border bg-white border-slate-200 shadow-xs space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 font-mono font-bold text-sm tracking-widest border border-blue-200">
                            {c.code}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleCopy(c.code)}
                            className="p-1 rounded text-slate-400 hover:text-blue-600 cursor-pointer"
                            title="Sao chép mã"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                          {copySuccess === c.code && (
                            <span className="text-[10px] text-emerald-600 font-bold">Đã chép!</span>
                          )}
                        </div>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            c.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                          }`}
                        >
                          {c.isActive ? 'Đang bật' : 'Đã khóa'}
                        </span>
                      </div>
                      <div className="text-xs text-slate-600 space-y-0.5">
                        <p className="font-semibold text-slate-800">{c.note || 'Mã kích hoạt VIP'}</p>
                        <p>
                          Thời hạn: <strong className="text-blue-600">{c.durationDays} ngày</strong> • Lượt:{' '}
                          <strong>{c.usedCount}</strong>/{c.maxUses}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: ADMIN SETTINGS & PASSWORD */}
          {activeTab === 'settings' && (
            <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <div className="p-2.5 bg-purple-100 text-purple-700 rounded-xl">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">
                    Bảo Mật & Đổi Mật Khẩu Quản Trị Viên (Admin)
                  </h4>
                  <p className="text-xs text-slate-500 font-mono">Tài khoản: {ADMIN_EMAIL}</p>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
                <p>
                  <strong>Mật khẩu mặc định: </strong>
                  <code className="font-mono text-purple-700 font-bold bg-white px-2 py-0.5 rounded border border-purple-200">
                    {DEFAULT_ADMIN_PASSWORD}
                  </code>
                </p>
                <p className="text-[11px] text-slate-400">
                  Thầy Hùng TBS có thể đổi sang mật khẩu riêng để bảo mật bảng quản trị.
                </p>
              </div>

              <form onSubmit={handleChangePasswordSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Mật khẩu hiện tại <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    required
                    value={oldPass}
                    onChange={e => setOldPass(e.target.value)}
                    placeholder="Nhập mật khẩu hiện tại..."
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Mật khẩu mới (tối thiểu 6 ký tự) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    required
                    value={newPass}
                    onChange={e => setNewPass(e.target.value)}
                    placeholder="Nhập mật khẩu mới..."
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Xác nhận lại mật khẩu mới <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    required
                    value={confirmPass}
                    onChange={e => setConfirmPass(e.target.value)}
                    placeholder="Nhập lại mật khẩu mới..."
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl"
                  />
                </div>

                {passMsg && (
                  <div
                    className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                      passMsg.type === 'success'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-rose-50 text-rose-800 border border-rose-200'
                    }`}
                  >
                    {passMsg.type === 'success' ? (
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-rose-600" />
                    )}
                    <span>{passMsg.text}</span>
                  </div>
                )}

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs rounded-xl shadow-md transition cursor-pointer"
                  >
                    Lưu mật khẩu mới
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-white flex items-center justify-between">
          <div className="text-xs text-slate-500">
            Hotline/Zalo hỗ trợ Admin: <strong className="text-slate-800">{AUTHOR_PHONE}</strong> ({AUTHOR_NAME})
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 shadow-xs transition cursor-pointer"
          >
            Đóng bảng quản trị
          </button>
        </div>
      </div>
    </div>
  );
};
