import { ExamProject } from '../types/exam';
import { getSectionsPreset } from './sectionPresets';

export const SAMPLE_PHYSICS_10: ExamProject = {
  id: 'sample-vat-li-10-giua-ki-1',
  createdAt: '2026-10-26T10:00:00.000Z',
  updatedAt: '2026-10-26T10:00:00.000Z',
  generalInfo: {
    schoolName: 'TRƯỜNG THPT CHUYÊN HÀ NỘI - AMSTERDAM',
    deptName: 'SỞ GD&ĐT HÀ NỘI - TỔ VẬT LÍ',
    subject: 'VatLi',
    grade: 10,
    textbook: 'KNTT',
    semester: 'HK1',
    examType: 'GiuaKy',
    examName: 'ĐỀ KIỂM TRA ĐỊNH KÌ GIỮA HỌC KÌ I',
    schoolYear: '2026 - 2027',
    durationMinutes: 45,
    maxScore: 10,
    teacherName: 'Tổ Chuyên môn Vật lí',
    dateCreated: '2026-10-27'
  },
  selectedChapterIds: ['VL10-CH1', 'VL10-CH2'],
  selectedLessonIds: ['VL10-B1', 'VL10-B2', 'VL10-B3', 'VL10-B4', 'VL10-B5'],
  yccdSelections: {
    'VL10-YCCD-001': { yccdId: 'VL10-YCCD-001' },
    'VL10-YCCD-002': { yccdId: 'VL10-YCCD-002' },
    'VL10-YCCD-003': { yccdId: 'VL10-YCCD-003' },
    'VL10-YCCD-004': { yccdId: 'VL10-YCCD-004' },
    'VL10-YCCD-005': { yccdId: 'VL10-YCCD-005' },
    'VL10-YCCD-006': { yccdId: 'VL10-YCCD-006' },
    'VL10-YCCD-007': { yccdId: 'VL10-YCCD-007' },
    'VL10-YCCD-008': { yccdId: 'VL10-YCCD-008' },
    'VL10-YCCD-009': { yccdId: 'VL10-YCCD-009' },
    'VL10-YCCD-010': { yccdId: 'VL10-YCCD-010' }
  },
  sections: getSectionsPreset('thpt_ly'),
  allocations: [],
  targetRatio: { NB: 40, TH: 30, VD: 30, basis: 'points' },
  exportSettings: {
    orientation: 'landscape',
    primaryColor: '#1E3A8A',
    fontFamily: 'Times New Roman',
    includeHeader: true,
    exportFormat: 'both',
    paperSize: 'A4'
  }
};

export const SAMPLE_MATH_10: ExamProject = {
  id: 'sample-toan-10-giua-ki-1',
  createdAt: '2026-10-26T11:00:00.000Z',
  updatedAt: '2026-10-26T11:00:00.000Z',
  generalInfo: {
    schoolName: 'TRƯỜNG THPT LÊ HỒNG PHONG',
    deptName: 'SỞ GD&ĐT TP. HỒ CHÍ MINH - TỔ TOÁN',
    subject: 'Toan',
    grade: 10,
    textbook: 'KNTT',
    semester: 'HK1',
    examType: 'GiuaKy',
    examName: 'ĐỀ KIỂM TRA ĐỊNH KÌ GIỮA HỌC KÌ I MÔN TOÁN',
    schoolYear: '2026 - 2027',
    durationMinutes: 60,
    maxScore: 10,
    teacherName: 'Tổ Chuyên môn Toán',
    dateCreated: '2026-10-27'
  },
  selectedChapterIds: ['TOAN10-CH1', 'TOAN10-CH2', 'TOAN10-CH3'],
  selectedLessonIds: ['TOAN10-B1', 'TOAN10-B2', 'TOAN10-B3', 'TOAN10-B4', 'TOAN10-B5', 'TOAN10-B6'],
  yccdSelections: {
    'TOAN10-YCCD-001': { yccdId: 'TOAN10-YCCD-001' },
    'TOAN10-YCCD-002': { yccdId: 'TOAN10-YCCD-002' },
    'TOAN10-YCCD-003': { yccdId: 'TOAN10-YCCD-003' },
    'TOAN10-YCCD-004': { yccdId: 'TOAN10-YCCD-004' },
    'TOAN10-YCCD-006': { yccdId: 'TOAN10-YCCD-006' },
    'TOAN10-YCCD-007': { yccdId: 'TOAN10-YCCD-007' },
    'TOAN10-YCCD-008': { yccdId: 'TOAN10-YCCD-008' },
    'TOAN10-YCCD-010': { yccdId: 'TOAN10-YCCD-010' },
    'TOAN10-YCCD-011': { yccdId: 'TOAN10-YCCD-011' },
    'TOAN10-YCCD-012': { yccdId: 'TOAN10-YCCD-012' }
  },
  sections: getSectionsPreset('thpt_toan'),
  allocations: [],
  targetRatio: { NB: 40, TH: 30, VD: 30, basis: 'points' },
  exportSettings: {
    orientation: 'landscape',
    primaryColor: '#0F766E',
    fontFamily: 'Times New Roman',
    includeHeader: true,
    exportFormat: 'both',
    paperSize: 'A4'
  }
};

