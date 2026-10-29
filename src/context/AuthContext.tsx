import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, AccessRequest, ActivationCode, TeacherExamCloud, ApprovedGmail } from '../types/auth';
import { ExamProject } from '../types/exam';
import {
  saveExamToCloud,
  deleteExamFromCloud,
  saveAccessRequestToCloud
} from '../services/onlineStorageService';

export const ADMIN_EMAIL = 'tailieutoantbs@gmail.com';
export const DEFAULT_ADMIN_PASSWORD = 'Tbs@gv2026';
export const AUTHOR_NAME = 'Thầy Hùng TBS';
export const AUTHOR_PHONE = '0907117193';
export const WEBSITE_NAME = 'STUDIO "MATH TEST"';

const STORAGE_AUTH_USER = 'thpt_auth_user_v2';
const STORAGE_APPROVED_EMAILS = 'thpt_approved_emails_v2';
const STORAGE_ACCESS_REQUESTS = 'thpt_access_requests_v2';
const STORAGE_ACTIVATION_CODES = 'thpt_activation_codes_v2';
const STORAGE_ADMIN_PASSWORD = 'thpt_admin_password_v2';
const STORAGE_CLOUD_EXAMS = 'thpt_cloud_exams_v2';

interface AuthContextType {
  firebaseUser: any | null;
  user: UserProfile | null;
  loading: boolean;
  canEdit: boolean;
  isGuest: boolean;
  isAdmin: boolean;
  isExpired: boolean;
  daysRemaining: number | null;
  myExams: TeacherExamCloud[];
  myExamsLoading: boolean;
  activeRequest: AccessRequest | null;
  approvedEmails: ApprovedGmail[];
  accessRequests: AccessRequest[];
  activationCodes: ActivationCode[];
  login: () => Promise<void>;
  loginWithGmail: (email: string) => Promise<{ success: boolean; isApproved: boolean; message: string }>;
  loginWithAdmin: (password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<void>;
  saveCurrentExam: (exam: ExamProject) => Promise<TeacherExamCloud>;
  deleteExam: (id: string) => Promise<void>;
  requestAccess: (data: { email: string; displayName: string; phone?: string; schoolName: string; subject: string; note?: string }) => Promise<void>;
  approveRequest: (requestId: string, durationDays: number | null) => Promise<void>;
  rejectRequest: (requestId: string) => Promise<void>;
  addApprovedGmail: (data: { email: string; displayName?: string; phone?: string; schoolName?: string; subject?: string; durationDays: number | null; note?: string }) => Promise<void>;
  removeApprovedGmail: (email: string) => Promise<void>;
  toggleApprovedGmail: (email: string, active: boolean) => Promise<void>;
  renewApprovedGmail: (email: string, durationDays: number | null) => Promise<void>;
  changeAdminPassword: (oldPass: string, newPass: string) => Promise<void>;
  redeemCode: (code: string) => Promise<{ success: boolean; message: string; expiresAt: string | null }>;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authModalInitialTab?: 'gmail' | 'admin' | 'request';
  setAuthModalInitialTab: (tab: 'gmail' | 'admin' | 'request') => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [firebaseUser, setFirebaseUser] = useState<any | null>(null);
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_AUTH_USER);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalInitialTab, setAuthModalInitialTab] = useState<'gmail' | 'admin' | 'request'>('gmail');

  // Whitelist of approved emails
  const [approvedEmails, setApprovedEmails] = useState<ApprovedGmail[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_APPROVED_EMAILS);
      if (saved) return JSON.parse(saved);
    } catch {}
    const defaults: ApprovedGmail[] = [
      {
        email: ADMIN_EMAIL,
        displayName: `${AUTHOR_NAME} (Admin)`,
        phone: AUTHOR_PHONE,
        schoolName: 'STUDIO "MATH TEST"',
        subject: 'Toán',
        accessExpiresAt: null,
        isActive: true,
        approvedAt: new Date().toISOString(),
        note: 'Tài khoản quản trị viên tối cao'
      },
      {
        email: 'gv.toan12@gmail.com',
        displayName: 'Trần Thị Thu Thảo',
        phone: '0912345678',
        schoolName: 'THPT Chu Văn An',
        subject: 'Toán',
        accessExpiresAt: new Date(Date.now() + 365 * 24 * 3600 * 1000).toISOString(),
        isActive: true,
        approvedAt: new Date().toISOString(),
        note: 'Tài khoản giáo viên đã duyệt'
      }
    ];
    localStorage.setItem(STORAGE_APPROVED_EMAILS, JSON.stringify(defaults));
    return defaults;
  });

  // Access requests
  const [accessRequests, setAccessRequests] = useState<AccessRequest[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_ACCESS_REQUESTS);
      if (saved) return JSON.parse(saved);
    } catch {}
    const defaultRequests: AccessRequest[] = [
      {
        id: 'req_001',
        email: 'nguyen.van.a@thpt.edu.vn',
        displayName: 'Nguyễn Văn A',
        phone: '0987654321',
        schoolName: 'THPT Chuyên Lê Hồng Phong',
        subject: 'Toán',
        note: 'Kính gửi Thầy Hùng TBS cấp quyền làm ma trận thi học kì Toán',
        status: 'pending',
        createdAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString()
      }
    ];
    localStorage.setItem(STORAGE_ACCESS_REQUESTS, JSON.stringify(defaultRequests));
    return defaultRequests;
  });

  // Activation codes
  const [activationCodes, setActivationCodes] = useState<ActivationCode[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_ACTIVATION_CODES);
      if (saved) return JSON.parse(saved);
    } catch {}
    const defaults: ActivationCode[] = [
      {
        id: 'code_01',
        code: 'TBS2026',
        durationDays: 365,
        maxUses: 500,
        usedCount: 0,
        usedBy: [],
        note: `Mã VIP 1 năm Thầy Hùng TBS (${AUTHOR_PHONE})`,
        isActive: true,
        createdBy: ADMIN_EMAIL,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'code_02',
        code: 'MATH01',
        durationDays: 365,
        maxUses: 200,
        usedCount: 0,
        usedBy: [],
        note: 'Mã VIP dành cho giáo viên Toán THPT',
        isActive: true,
        createdBy: ADMIN_EMAIL,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'code_03',
        code: 'TEST01',
        durationDays: 7,
        maxUses: 100,
        usedCount: 0,
        usedBy: [],
        note: 'Mã trải nghiệm 7 ngày',
        isActive: true,
        createdBy: ADMIN_EMAIL,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
    localStorage.setItem(STORAGE_ACTIVATION_CODES, JSON.stringify(defaults));
    return defaults;
  });

  // Admin password
  const getAdminPassword = (): string => {
    try {
      return localStorage.getItem(STORAGE_ADMIN_PASSWORD) || DEFAULT_ADMIN_PASSWORD;
    } catch {
      return DEFAULT_ADMIN_PASSWORD;
    }
  };

  const [myExams, setMyExams] = useState<TeacherExamCloud[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_CLOUD_EXAMS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [myExamsLoading] = useState(false);

  // Active request for current user
  const activeRequest = user
    ? accessRequests.find(r => r.email.toLowerCase() === user.email.toLowerCase()) || null
    : null;

  const isAdmin = !!(user && (user.role === 'admin' || user.email.toLowerCase() === ADMIN_EMAIL.toLowerCase()));
  const isExpired = !!(
    user &&
    !isAdmin &&
    user.accessExpiresAt &&
    new Date(user.accessExpiresAt).getTime() < Date.now()
  );
  const canEdit = !!(user && (isAdmin || (user.isApproved && !isExpired && user.isActive !== false)));
  const isGuest = !canEdit;
  const daysRemaining =
    user?.accessExpiresAt && !isExpired
      ? Math.max(0, Math.ceil((new Date(user.accessExpiresAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
      : null;

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_AUTH_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_AUTH_USER);
    }
  }, [user]);

  // Login as Admin using password
  const loginWithAdmin = async (password: string) => {
    setLoading(true);
    try {
      const currentAdminPass = getAdminPassword();
      if (password.trim() !== currentAdminPass) {
        throw new Error(`Mật khẩu Admin không chính xác! (Mật khẩu mặc định: ${DEFAULT_ADMIN_PASSWORD})`);
      }

      const adminProfile: UserProfile = {
        id: 'admin_tbs',
        email: ADMIN_EMAIL,
        displayName: `${AUTHOR_NAME} (Admin)`,
        role: 'admin',
        isApproved: true,
        isActive: true,
        schoolName: 'STUDIO "MATH TEST"',
        subject: 'Toán',
        phone: AUTHOR_PHONE,
        accessExpiresAt: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      setUser(adminProfile);
      setFirebaseUser({ uid: adminProfile.id, email: adminProfile.email, displayName: adminProfile.displayName });
      return { success: true, message: `Chào mừng ${AUTHOR_NAME} đăng nhập quản trị thành công!` };
    } finally {
      setLoading(false);
    }
  };

  // Login with Gmail (Teacher)
  const loginWithGmail = async (emailInput: string) => {
    setLoading(true);
    try {
      const normalized = emailInput.trim().toLowerCase();
      if (!normalized || !normalized.includes('@')) {
        throw new Error('Vui lòng nhập đúng định dạng địa chỉ Gmail!');
      }

      // If user typed admin email, suggest admin password login
      if (normalized === ADMIN_EMAIL.toLowerCase()) {
        throw new Error(`Đây là tài khoản Quản trị viên (${ADMIN_EMAIL}). Vui lòng chuyển sang tab "Đăng nhập Admin" để nhập mật khẩu.`);
      }

      // Find in whitelist
      const approved = approvedEmails.find(a => a.email.toLowerCase() === normalized);

      if (!approved) {
        // Not approved yet -> create guest/unapproved session so user can submit request
        const guestProfile: UserProfile = {
          id: `user_${Date.now()}`,
          email: normalized,
          displayName: normalized.split('@')[0],
          role: 'guest',
          isApproved: false,
          isActive: true,
          accessExpiresAt: null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        setUser(guestProfile);
        return {
          success: false,
          isApproved: false,
          message: `Gmail "${normalized}" chưa được cấp quyền truy cập. Vui lòng gửi yêu cầu cấp quyền để Thầy Hùng TBS phê duyệt!`
        };
      }

      if (approved.isActive === false) {
        throw new Error('Tài khoản này đã bị Quản trị viên tạm khóa. Vui lòng liên hệ Thầy Hùng TBS qua Hotline/Zalo: ' + AUTHOR_PHONE);
      }

      if (approved.accessExpiresAt && new Date(approved.accessExpiresAt).getTime() < Date.now()) {
        const expiredProfile: UserProfile = {
          id: `user_${Date.now()}`,
          email: approved.email,
          displayName: approved.displayName || approved.email.split('@')[0],
          role: 'teacher',
          isApproved: false,
          isActive: true,
          schoolName: approved.schoolName,
          subject: approved.subject,
          phone: approved.phone,
          accessExpiresAt: approved.accessExpiresAt,
          createdAt: approved.approvedAt,
          updatedAt: new Date().toISOString()
        };
        setUser(expiredProfile);
        return {
          success: false,
          isApproved: false,
          message: `Tài khoản (${approved.email}) đã hết hạn sử dụng vào ngày ${new Date(approved.accessExpiresAt).toLocaleDateString('vi-VN')}. Vui lòng liên hệ Thầy Hùng TBS để gia hạn!`
        };
      }

      // Valid approved user
      const teacherProfile: UserProfile = {
        id: `user_${Date.now()}`,
        email: approved.email,
        displayName: approved.displayName || approved.email.split('@')[0],
        role: 'teacher',
        isApproved: true,
        isActive: true,
        schoolName: approved.schoolName,
        subject: approved.subject || 'Toán',
        phone: approved.phone,
        accessExpiresAt: approved.accessExpiresAt,
        createdAt: approved.approvedAt,
        updatedAt: new Date().toISOString()
      };

      setUser(teacherProfile);
      setFirebaseUser({ uid: teacherProfile.id, email: teacherProfile.email, displayName: teacherProfile.displayName });

      return {
        success: true,
        isApproved: true,
        message: `Đăng nhập thành công! Chào mừng Thầy/Cô ${teacherProfile.displayName} đến với STUDIO "MATH TEST".`
      };
    } finally {
      setLoading(false);
    }
  };

  // Generic login trigger
  const login = async () => {
    setIsAuthModalOpen(true);
  };

  const logout = async () => {
    setUser(null);
    setFirebaseUser(null);
    localStorage.removeItem(STORAGE_AUTH_USER);
  };

  // Submit request access
  const requestAccess = async (data: {
    email: string;
    displayName: string;
    phone?: string;
    schoolName: string;
    subject: string;
    note?: string;
  }) => {
    const req: AccessRequest = {
      id: `req_${Date.now()}`,
      userId: user?.id,
      email: data.email.trim().toLowerCase(),
      displayName: data.displayName.trim(),
      phone: data.phone?.trim(),
      schoolName: data.schoolName.trim(),
      subject: data.subject.trim(),
      note: data.note?.trim() || '',
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const nextRequests = [req, ...accessRequests.filter(r => r.email.toLowerCase() !== req.email.toLowerCase())];
    setAccessRequests(nextRequests);
    localStorage.setItem(STORAGE_ACCESS_REQUESTS, JSON.stringify(nextRequests));

    // Also sync request to Firebase Cloud
    try {
      await saveAccessRequestToCloud(req);
    } catch (e) {
      console.warn('Failed to sync access request to cloud:', e);
    }
  };

  // Admin approves request
  const approveRequest = async (requestId: string, durationDays: number | null) => {
    const req = accessRequests.find(r => r.id === requestId);
    if (!req) return;

    const expiresAt = durationDays ? new Date(Date.now() + durationDays * 24 * 3600 * 1000).toISOString() : null;

    // Update request status
    const updatedRequests = accessRequests.map(r => (r.id === requestId ? { ...r, status: 'approved' as const } : r));
    setAccessRequests(updatedRequests);
    localStorage.setItem(STORAGE_ACCESS_REQUESTS, JSON.stringify(updatedRequests));

    // Update whitelist
    const existingIndex = approvedEmails.findIndex(a => a.email.toLowerCase() === req.email.toLowerCase());
    let nextApproved = [...approvedEmails];
    const item: ApprovedGmail = {
      email: req.email.toLowerCase(),
      displayName: req.displayName,
      phone: req.phone,
      schoolName: req.schoolName,
      subject: req.subject,
      accessExpiresAt: expiresAt,
      isActive: true,
      approvedAt: new Date().toISOString(),
      note: req.note
    };

    if (existingIndex >= 0) {
      nextApproved[existingIndex] = item;
    } else {
      nextApproved.push(item);
    }

    setApprovedEmails(nextApproved);
    localStorage.setItem(STORAGE_APPROVED_EMAILS, JSON.stringify(nextApproved));

    // If current logged-in user is this email, update their session
    if (user && user.email.toLowerCase() === req.email.toLowerCase()) {
      setUser({
        ...user,
        displayName: req.displayName,
        role: 'teacher',
        isApproved: true,
        isActive: true,
        accessExpiresAt: expiresAt,
        schoolName: req.schoolName,
        subject: req.subject,
        phone: req.phone,
        updatedAt: new Date().toISOString()
      });
    }
  };

  // Admin rejects request
  const rejectRequest = async (requestId: string) => {
    const updatedRequests = accessRequests.map(r => (r.id === requestId ? { ...r, status: 'rejected' as const } : r));
    setAccessRequests(updatedRequests);
    localStorage.setItem(STORAGE_ACCESS_REQUESTS, JSON.stringify(updatedRequests));
  };

  // Admin adds approved Gmail directly
  const addApprovedGmail = async (data: {
    email: string;
    displayName?: string;
    phone?: string;
    schoolName?: string;
    subject?: string;
    durationDays: number | null;
    note?: string;
  }) => {
    const emailNorm = data.email.trim().toLowerCase();
    const expiresAt = data.durationDays ? new Date(Date.now() + data.durationDays * 24 * 3600 * 1000).toISOString() : null;

    const newItem: ApprovedGmail = {
      email: emailNorm,
      displayName: data.displayName?.trim() || emailNorm.split('@')[0],
      phone: data.phone?.trim(),
      schoolName: data.schoolName?.trim(),
      subject: data.subject?.trim() || 'Toán',
      accessExpiresAt: expiresAt,
      isActive: true,
      approvedAt: new Date().toISOString(),
      note: data.note?.trim()
    };

    const existingIndex = approvedEmails.findIndex(a => a.email.toLowerCase() === emailNorm);
    let nextList = [...approvedEmails];
    if (existingIndex >= 0) {
      nextList[existingIndex] = newItem;
    } else {
      nextList.push(newItem);
    }

    setApprovedEmails(nextList);
    localStorage.setItem(STORAGE_APPROVED_EMAILS, JSON.stringify(nextList));

    if (user && user.email.toLowerCase() === emailNorm) {
      setUser({
        ...user,
        displayName: newItem.displayName || user.displayName,
        role: 'teacher',
        isApproved: true,
        isActive: true,
        accessExpiresAt: expiresAt,
        updatedAt: new Date().toISOString()
      });
    }
  };

  // Remove Gmail from whitelist
  const removeApprovedGmail = async (email: string) => {
    const normalized = email.trim().toLowerCase();
    if (normalized === ADMIN_EMAIL.toLowerCase()) {
      throw new Error('Không thể xóa tài khoản Quản trị viên tối cao!');
    }
    const nextList = approvedEmails.filter(a => a.email.toLowerCase() !== normalized);
    setApprovedEmails(nextList);
    localStorage.setItem(STORAGE_APPROVED_EMAILS, JSON.stringify(nextList));

    if (user && user.email.toLowerCase() === normalized) {
      setUser({
        ...user,
        isApproved: false,
        updatedAt: new Date().toISOString()
      });
    }
  };

  // Toggle active
  const toggleApprovedGmail = async (email: string, active: boolean) => {
    const normalized = email.trim().toLowerCase();
    if (normalized === ADMIN_EMAIL.toLowerCase()) {
      throw new Error('Không thể khóa tài khoản Quản trị viên tối cao!');
    }
    const nextList = approvedEmails.map(a => (a.email.toLowerCase() === normalized ? { ...a, isActive: active } : a));
    setApprovedEmails(nextList);
    localStorage.setItem(STORAGE_APPROVED_EMAILS, JSON.stringify(nextList));

    if (user && user.email.toLowerCase() === normalized) {
      setUser({
        ...user,
        isActive: active,
        updatedAt: new Date().toISOString()
      });
    }
  };

  // Renew Gmail
  const renewApprovedGmail = async (email: string, durationDays: number | null) => {
    const normalized = email.trim().toLowerCase();
    const expiresAt = durationDays ? new Date(Date.now() + durationDays * 24 * 3600 * 1000).toISOString() : null;

    const nextList = approvedEmails.map(a =>
      a.email.toLowerCase() === normalized ? { ...a, accessExpiresAt: expiresAt, isActive: true } : a
    );
    setApprovedEmails(nextList);
    localStorage.setItem(STORAGE_APPROVED_EMAILS, JSON.stringify(nextList));

    if (user && user.email.toLowerCase() === normalized) {
      setUser({
        ...user,
        isApproved: true,
        isActive: true,
        accessExpiresAt: expiresAt,
        updatedAt: new Date().toISOString()
      });
    }
  };

  // Change Admin Password
  const changeAdminPassword = async (oldPass: string, newPass: string) => {
    const currentPass = getAdminPassword();
    if (oldPass !== currentPass) {
      throw new Error('Mật khẩu hiện tại không chính xác!');
    }
    if (!newPass || newPass.trim().length < 6) {
      throw new Error('Mật khẩu mới phải có ít nhất 6 ký tự!');
    }
    localStorage.setItem(STORAGE_ADMIN_PASSWORD, newPass.trim());
  };

  // Redeem code
  const redeemCode = async (code: string) => {
    if (!user) throw new Error('Vui lòng nhập địa chỉ Gmail trước khi kích hoạt.');
    const trimmed = code.trim().toUpperCase();
    if (trimmed.length !== 6 && trimmed.length !== 7) {
      throw new Error('Mã kích hoạt phải đúng độ dài (VD: TBS2026, MATH01, TEST01).');
    }

    const foundCode = activationCodes.find(c => c.code.toUpperCase() === trimmed);
    if (!foundCode) {
      throw new Error(`Mã kích hoạt "${trimmed}" không tồn tại hoặc đã hết hiệu lực!`);
    }
    if (!foundCode.isActive) {
      throw new Error(`Mã kích hoạt "${trimmed}" đã bị khóa bởi Quản trị viên.`);
    }
    if (foundCode.usedCount >= foundCode.maxUses) {
      throw new Error(`Mã kích hoạt "${trimmed}" đã hết lượt sử dụng.`);
    }

    const durationDays = foundCode.durationDays;
    const expiresAt = new Date(Date.now() + durationDays * 24 * 60 * 60 * 1000).toISOString();

    // Update activation code used count
    const nextCodes = activationCodes.map(c =>
      c.id === foundCode.id
        ? {
            ...c,
            usedCount: c.usedCount + 1,
            usedBy: [
              ...c.usedBy,
              {
                userId: user.id,
                email: user.email,
                displayName: user.displayName,
                usedAt: new Date().toISOString(),
                accessExpiresAt: expiresAt
              }
            ]
          }
        : c
    );
    setActivationCodes(nextCodes);
    localStorage.setItem(STORAGE_ACTIVATION_CODES, JSON.stringify(nextCodes));

    // Add to approved emails whitelist
    await addApprovedGmail({
      email: user.email,
      displayName: user.displayName,
      durationDays,
      note: `Kích hoạt tự động qua mã ${trimmed}`
    });

    const updatedUser: UserProfile = {
      ...user,
      role: 'teacher',
      isApproved: true,
      isActive: true,
      accessExpiresAt: expiresAt,
      activatedWithCode: trimmed,
      updatedAt: new Date().toISOString()
    };
    setUser(updatedUser);

    return {
      success: true,
      message: `Kích hoạt thành công mã "${trimmed}"! Bạn đã được cấp quyền sử dụng STUDIO "MATH TEST" trong ${durationDays} ngày (đến ngày ${new Date(expiresAt).toLocaleDateString('vi-VN')}).`,
      expiresAt
    };
  };

  // Exam save / delete
  const saveCurrentExam = async (exam: ExamProject): Promise<TeacherExamCloud> => {
    if (!user) throw new Error('Vui lòng đăng nhập để lưu ma trận!');
    if (!canEdit) throw new Error('Tài khoản chưa được phê duyệt quyền truy cập và lưu ma trận.');

    const cloudItem: TeacherExamCloud = {
      id: exam.id,
      ownerId: user.id,
      ownerEmail: user.email,
      ownerName: user.displayName,
      title: exam.generalInfo.examName?.trim() || 'Ma trận & Bản đặc tả đề kiểm tra Toán',
      subject: exam.generalInfo.subject,
      grade: exam.generalInfo.grade,
      projectData: JSON.stringify(exam),
      isPublic: false,
      createdAt: exam.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const nextList = [cloudItem, ...myExams.filter(e => e.id !== exam.id)];
    setMyExams(nextList);
    localStorage.setItem(STORAGE_CLOUD_EXAMS, JSON.stringify(nextList));

    // Also sync directly to Firebase Cloud
    try {
      await saveExamToCloud(exam, user.email);
    } catch (e) {
      console.warn('Failed to sync exam to Firebase cloud:', e);
    }

    return cloudItem;
  };

  const deleteExam = async (id: string) => {
    if (!user) throw new Error('Vui lòng đăng nhập!');
    const nextList = myExams.filter(e => e.id !== id);
    setMyExams(nextList);
    localStorage.setItem(STORAGE_CLOUD_EXAMS, JSON.stringify(nextList));

    // Also delete from Firebase Cloud
    try {
      await deleteExamFromCloud(id);
    } catch (e) {
      console.warn('Failed to delete exam from Firebase cloud:', e);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        firebaseUser,
        user,
        loading,
        canEdit,
        isGuest,
        isAdmin,
        isExpired,
        daysRemaining,
        myExams,
        myExamsLoading,
        activeRequest,
        approvedEmails,
        accessRequests,
        activationCodes,
        login,
        loginWithGmail,
        loginWithAdmin,
        logout,
        saveCurrentExam,
        deleteExam,
        requestAccess,
        approveRequest,
        rejectRequest,
        addApprovedGmail,
        removeApprovedGmail,
        toggleApprovedGmail,
        renewApprovedGmail,
        changeAdminPassword,
        redeemCode,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalInitialTab,
        setAuthModalInitialTab
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
