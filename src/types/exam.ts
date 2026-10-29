export type SubjectType = 'VatLi' | 'Toan' | 'Hoa' | 'TiengAnh';
export type GradeType = 10 | 11 | 12;
export type TextbookType = 'KNTT' | 'CTST' | 'CD' | 'Chung';
export type SemesterType = 'HK1' | 'HK2' | 'CaNam';
export type ExamType = 'GiuaKy' | 'CuoiKy' | 'ThuongXuyen';
export type CognitionLevel = 'NB' | 'TH' | 'VD';
export type SectionType = 'multiple_choice' | 'true_false' | 'short_answer' | 'essay';

export function getSubjectName(subject: SubjectType): string {
  switch (subject) {
    case 'VatLi':
      return 'Vật lí';
    case 'Toan':
      return 'Toán học';
    case 'Hoa':
      return 'Hóa học';
    case 'TiengAnh':
      return 'Tiếng Anh';
    default:
      return subject;
  }
}

export function getSubjectIcon(subject: SubjectType): string {
  switch (subject) {
    case 'VatLi':
      return '⚡';
    case 'Toan':
      return '📐';
    case 'Hoa':
      return '🧪';
    case 'TiengAnh':
      return '🌐';
    default:
      return '📚';
  }
}

export interface GeneralInfo {
  schoolName: string;
  deptName: string;
  subject: SubjectType;
  grade: GradeType;
  textbook: TextbookType;
  semester: SemesterType;
  examType: ExamType;
  examName: string;
  schoolYear: string;
  durationMinutes: number;
  maxScore: number;
  teacherName: string;
  dateCreated: string;
}

export interface Section {
  id: string;
  title: string;
  shortTitle: string;
  type: SectionType;
  enabled: boolean;
  questionCount: number;
  subItemsPerQuestion: number;
  pointsPerItem: number;
  totalPoints: number;
  description: string;
  essayQuestions?: { questionIndex: number; subItemsCount: number }[];
}

export interface SectionPreset {
  id: string;
  name: string;
  shortDesc: string;
  badge: string;
  sections: Section[];
}

export interface Allocation {
  sectionId: string;
  yccdId: string;
  level: CognitionLevel;
  count: number;
  assignedItems?: string[];
  locked?: boolean;
}

export interface TargetRatio {
  NB: number;
  TH: number;
  VD: number;
  basis: 'points' | 'questions';
}

export interface ExportSettings {
  orientation: 'landscape' | 'portrait';
  primaryColor: string;
  fontFamily: string;
  includeHeader: boolean;
  exportFormat: 'both' | 'matrix_only' | 'spec_only';
  paperSize: 'A4' | 'Letter';
}

export interface YCCDSelection {
  yccdId: string;
  workingText?: string;
}

export interface ExamProject {
  id: string;
  createdAt: string;
  updatedAt: string;
  generalInfo: GeneralInfo;
  selectedChapterIds: string[];
  selectedLessonIds: string[];
  yccdSelections: Record<string, YCCDSelection>;
  sections: Section[];
  allocations: Allocation[];
  targetRatio: TargetRatio;
  exportSettings: ExportSettings;
}

export interface ValidationIssue {
  id: string;
  type: 'error' | 'warning' | 'info';
  message: string;
  step: number;
  field?: string;
}

export interface MatrixRow {
  id: string;
  chapterId: string;
  chapterName: string;
  lessonId: string;
  lessonName: string;
  isFirstLessonInChapter: boolean;
  lessonRowCount: number;
  sectionLevels: Record<string, Record<CognitionLevel, number>>;
  summaryLevels: Record<CognitionLevel, number>;
  totalItems: number;
  totalPoints: number;
  percentage: number;
}

export interface MatrixSummary {
  sectionLevels: Record<string, Record<CognitionLevel, number>>;
  sectionTotals: Record<string, number>;
  sectionPoints: Record<string, number>;
  summaryLevels: Record<CognitionLevel, number>;
  summaryLevelPoints: Record<CognitionLevel, number>;
  totalItems: number;
  totalPoints: number;
  percentage: number;
}

export interface SpecRow {
  id: string;
  chapterId: string;
  chapterName: string;
  lessonId: string;
  lessonName: string;
  isFirstLessonInChapter: boolean;
  level: CognitionLevel;
  yccdList: {
    id: string;
    text: string;
    isCustomEdited: boolean;
  }[];
  sectionQuestions: Record<string, string>;
  totalQuestions: number;
}