export const SAMPLE_MATH_12: ExamProject = {
  id: 'sample-toan-12-cuoi-ki-1',
  createdAt: '2026-10-26T12:00:00.000Z',
  updatedAt: '2026-10-26T12:00:00.000Z',
  generalInfo: {
    schoolName: 'TRƯỜNG THPT QUỐC HỌC HUẾ',
    deptName: 'SỞ GD&ĐT THỪA THIÊN HUẾ - TỔ TOÁN',
    subject: 'Toan',
    grade: 12,
    textbook: 'KNTT',
    semester: 'HK1',
    examType: 'CuoiKy',
    examName: 'ĐỀ KIỂM TRA ĐỊNH KÌ HỌC KÌ I MÔN TOÁN',
    schoolYear: '2026 - 2027',
    durationMinutes: 90,
    maxScore: 10,
    teacherName: 'Tổ Toán THPT',
    dateCreated: '2026-10-27'
  },
  selectedChapterIds: ['TOAN12-CH1', 'TOAN12-CH2'],
  selectedLessonIds: ['TOAN12-B1', 'TOAN12-B2', 'TOAN12-B3', 'TOAN12-B4', 'TOAN12-B5', 'TOAN12-B6', 'TOAN12-B7', 'TOAN12-B8'],
  yccdSelections: {
    'TOAN12-YCCD-001': { yccdId: 'TOAN12-YCCD-001' },
    'TOAN12-YCCD-002': { yccdId: 'TOAN12-YCCD-002' },
    'TOAN12-YCCD-003': { yccdId: 'TOAN12-YCCD-003' },
    'TOAN12-YCCD-004': { yccdId: 'TOAN12-YCCD-004' },
    'TOAN12-YCCD-005': { yccdId: 'TOAN12-YCCD-005' },
    'TOAN12-YCCD-008': { yccdId: 'TOAN12-YCCD-008' },
    'TOAN12-YCCD-009': { yccdId: 'TOAN12-YCCD-009' },
    'TOAN12-YCCD-010': { yccdId: 'TOAN12-YCCD-010' }
  },
  sections: getSectionsPreset('thpt_toan'),
  allocations: [],
  targetRatio: { NB: 30, TH: 40, VD: 30, basis: 'points' },
  exportSettings: {
    orientation: 'landscape',
    primaryColor: '#7C3AED',
    fontFamily: 'Times New Roman',
    includeHeader: true,
    exportFormat: 'both',
    paperSize: 'A4'
  }
};

