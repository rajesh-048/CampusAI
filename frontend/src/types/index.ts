// ============================================================
// CampusAI - TypeScript Type Definitions
// ============================================================

export type Role = "STUDENT" | "ADMIN";

export type DayOfWeek =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY";

export type NoticeCategory =
  | "GENERAL"
  | "ACADEMIC"
  | "EXAMINATION"
  | "PLACEMENT"
  | "SPORTS"
  | "CULTURAL"
  | "HOSTEL"
  | "TRANSPORT"
  | "LIBRARY"
  | "ADMINISTRATIVE";

export type NoticePriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";

export type DocumentCategory =
  | "SYLLABUS"
  | "PYQ"
  | "STUDY_MATERIAL"
  | "NOTES"
  | "CIRCULAR"
  | "FORM"
  | "POLICY"
  | "OTHER";

export type LocationType =
  | "BUILDING"
  | "LAB"
  | "CLASSROOM"
  | "LIBRARY"
  | "SPORTS"
  | "CANTEEN"
  | "HOSTEL"
  | "ADMINISTRATIVE"
  | "OTHER";

export type NotificationType = "INFO" | "WARNING" | "SUCCESS" | "ALERT";

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  department?: string;
  semester?: number;
  rollNumber?: string;
  phone?: string;
  avatar?: string;
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
  user: User;
}

export interface SearchRequest {
  query: string;
  filters?: Record<string, string>;
  language?: string;
  limit?: number;
}

export interface SearchResult {
  content: string;
  source: string;
  sourceType: string;
  uploadDate: string;
  lastUpdated: string;
  downloadUrl?: string;
  relevanceScore: number;
}

export interface SearchResponse {
  results: SearchResult[];
  answer: string;
  suggestedQuestions: string[];
}
