import express from 'express';
import cors from 'cors';
import { authenticate, authorize } from './middlewares/authMiddleware';
import { errorHandler } from './middlewares/errorHandler';

import studentRoutes from './routes/studentRoutes';
import opportunityRoutes from './routes/opportunityRoutes';
import studentApplicationRoutes from './routes/studentApplicationRoutes';

import teacherRoutes from './routes/teacherRoutes';
import attendanceRoutes from './routes/attendanceRoutes';
import assignmentRoutes from './routes/assignmentRoutes';
import testRoutes from './routes/testRoutes';

import mentorRoutes from './routes/mentorRoutes';
import sessionRoutes from './routes/sessionRoutes';
import recommendationRoutes from './routes/recommendationRoutes';

import authRoutes from './routes/authRoutes';
import adminRoutes from './routes/adminRoutes';
import * as adminAnalyticsController from './controllers/adminAnalyticsController';

const app = express();

app.use(cors());
app.use(express.json());

// Routes
// Note: authentication middleware should be applied where necessary
app.use('/api/students', authenticate, studentRoutes);
app.use('/api/students', authenticate, studentApplicationRoutes);
app.use('/api/opportunities', authenticate, opportunityRoutes);

app.use('/api/teachers', authenticate, teacherRoutes);
app.use('/api/teachers', authenticate, attendanceRoutes);
app.use('/api/teachers', authenticate, assignmentRoutes);
app.use('/api/teachers', authenticate, testRoutes);

app.use('/api/mentors', authenticate, mentorRoutes);
app.use('/api/mentors', authenticate, sessionRoutes);
app.use('/api/mentors', authenticate, recommendationRoutes);

app.use('/api/auth', authRoutes);
app.use('/api/admin', authenticate, adminRoutes);

// Admin analytics routes inline to save files
app.get('/api/admin/analytics/overview', authenticate, authorize('ADMIN'), adminAnalyticsController.getOverview);
app.get('/api/admin/analytics/students', authenticate, authorize('ADMIN'), adminAnalyticsController.getStudentsAnalytics);
app.get('/api/admin/analytics/attendance', authenticate, authorize('ADMIN'), adminAnalyticsController.getAttendanceAnalytics);
app.get('/api/admin/analytics/applications', authenticate, authorize('ADMIN'), adminAnalyticsController.getApplicationsAnalytics);
app.get('/api/admin/analytics/universities', authenticate, authorize('ADMIN'), adminAnalyticsController.getUniversitiesAnalytics);

// Centralized error handler
app.use(errorHandler);

export default app;