export const SAMPLE_CHEMISTRY_10: ExamProject = {
  id: 'sample-hoa-10-giua-ki-1',
  createdAt: '2026-10-26T12:00:00.000Z',
  updatedAt: '2026-10-26T12:00:00.000Z',
  generalInfo: {
    schoolName: 'TRƯỜNG THPT CHUYÊN LÊ HỒNG PHONG',
    deptName: 'SỞ GD&ĐT TP. HỒ CHÍ MINH - TỔ HÓA HỌC',
    subject: 'Hoa',
    grade: 10,
    textbook: 'KNTT',
    semester: 'HK1',
    examType: 'GiuaKy',
    examName: 'ĐỀ KIỂM TRA ĐỊNH KÌ GIỮA HỌC KÌ I MÔN HÓA HỌC',
    schoolYear: '2026 - 2027',
    durationMinutes: 45,
    maxScore: 10,
    teacherName: 'Tổ Chuyên môn Hóa học',
    dateCreated: '2026-10-27'
  },
  selectedChapterIds: ['HOA10-CH1', 'HOA10-CH2'],
  selectedLessonIds: ['HOA10-B1', 'HOA10-B2', 'HOA10-B3', 'HOA10-B4', 'HOA10-B5'],
  yccdSelections: {
    'HOA10-YCCD-001': { yccdId: 'HOA10-YCCD-001' },
    'HOA10-YCCD-002': { yccdId: 'HOA10-YCCD-002' },
    'HOA10-YCCD-003': { yccdId: 'HOA10-YCCD-003' },
    'HOA10-YCCD-004': { yccdId: 'HOA10-YCCD-004' },
    'HOA10-YCCD-005': { yccdId: 'HOA10-YCCD-005' },
    'HOA10-YCCD-006': { yccdId: 'HOA10-YCCD-006' },
    'HOA10-YCCD-007': { yccdId: 'HOA10-YCCD-007' },
    'HOA10-YCCD-008': { yccdId: 'HOA10-YCCD-008' },
    'HOA10-YCCD-009': { yccdId: 'HOA10-YCCD-009' },
    'HOA10-YCCD-010': { yccdId: 'HOA10-YCCD-010' }
  },
  sections: getSectionsPreset('thpt_hoa'),
  allocations: [],
  targetRatio: { NB: 40, TH: 30, VD: 30, basis: 'points' },
  exportSettings: {
    orientation: 'landscape',
    primaryColor: '#0D9488',
    fontFamily: 'Times New Roman',
    includeHeader: true,
    exportFormat: 'both',
    paperSize: 'A4'
  }
};

export const SAMPLE_ENGLISH_10: ExamProject = {
  id: 'sample-tieng-anh-10-giua-ki-1',
  createdAt: '2026-10-26T13:00:00.000Z',
  updatedAt: '2026-10-26T13:00:00.000Z',
  generalInfo: {
    schoolName: 'TRƯỜNG THPT CHU VĂN AN',
    deptName: 'SỞ GD&ĐT HÀ NỘI - TỔ TIẾNG ANH',
    subject: 'TiengAnh',
    grade: 10,
    textbook: 'KNTT',
    semester: 'HK1',
    examType: 'GiuaKy',
    examName: 'ĐỀ KIỂM TRA ĐỊNH KÌ GIỮA HỌC KÌ I MÔN TIẾNG ANH',
    schoolYear: '2026 - 2027',
    durationMinutes: 50,
    maxScore: 10,
    teacherName: 'Tổ Ngoại ngữ - Tiếng Anh',
    dateCreated: '2026-10-27'
  },
  selectedChapterIds: ['TA10-U1', 'TA10-U2'],
  selectedLessonIds: ['TA10-U1-L1', 'TA10-U1-L2', 'TA10-U2-L1', 'TA10-U2-L2'],
  yccdSelections: {
    'TA10-YCCD-001': { yccdId: 'TA10-YCCD-001' },
    'TA10-YCCD-002': { yccdId: 'TA10-YCCD-002' },
    'TA10-YCCD-003': { yccdId: 'TA10-YCCD-003' },
    'TA10-YCCD-004': { yccdId: 'TA10-YCCD-004' },
    'TA10-YCCD-005': { yccdId: 'TA10-YCCD-005' },
    'TA10-YCCD-006': { yccdId: 'TA10-YCCD-006' },
    'TA10-YCCD-007': { yccdId: 'TA10-YCCD-007' },
    'TA10-YCCD-008': { yccdId: 'TA10-YCCD-008' },
    'TA10-YCCD-009': { yccdId: 'TA10-YCCD-009' }
  },
  sections: getSectionsPreset('thpt_tienganh'),
  allocations: [],
  targetRatio: { NB: 40, TH: 30, VD: 30, basis: 'points' },
  exportSettings: {
    orientation: 'landscape',
    primaryColor: '#2563EB',
    fontFamily: 'Times New Roman',
    includeHeader: true,
    exportFormat: 'both',
    paperSize: 'A4'
  }
};

export const DEFAULT_SAMPLES = [
  SAMPLE_PHYSICS_10,
  SAMPLE_MATH_10,
  SAMPLE_MATH_12,
  SAMPLE_CHEMISTRY_10,
  SAMPLE_ENGLISH_10
];

