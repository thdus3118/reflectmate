export type UserRole = 'student' | 'teacher';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  studentId?: string; // e.g. "2024-01-15"
  resolution?: string; // Yearly resolution
}

export interface Reflection {
  id: string;
  studentId: string;
  date: string; // ISO string
  satisfaction: number; // 1-5
  selfEval: string; // "Communication/Cooperation"
  achievementEval: string; // "Learning Achievement"
  futurePlans: string;
  teacherFeedback?: string;
  sentiment?: 'positive' | 'neutral' | 'negative';
}
