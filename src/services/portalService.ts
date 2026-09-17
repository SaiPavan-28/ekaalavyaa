import {
  Opportunity,
  ApplicationRecord,
  OpportunityStage,
  Course,
  Assignment,
  TestItem,
  AttendanceRecord,
  MentoringSession,
  MentorRecommendation,
  TeacherClass,
  StudentProfileData,
  NotificationItem,
} from '../types';
import {
  INITIAL_OPPORTUNITIES,
  INITIAL_APPLICATIONS,
  INITIAL_COURSES,
  INITIAL_ASSIGNMENTS,
  INITIAL_TESTS,
  INITIAL_ATTENDANCE,
  INITIAL_MENTORING_SESSIONS,
  INITIAL_MENTOR_RECOMMENDATIONS,
  INITIAL_STUDENT_PROFILE,
  TEACHER_CLASSES,
  ALL_STUDENTS_LIST,
  STUDENTS_REQUIRING_ATTENTION,
  INITIAL_NOTIFICATIONS,
  ADMIN_SYSTEM_METRICS,
} from '../data/mockData';

function loadOrInit<T>(key: string, initial: T): T {
  try {
    const item = localStorage.getItem(key);
    if (item) {
      return JSON.parse(item);
    }
  } catch {
    // fallback
  }
  localStorage.setItem(key, JSON.stringify(initial));
  return initial;
}

function save<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {
    // ignore
  }
}

