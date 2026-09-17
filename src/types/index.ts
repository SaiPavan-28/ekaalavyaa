export type UserRole = 'student' | 'teacher' | 'mentor' | 'admin';

export type StudentProfile = StudentProfileData;

export interface Announcement {
  id: string;
  title: string;
  content: string;
  targetRole: 'all' | 'student' | 'teacher' | 'mentor';
  priority: 'normal' | 'urgent';
  author: string;
  date: string;
}

export interface LearningCenter {
  id: string;
  name: string;
  district: string;
  state: string;
  coordinator: string;
  contactEmail: string;
  contactPhone: string;
  studentCount: number;
  capacity: number;
  attendanceRate: number;
  performanceScore: number;
  status: 'active' | 'under_review' | 'expanding';
  facilities: string[];
}


export type OpportunityStage = 'interested' | 'preparing' | 'applied' | 'offer_received' | 'not_selected';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  location?: string;
  bio?: string;
  center?: string;
  joinedDate: string;
}

export interface StudentProfileData extends User {
  rollNumber: string;
  gradeLevel: string; // e.g. "Grade 12 (Science)", "Undergrad Prep"
  stream: string;
  targetMajor: string;
  academicPerformanceScore: number; // e.g., 88.5%
  attendancePercentage: number;
  assignedMentor: string;
  mentorContact: string;
  guardianName: string;
  guardianContact: string;
  dreamInstitutions: string[];
  achievements: string[];
  socioeconomicCategory?: string;
  nativeDistrict: string;
}

export interface Course {
  id: string;
  code: string;
  title: string;
  instructor: string;
  category: string;
  description: string;
  modulesCount: number;
  completedModules: number;
  progress: number;
  nextSession: string;
  roomOrLink: string;
  days: string[];
}

export interface AttendanceRecord {
  id: string;
  date: string;
  courseTitle: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  sessionTopic: string;
  remarks?: string;
}

export interface Assignment {
  id: string;
  courseId: string;
  courseTitle: string;
  title: string;
  description: string;
  dueDate: string;
  maxScore: number;
  obtainedScore?: number;
  status: 'pending' | 'submitted' | 'graded' | 'late';
  submissionDate?: string;
  teacherFeedback?: string;
  attachmentName?: string;
}

export interface TestItem {
  id: string;
  courseId: string;
  courseTitle: string;
  title: string;
  scheduledDate: string;
  durationMinutes: number;
  totalMarks: number;
  obtainedMarks?: number;
  rank?: number;
  totalStudents?: number;
  percentile?: number;
  status: 'upcoming' | 'completed' | 'graded';
  topics: string[];
  difficulty: 'Foundation' | 'Moderate' | 'Advanced Olympiad';
}

export interface Opportunity {
  id: string;
  name: string;
  institution: string;
  type: 'University' | 'Fellowship' | 'Scholarship' | 'Premier Entrance' | 'Premier Course';
  location: string;
  eligibility: string;
  deadline: string;
  description: string;
  benefits: string;
  applicationFee: string;
  tags: string[];
  featured?: boolean;
  websiteUrl?: string;
}

export interface ApplicationRecord {
  id: string;
  opportunityId: string;
  opportunityName: string;
  institution: string;
  type: 'University' | 'Fellowship' | 'Scholarship' | 'Premier Entrance' | 'Premier Course';
  stage: OpportunityStage;
  updatedAt: string;
  submittedDate?: string;
  deadline: string;
  assignedMentorNotes?: string;
  checklist: {
    id: string;
    task: string;
    done: boolean;
  }[];
  interviewDate?: string;
  notes?: string;
}

export interface MentoringSession {
  id: string;
  mentorId: string;
  studentId: string;
  studentName: string;
  studentAvatar?: string;
  date: string;
  time: string;
  mode: 'In-person' | 'Virtual Video' | 'Audio Call' | 'In-Person' | 'Online Video';
  status: 'upcoming' | 'completed' | 'rescheduled';
  agenda: string;
  keyDiscussionPoints?: string;
  actionItems?: string[];
  followUpDate?: string;
  notes?: string;
}

export interface MentorRecommendation {
  id: string;
  studentId: string;
  studentName: string;
  opportunityId: string;
  opportunityName: string;
  institution: string;
  reason: string;
  recommendedDate: string;
  priority: 'High Priority' | 'Strategic Fit' | 'Good Backup';
  status: 'Reviewing' | 'Accepted' | 'Applied';
}

export interface TeacherClass {
  id: string;
  name: string;
  subject: string;
  batch: string;
  totalStudents: number;
  schedule: string;
  room: string;
  averageAttendance: number;
  averageScore: number;
  activeAssignments: number;
}

export interface StudentAtRisk {
  studentId: string;
  name: string;
  rollNumber: string;
  batch: string;
  attendance: number;
  recentTestScore: number;
  riskFactor: 'Low Attendance' | 'Score Drop' | 'Missing Submissions' | 'Needs Motivation';
  actionTaken: string;
}

export interface NotificationItem {
  id: string;
  role: UserRole | 'all';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'academic' | 'opportunity' | 'deadline' | 'mentor' | 'system';
  link?: string;
}
