import express from 'express';
import cors from 'cors';
import { authenticate } from './middlewares/authMiddleware';
import { errorHandler } from './middlewares/errorHandler';

import studentRoutes from './routes/studentRoutes';
import opportunityRoutes from './routes/opportunityRoutes';
import studentApplicationRoutes from './routes/studentApplicationRoutes';

import teacherRoutes from './routes/teacherRoutes';
import attendanceRoutes from './routes/attendanceRoutes';
import assignmentRoutes from './routes/assignmentRoutes';
import testRoutes from './routes/testRoutes';

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

// Centralized error handler
app.use(errorHandler);

export default app;
