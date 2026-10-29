import { SubjectType, GradeType, TextbookType, CognitionLevel } from './exam';

export interface YCCD {
  id: string;
  level: CognitionLevel;
  sourceDocument: string;
  officialCode: string;
  content: string;
}

export interface Lesson {
  id: string;
  title: string;
  order: number;
  yccds: YCCD[];
}

export interface Chapter {
  id: string;
  subject: SubjectType;
  grade: GradeType;
  textbook: TextbookType;
  order: number;
  code: string;
  title: string;
  lessons: Lesson[];
}

// Flat lookup item
export interface FlatYCCD {
  id: string;
  subject: SubjectType;
  grade: GradeType;
  chapterId: string;
  chapterName: string;
  lessonId: string;
  lessonName: string;
  defaultLevel: CognitionLevel;
  officialText: string;
  source: string;
  verified: boolean;
}

export interface StandardCurriculumChapter {
  id: string;
  name: string;
  subject: SubjectType;
  grade: GradeType;
  order: number;
  lessons: {
    id: string;
    name: string;
    order: number;
    yccds: FlatYCCD[];
  }[];
}

