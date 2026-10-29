export type UserRole = 'admin' | 'teacher' | 'guest';

export interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: UserRole;
  isApproved: boolean;
  isActive?: boolean;
  schoolName?: string;
  subject?: string;
  phone?: string;
  accessExpiresAt: string | null;
  activatedWithCode?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AccessRequest {
  id: string;
  userId?: string;
  email: string;
  displayName: string;
  phone?: string;
  schoolName: string;
  subject: string;
  note?: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

export interface ApprovedGmail {
  email: string;
  displayName?: string;
  phone?: string;
  schoolName?: string;
  subject?: string;
  accessExpiresAt: string | null;
  isActive: boolean;
  approvedAt: string;
  note?: string;
}

export interface ActivationCode {
  id: string;
  code: string;
  durationDays: number;
  maxUses: number;
  usedCount: number;
  usedBy: {
    userId: string;
    email: string;
    displayName: string;
    usedAt: string;
    accessExpiresAt: string | null;
  }[];
  note?: string;
  isActive: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface TeacherExamCloud {
  id: string;
  ownerId: string;
  ownerEmail: string;
  ownerName: string;
  title: string;
  subject: string;
  grade: number;
  projectData: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}
