import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';

// Layouts
import { AuthLayout } from './layouts/AuthLayout';
import { DashboardLayout } from './layouts/DashboardLayout';

// Auth Pages
import { RoleSelectionPage } from './pages/auth/RoleSelectionPage';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';

// Student Pages
import { StudentDashboard } from './pages/student/StudentDashboard';
import { StudentProfile } from './pages/student/StudentProfile';
import { StudentCourses } from './pages/student/StudentCourses';
import { StudentAttendance } from './pages/student/StudentAttendance';
import { StudentAssignments } from './pages/student/StudentAssignments';
import { StudentTests } from './pages/student/StudentTests';
import { StudentResults } from './pages/student/StudentResults';
import { StudentOpportunities } from './pages/student/StudentOpportunities';
import { StudentApplications } from './pages/student/StudentApplications';
import { StudentNotifications } from './pages/student/StudentNotifications';

// Teacher Pages
import { TeacherDashboard } from './pages/teacher/TeacherDashboard';
import { TeacherClasses } from './pages/teacher/TeacherClasses';
import { TeacherStudents } from './pages/teacher/TeacherStudents';
import { TeacherAttendance } from './pages/teacher/TeacherAttendance';
import { TeacherAssignments } from './pages/teacher/TeacherAssignments';
import { TeacherTests } from './pages/teacher/TeacherTests';
import { TeacherAnalytics } from './pages/teacher/TeacherAnalytics';
import { TeacherNotifications } from './pages/teacher/TeacherNotifications';

// Mentor Pages
import { MentorDashboard } from './pages/mentor/MentorDashboard';
import { MentorMentees } from './pages/mentor/MentorMentees';
import { MentorSessions } from './pages/mentor/MentorSessions';
import { MentorApplications } from './pages/mentor/MentorApplications';
import { MentorRecommendations } from './pages/mentor/MentorRecommendations';
import { MentorNotifications } from './pages/mentor/MentorNotifications';

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminCenters } from './pages/admin/AdminCenters';
import { AdminUsers } from './pages/admin/AdminUsers';
import { AdminCohorts } from './pages/admin/AdminCohorts';
import { AdminAnalytics } from './pages/admin/AdminAnalytics';
import { AdminAnnouncements } from './pages/admin/AdminAnnouncements';
import { AdminSettings } from './pages/admin/AdminSettings';
import { AdminNotifications } from './pages/admin/AdminNotifications';

/** Root Route Resolver: sends authenticated users to their dashboard, otherwise role selection */
const RootRedirect: React.FC = () => {
  const { currentUser, isAuthenticated } = useAuth();
  if (isAuthenticated && currentUser) {
    return <Navigate to={`/${currentUser.role}/dashboard`} replace />;
  }
  return <Navigate to="/role-selection" replace />;
};

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <Routes>
            {/* Root Route */}
            <Route path="/" element={<RootRedirect />} />

            {/* Authentication Flow (using AuthLayout) */}
            <Route element={<AuthLayout />}>
              <Route path="/role-selection" element={<RoleSelectionPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            </Route>

            {/* Authenticated Application Shell (using DashboardLayout) */}
            <Route element={<DashboardLayout />}>
              {/* Student Routes */}
              <Route path="/student/dashboard" element={<StudentDashboard />} />
              <Route path="/student/profile" element={<StudentProfile />} />
              <Route path="/student/courses" element={<StudentCourses />} />
              <Route path="/student/attendance" element={<StudentAttendance />} />
              <Route path="/student/assignments" element={<StudentAssignments />} />
              <Route path="/student/tests" element={<StudentTests />} />
              <Route path="/student/results" element={<StudentResults />} />
              <Route path="/student/opportunities" element={<StudentOpportunities />} />
              <Route path="/student/applications" element={<StudentApplications />} />
              <Route path="/student/notifications" element={<StudentNotifications />} />

              {/* Teacher Routes */}
              <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
              <Route path="/teacher/classes" element={<TeacherClasses />} />
              <Route path="/teacher/students" element={<TeacherStudents />} />
              <Route path="/teacher/attendance" element={<TeacherAttendance />} />
              <Route path="/teacher/assignments" element={<TeacherAssignments />} />
              <Route path="/teacher/tests" element={<TeacherTests />} />
              <Route path="/teacher/analytics" element={<TeacherAnalytics />} />
              <Route path="/teacher/notifications" element={<TeacherNotifications />} />

              {/* Mentor Routes */}
              <Route path="/mentor/dashboard" element={<MentorDashboard />} />
              <Route path="/mentor/mentees" element={<MentorMentees />} />
              <Route path="/mentor/sessions" element={<MentorSessions />} />
              <Route path="/mentor/applications" element={<MentorApplications />} />
              <Route path="/mentor/recommendations" element={<MentorRecommendations />} />
              <Route path="/mentor/notifications" element={<MentorNotifications />} />

              {/* Admin Routes */}
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/centers" element={<AdminCenters />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/cohorts" element={<AdminCohorts />} />
              <Route path="/admin/analytics" element={<AdminAnalytics />} />
              <Route path="/admin/announcements" element={<AdminAnnouncements />} />
              <Route path="/admin/settings" element={<AdminSettings />} />
              <Route path="/admin/notifications" element={<AdminNotifications />} />
            </Route>

            {/* Catch-all fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}