export const portalService = {
  // Opportunities
  getOpportunities(): Opportunity[] {
    return loadOrInit('ekalavya_opportunities', INITIAL_OPPORTUNITIES);
  },

  getOpportunityById(id: string): Opportunity | undefined {
    return this.getOpportunities().find((o) => o.id === id);
  },

  // Applications
  getApplications(): ApplicationRecord[] {
    return loadOrInit('ekalavya_applications', INITIAL_APPLICATIONS);
  },

  updateApplicationStage(id: string, stage: OpportunityStage): ApplicationRecord[] {
    const list = this.getApplications();
    const updated = list.map((app) =>
      app.id === id
        ? {
            ...app,
            stage,
            updatedAt: new Date().toISOString().split('T')[0],
            submittedDate: stage === 'applied' && !app.submittedDate ? new Date().toISOString().split('T')[0] : app.submittedDate,
          }
        : app
    );
    save('ekalavya_applications', updated);
    return updated;
  },

  toggleApplicationChecklist(appId: string, taskId: string): ApplicationRecord[] {
    const list = this.getApplications();
    const updated = list.map((app) => {
      if (app.id !== appId) return app;
      const updatedChecklist = app.checklist.map((c) =>
        c.id === taskId ? { ...c, done: !c.done } : c
      );
      return { ...app, checklist: updatedChecklist };
    });
    save('ekalavya_applications', updated);
    return updated;
  },

  addApplicationFromOpportunity(opp: Opportunity): ApplicationRecord {
    const list = this.getApplications();
    const existing = list.find((a) => a.opportunityId === opp.id);
    if (existing) return existing;

    const newApp: ApplicationRecord = {
      id: `app-${Date.now()}`,
      opportunityId: opp.id,
      opportunityName: opp.name,
      institution: opp.institution,
      type: opp.type,
      stage: 'interested',
      updatedAt: new Date().toISOString().split('T')[0],
      deadline: opp.deadline,
      notes: 'Added from Opportunity discovery gallery.',
      checklist: [
        { id: `c-${Date.now()}-1`, task: 'Review detailed eligibility requirements', done: true },
        { id: `c-${Date.now()}-2`, task: 'Discuss strategy with assigned mentor', done: false },
        { id: `c-${Date.now()}-3`, task: 'Gather academic transcripts and certificates', done: false },
        { id: `c-${Date.now()}-4`, task: 'Draft personal statement / SOP', done: false },
        { id: `c-${Date.now()}-5`, task: 'Submit official online application', done: false },
      ],
    };
    const updated = [newApp, ...list];
    save('ekalavya_applications', updated);
    return newApp;
  },

  // Courses
  getCourses(): Course[] {
    return loadOrInit('ekalavya_courses', INITIAL_COURSES);
  },

  // Student Profile
  getStudentProfile(): StudentProfileData {
    return loadOrInit('ekalavya_student_profile', INITIAL_STUDENT_PROFILE);
  },

  updateStudentProfile(profile: Partial<StudentProfileData>): StudentProfileData {
    const current = this.getStudentProfile();
    const updated = { ...current, ...profile };
    save('ekalavya_student_profile', updated);
    return updated;
  },

  // Attendance
  getAttendanceRecords(): AttendanceRecord[] {
    return loadOrInit('ekalavya_attendance', INITIAL_ATTENDANCE);
  },

  markAttendance(record: Omit<AttendanceRecord, 'id'>): AttendanceRecord[] {
    const list = this.getAttendanceRecords();
    const newRecord: AttendanceRecord = {
      id: `att-${Date.now()}`,
      ...record,
    };
    const updated = [newRecord, ...list];
    save('ekalavya_attendance', updated);
    return updated;
  },

  // Assignments
  getAssignments(): Assignment[] {
    return loadOrInit('ekalavya_assignments', INITIAL_ASSIGNMENTS);
  },

  submitAssignment(id: string, notes?: string): Assignment[] {
    const list = this.getAssignments();
    const updated = list.map((a) =>
      a.id === id
        ? {
            ...a,
            status: 'submitted' as const,
            submissionDate: new Date().toISOString().split('T')[0],
            feedback: notes || 'Submitted successfully for faculty evaluation.',
          }
        : a
    );
    save('ekalavya_assignments', updated);
    return updated;
  },

  // Tests & Results
  getTests(): TestItem[] {
    return loadOrInit('ekalavya_tests', INITIAL_TESTS);
  },

  // Mentoring Sessions
  getMentoringSessions(): MentoringSession[] {
    return loadOrInit('ekalavya_mentoring_sessions', INITIAL_MENTORING_SESSIONS);
  },

  scheduleMentoringSession(session: Omit<MentoringSession, 'id'>): MentoringSession[] {
    const list = this.getMentoringSessions();
    const newSession: MentoringSession = {
      id: `ses-${Date.now()}`,
      ...session,
    };
    const updated = [newSession, ...list];
    save('ekalavya_mentoring_sessions', updated);
    return updated;
  },

  // Mentor Recommendations
  getRecommendations(): MentorRecommendation[] {
    return loadOrInit('ekalavya_recommendations', INITIAL_MENTOR_RECOMMENDATIONS);
  },

  addRecommendation(rec: Omit<MentorRecommendation, 'id'>): MentorRecommendation[] {
    const list = this.getRecommendations();
    const newRec: MentorRecommendation = {
      id: `rec-${Date.now()}`,
      ...rec,
    };
    const updated = [newRec, ...list];
    save('ekalavya_recommendations', updated);
    return updated;
  },

  // Teacher Classes
  getTeacherClasses(): TeacherClass[] {
    return loadOrInit('ekalavya_teacher_classes', TEACHER_CLASSES);
  },

  // Students List
  getAllStudents() {
    return loadOrInit('ekalavya_all_students', ALL_STUDENTS_LIST);
  },

  getStudentsRequiringAttention() {
    return loadOrInit('ekalavya_students_attention', STUDENTS_REQUIRING_ATTENTION);
  },

  // Notifications
  getNotifications(): NotificationItem[] {
    return loadOrInit('ekalavya_notifications', INITIAL_NOTIFICATIONS);
  },

  markNotificationAsRead(id: string): NotificationItem[] {
    const list = this.getNotifications();
    const updated = list.map((n) => (n.id === id ? { ...n, read: true } : n));
    save('ekalavya_notifications', updated);
    return updated;
  },

  updateApplicationMentorNotes(id: string, notes: string): ApplicationRecord[] {
    const list = this.getApplications();
    const updated = list.map((app) =>
      app.id === id ? { ...app, assignedMentorNotes: notes } : app
    );
    save('ekalavya_applications', updated);
    return updated;
  },

  // Admin Metrics
  getAdminMetrics() {
    return ADMIN_SYSTEM_METRICS;
  },

  getAdminStats() {
    return {
      totalCenters: 6,
      totalStudents: 840,
      totalFaculty: 48,
      totalMentors: 32,
      collegeAcceptanceRate: 91.2,
      attendanceRate: 92.4,
      testPassRate: 88.5,
    };
  },

  getLearningCenters(): import('../types').LearningCenter[] {
    const defaultCenters: import('../types').LearningCenter[] = [
      {
        id: 'center-1',
        name: 'Ranchi Residential Science & Math Academy',
        district: 'Ranchi',
        state: 'Jharkhand',
        coordinator: 'Subhashish Mahato',
        contactEmail: 'ranchi@ekalavya.org',
        contactPhone: '+91 94311 02841',
        studentCount: 180,
        capacity: 200,
        attendanceRate: 94.2,
        performanceScore: 88.6,
        status: 'active',
        facilities: ['Smart Classrooms', 'Olympiad Lab', 'Residential Dorms', 'High-Speed LAN'],
      },
      {
        id: 'center-2',
        name: 'Bhubaneswar Central STEM Preparatory Hub',
        district: 'Khurda',
        state: 'Odisha',
        coordinator: 'Dr. Mamata Tripathy',
        contactEmail: 'bhubaneswar@ekalavya.org',
        contactPhone: '+91 98610 55219',
        studentCount: 160,
        capacity: 180,
        attendanceRate: 93.1,
        performanceScore: 86.4,
        status: 'active',
        facilities: ['Physics Mechanics Lab', 'Computer Terminal', 'Auditorium'],
      },
      {
        id: 'center-3',
        name: 'Dumka Tribal Scholar Excellence Center',
        district: 'Dumka',
        state: 'Jharkhand',
        coordinator: 'Babulal Soren',
        contactEmail: 'dumka@ekalavya.org',
        contactPhone: '+91 97714 83920',
        studentCount: 140,
        capacity: 150,
        attendanceRate: 91.5,
        performanceScore: 83.2,
        status: 'active',
        facilities: ['Science Discovery Lab', 'Residential Wings', 'Library'],
      },
      {
        id: 'center-4',
        name: 'Mayurbhanj Indigenous Youth Learning Hub',
        district: 'Mayurbhanj',
        state: 'Odisha',
        coordinator: 'Hemant Majhi',
        contactEmail: 'mayurbhanj@ekalavya.org',
        contactPhone: '+91 94372 10934',
        studentCount: 120,
        capacity: 140,
        attendanceRate: 89.8,
        performanceScore: 81.0,
        status: 'active',
        facilities: ['Language Lab', 'Astronomy Club', 'Hostel'],
      },
      {
        id: 'center-5',
        name: 'Khunti Birsa Munda Advanced Study Center',
        district: 'Khunti',
        state: 'Jharkhand',
        coordinator: 'Silvester Munda',
        contactEmail: 'khunti@ekalavya.org',
        contactPhone: '+91 94301 77234',
        studentCount: 110,
        capacity: 130,
        attendanceRate: 88.4,
        performanceScore: 79.5,
        status: 'active',
        facilities: ['Makerspace', 'Biology Greenhouses', 'Digital Classrooms'],
      },
      {
        id: 'center-6',
        name: 'Hazaribagh Plateau Regional Learning Hub',
        district: 'Hazaribagh',
        state: 'Jharkhand',
        coordinator: 'Geeta Kumari',
        contactEmail: 'hazaribagh@ekalavya.org',
        contactPhone: '+91 98351 44102',
        studentCount: 130,
        capacity: 150,
        attendanceRate: 92.7,
        performanceScore: 85.3,
        status: 'active',
        facilities: ['Mathematics Discovery Room', 'Seminar Hall'],
      },
    ];
    return loadOrInit('ekalavya_centers', defaultCenters);
  },

  getAnnouncements(): import('../types').Announcement[] {
    const defaultAnnouncements: import('../types').Announcement[] = [
      {
        id: 'ann-1',
        title: 'Schedule for All-India Grand Mock Test 4 Dispatched',
        content: 'The 4th full syllabus diagnostic examination for Grade 12 STEM cohorts is scheduled for next Saturday. All center coordinators must confirm network connectivity.',
        targetRole: 'all',
        priority: 'urgent',
        author: 'State Academic Council',
        date: '2026-09-16',
      },
      {
        id: 'ann-2',
        title: 'Ashoka University Need-Based Fellowship Window Open',
        content: 'Scholars aspiring for liberal arts, economics, and pure mathematics can now submit their draft Statements of Purpose for mentor review.',
        targetRole: 'student',
        priority: 'normal',
        author: 'Higher Ed Advisory Cell',
        date: '2026-09-14',
      },
      {
        id: 'ann-3',
        title: 'Quarterly Teacher Continuous Professional Development (CPD)',
        content: 'Advanced pedagogical workshops in multivariable calculus and organic synthesis pedagogy will be held online on September 28.',
        targetRole: 'teacher',
        priority: 'normal',
        author: 'Teacher Training Division',
        date: '2026-09-12',
      },
    ];
    return loadOrInit('ekalavya_announcements', defaultAnnouncements);
  },

  createAnnouncement(ann: Omit<import('../types').Announcement, 'id' | 'date'>): import('../types').Announcement {
    const list = this.getAnnouncements();
    const newAnn: import('../types').Announcement = {
      id: `ann-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      ...ann,
    };
    const updated = [newAnn, ...list];
    save('ekalavya_announcements', updated);
    return newAnn;
  },

  getMentees(): StudentProfileData[] {
    const defaultMentees: StudentProfileData[] = [
      INITIAL_STUDENT_PROFILE,
      {
        id: 'user-stu-2',
        name: 'Priya Hansda',
        email: 'priya.hansda@ekalavya.org',
        role: 'student',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
        phone: '+91 98765 43211',
        center: 'Bhubaneswar Central STEM Preparatory Hub',
        joinedDate: 'July 2024',
        rollNumber: 'EF-2026-JH-029',
        gradeLevel: 'Grade 12 (Economics & Math)',
        stream: 'Humanities & Applied Math',
        targetMajor: 'B.A. (Hons.) Economics',
        academicPerformanceScore: 91.2,
        attendancePercentage: 96.0,
        assignedMentor: 'Prof. Rajeshwari Sen',
        mentorContact: 'sen.rajeshwari@ekalavya.org',
        guardianName: 'Chunaram Hansda',
        guardianContact: '+91 97711 00234',
        dreamInstitutions: ['Ashoka University', 'Delhi School of Economics', 'Azim Premji University'],
        achievements: ['Regional Economics Olympiad Top 5', 'District Debate Winner'],
        nativeDistrict: 'Mayurbhanj, Odisha',
      },
      {
        id: 'user-stu-3',
        name: 'Kunal Soren',
        email: 'kunal.soren@ekalavya.org',
        role: 'student',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
        phone: '+91 98765 43212',
        center: 'Dumka Tribal Scholar Excellence Center',
        joinedDate: 'July 2024',
        rollNumber: 'EF-2026-OD-088',
        gradeLevel: 'Grade 12 (Pure Sciences)',
        stream: 'Biology & Chemistry Focus',
        targetMajor: 'B.Sc. Life Sciences',
        academicPerformanceScore: 84.6,
        attendancePercentage: 89.5,
        assignedMentor: 'Prof. Rajeshwari Sen',
        mentorContact: 'sen.rajeshwari@ekalavya.org',
        guardianName: 'Mangal Soren',
        guardianContact: '+91 94311 99887',
        dreamInstitutions: ['Azim Premji University', 'Central University of Jharkhand'],
        achievements: ['State Biology Talent Scholar'],
        nativeDistrict: 'Dumka, Jharkhand',
      },
    ];
    return loadOrInit('ekalavya_mentees', defaultMentees);
  },

  createMentoringSession(session: any): MentoringSession {
    const list = this.getMentoringSessions();
    const newSession: MentoringSession = {
      id: `ses-${Date.now()}`,
      mentorId: 'user-mentor-1',
      studentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      ...session,
    };
    const updated = [newSession, ...list];
    save('ekalavya_mentoring_sessions', updated);
    return newSession;
  },

  completeMentoringSession(id: string, notes?: string): MentoringSession[] {
    const list = this.getMentoringSessions();
    const updated = list.map((s) =>
      s.id === id
        ? {
            ...s,
            status: 'completed' as const,
            notes: notes || 'Session conducted successfully.',
          }
        : s
    );
    save('ekalavya_mentoring_sessions', updated);
    return updated;
  },

  createAssignment(assignment: Omit<Assignment, 'id'>): Assignment {
    const list = this.getAssignments();
    const newAssignment: Assignment = {
      id: `asg-${Date.now()}`,
      ...assignment,
    };
    const updated = [newAssignment, ...list];
    save('ekalavya_assignments', updated);
    return newAssignment;
  },

  getUsers(): import('../types').User[] {
    const defaultUsers: import('../types').User[] = [
      {
        id: 'user-stu-1',
        name: 'Arjun Das',
        email: 'arjun.das@ekalavya.org',
        role: 'student',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        phone: '+91 98765 43210',
        center: 'Ranchi Residential Science & Math Academy',
        joinedDate: 'July 2024',
      },
      {
        id: 'user-tea-1',
        name: 'Dr. Debabrata Banerjee',
        email: 'debabrata.banerjee@ekalavya.org',
        role: 'teacher',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
        phone: '+91 98310 99421',
        center: 'Ranchi Residential Science & Math Academy',
        joinedDate: 'August 2021',
      },
      {
        id: 'user-men-1',
        name: 'Prof. Rajeshwari Sen',
        email: 'sen.rajeshwari@ekalavya.org',
        role: 'mentor',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
        phone: '+91 98101 44520',
        center: 'Directorate Advisory Cell',
        joinedDate: 'January 2022',
      },
      {
        id: 'user-adm-1',
        name: 'Siddhartha Roy',
        email: 'director@ekalavya.org',
        role: 'admin',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        phone: '+91 94310 00100',
        center: 'Foundation Directorate HQ',
        joinedDate: 'June 2020',
      },
      {
        id: 'user-stu-2',
        name: 'Priya Hansda',
        email: 'priya.hansda@ekalavya.org',
        role: 'student',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
        phone: '+91 98765 43211',
        center: 'Bhubaneswar Central STEM Preparatory Hub',
        joinedDate: 'July 2024',
      },
      {
        id: 'user-tea-2',
        name: 'Sunita Sharma',
        email: 'sunita.sharma@ekalavya.org',
        role: 'teacher',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
        phone: '+91 94301 22890',
        center: 'Bhubaneswar Central STEM Preparatory Hub',
        joinedDate: 'May 2022',
      },
    ];
    return loadOrInit('ekalavya_users', defaultUsers);
  },

  resetAllMockData(): void {
    const keys = [
      'ekalavya_opportunities',
      'ekalavya_applications',
      'ekalavya_courses',
      'ekalavya_student_profile',
      'ekalavya_attendance',
      'ekalavya_assignments',
      'ekalavya_tests',
      'ekalavya_mentoring_sessions',
      'ekalavya_recommendations',
      'ekalavya_teacher_classes',
      'ekalavya_all_students',
      'ekalavya_students_attention',
      'ekalavya_notifications',
      'ekalavya_centers',
      'ekalavya_announcements',
      'ekalavya_mentees',
      'ekalavya_users',
    ];
    keys.forEach((k) => localStorage.removeItem(k));
  },
};
