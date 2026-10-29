import { ExamProject, getSubjectName } from '../types/exam';
import { ApprovedGmail, AccessRequest, ActivationCode } from '../types/auth';
import { loadProjects, saveProject } from './storageService';
import { DEFAULT_SAMPLES } from '../data/sampleExams';

export const firebaseConfig = {
  apiKey: "AIzaSyBX4_WGe0BZCG0ZSG_c09GcleJ-hq4aeEY",
  authDomain: "tpn123-f7971.firebaseapp.com",
  databaseURL: "https://tpn123-f7971-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "tpn123-f7971",
  storageBucket: "tpn123-f7971.firebasestorage.app",
  messagingSenderId: "443986355362",
  appId: "1:443986355362:web:1d62c3378d8b439ec6e3fb",
  measurementId: "G-JFQDG5X5CN"
};

export const GOOGLE_SHEET_ID = "1zWdvhI5Yor-XBt7Pg-NOCLhlVMvuN-oHA33jG5QyR3A";
export const GOOGLE_SHEET_URL = `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_ID}/edit?gid=0#gid=0`;

const RTDB_BASE = firebaseConfig.databaseURL.replace(/\/$/, '');

function sanitizeKey(key: string): string {
  return key.replace(/[.#$[\]/]/g, '_');
}

/**
 * REST API Helper for Firebase Realtime Database
 */
async function rtdbRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
  const url = `${RTDB_BASE}/${path}.json`;
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    }
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Firebase RTDB Error (${res.status}): ${errorText}`);
  }

  return (await res.json()) as T;
}

// ==========================================
// 1. EXAM PROJECTS CLOUD STORAGE (FIREBASE)
// ==========================================

export async function saveExamToCloud(exam: ExamProject, userEmail?: string): Promise<void> {
  const safeId = sanitizeKey(exam.id);
  const cloudData = {
    ...exam,
    syncedAt: new Date().toISOString(),
    syncedBy: userEmail || 'anonymous'
  };

  await rtdbRequest(`exams/${safeId}`, {
    method: 'PUT',
    body: JSON.stringify(cloudData)
  });
}

export async function fetchExamsFromCloud(): Promise<ExamProject[]> {
  try {
    const data = await rtdbRequest<Record<string, ExamProject> | null>('exams');
    if (!data) return [];
    return Object.values(data);
  } catch (err) {
    console.warn('Could not fetch exams from Firebase RTDB:', err);
    return [];
  }
}

export async function deleteExamFromCloud(examId: string): Promise<void> {
  const safeId = sanitizeKey(examId);
  await rtdbRequest(`exams/${safeId}`, {
    method: 'DELETE'
  });
}

/**
 * Đồng bộ toàn bộ các đề thi hiện có (mẫu + đề người dùng lưu) lên Firebase RTDB
 */
export async function syncAllLocalExamsToCloud(userEmail?: string): Promise<{ total: number; success: number }> {
  const localProjects = loadProjects();
  // Merge with DEFAULT_SAMPLES to ensure full coverage of Physics, Math, Chemistry, English
  const map = new Map<string, ExamProject>();
  DEFAULT_SAMPLES.forEach(p => map.set(p.id, p));
  localProjects.forEach(p => map.set(p.id, p));

  const allExams = Array.from(map.values());
  let success = 0;

  for (const exam of allExams) {
    try {
      await saveExamToCloud(exam, userEmail);
      success++;
    } catch (e) {
      console.error(`Failed to sync exam ${exam.id} to cloud:`, e);
    }
  }

  return { total: allExams.length, success };
}

// ==========================================
// 2. USER WHITELIST, REQUESTS, CODES (FIREBASE)
// ==========================================

export async function syncWhitelistToCloud(whitelist: ApprovedGmail[]): Promise<void> {
  await rtdbRequest('whitelist', {
    method: 'PUT',
    body: JSON.stringify(whitelist)
  });
}

export async function fetchWhitelistFromCloud(): Promise<ApprovedGmail[] | null> {
  try {
    return await rtdbRequest<ApprovedGmail[] | null>('whitelist');
  } catch (err) {
    console.warn('Could not fetch whitelist from Firebase:', err);
    return null;
  }
}

export async function saveAccessRequestToCloud(request: AccessRequest): Promise<void> {
  const safeId = sanitizeKey(request.id);
  await rtdbRequest(`access_requests/${safeId}`, {
    method: 'PUT',
    body: JSON.stringify(request)
  });
}

export async function fetchAccessRequestsFromCloud(): Promise<AccessRequest[]> {
  try {
    const data = await rtdbRequest<Record<string, AccessRequest> | null>('access_requests');
    if (!data) return [];
    return Object.values(data);
  } catch (err) {
    console.warn('Could not fetch access requests from Firebase:', err);
    return [];
  }
}

export async function syncActivationCodesToCloud(codes: ActivationCode[]): Promise<void> {
  await rtdbRequest('activation_codes', {
    method: 'PUT',
    body: JSON.stringify(codes)
  });
}

export async function fetchActivationCodesFromCloud(): Promise<ActivationCode[] | null> {
  try {
    return await rtdbRequest<ActivationCode[] | null>('activation_codes');
  } catch (err) {
    console.warn('Could not fetch activation codes from Firebase:', err);
    return null;
  }
}

// ==========================================
// 3. GOOGLE SHEETS DASHBOARD INTEGRATION
// ==========================================

export interface GoogleSheetRow {
  examId: string;
  examName: string;
  subject: string;
  grade: number;
  semester: string;
  schoolYear: string;
  durationMinutes: number;
  maxScore: number;
  schoolName: string;
  deptOrTeacher: string;
  activeSectionsCount: number;
  ratioNB: number;
  ratioTH: number;
  ratioVD: number;
  updatedAt: string;
  firebaseStatus: string;
}

export function buildGoogleSheetRows(exams: ExamProject[]): GoogleSheetRow[] {
  return exams.map(e => ({
    examId: e.id,
    examName: e.generalInfo.examName,
    subject: getSubjectName(e.generalInfo.subject),
    grade: e.generalInfo.grade,
    semester: e.generalInfo.semester,
    schoolYear: e.generalInfo.schoolYear,
    durationMinutes: e.generalInfo.durationMinutes,
    maxScore: e.generalInfo.maxScore,
    schoolName: e.generalInfo.schoolName,
    deptOrTeacher: e.generalInfo.teacherName || e.generalInfo.deptName,
    activeSectionsCount: e.sections.filter(s => s.enabled).length,
    ratioNB: e.targetRatio.NB,
    ratioTH: e.targetRatio.TH,
    ratioVD: e.targetRatio.VD,
    updatedAt: new Date(e.updatedAt || Date.now()).toLocaleDateString('vi-VN'),
    firebaseStatus: 'Đã đồng bộ Cloud RTDB'
  }));
}

/**
 * Tạo dữ liệu TSV (Tab-Separated Values) để người dùng copy trực tiếp dán vào Google Sheets
 */
export function generateGoogleSheetsTsv(exams: ExamProject[]): string {
  const headers = [
    'Mã đề',
    'Tên đề kiểm tra',
    'Môn học',
    'Khối lớp',
    'Học kì',
    'Năm học',
    'Thời gian (phút)',
    'Thang điểm',
    'Trường học',
    'Giáo viên / Tổ',
    'Số phần thi',
    'Tỉ lệ NB (%)',
    'Tỉ lệ TH (%)',
    'Tỉ lệ VD (%)',
    'Cập nhật',
    'Đám mây Firebase'
  ];

  const rows = buildGoogleSheetRows(exams).map(r => [
    r.examId,
    r.examName,
    r.subject,
    r.grade,
    r.semester,
    r.schoolYear,
    r.durationMinutes,
    r.maxScore,
    r.schoolName,
    r.deptOrTeacher,
    r.activeSectionsCount,
    `${r.ratioNB}%`,
    `${r.ratioTH}%`,
    `${r.ratioVD}%`,
    r.updatedAt,
    r.firebaseStatus
  ]);

  return [headers.join('\t'), ...rows.map(r => r.join('\t'))].join('\n');
}

/**
 * Copy dữ liệu dạng bảng vào Clipboard để dán ngay vào Google Sheets
 */
export async function copyExamsToClipboardForGoogleSheets(exams: ExamProject[]): Promise<boolean> {
  const tsv = generateGoogleSheetsTsv(exams);
  try {
    await navigator.clipboard.writeText(tsv);
    return true;
  } catch {
    return false;
  }
}
