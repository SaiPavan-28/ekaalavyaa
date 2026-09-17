import { Router } from 'express';
import * as teacherController from '../controllers/teacherController';

const router = Router();

router.get('/me/classes', teacherController.getClasses);
router.get('/classes/:classId', teacherController.getClassById);
router.get('/classes/:classId/students', teacherController.getClassStudents);
router.get('/students/:studentId', teacherController.getStudent);

import * as teacherAnalyticsController from '../controllers/teacherAnalyticsController';
router.get('/classes/:classId/analytics', teacherAnalyticsController.getClassAnalytics);
router.get('/students/:studentId/performance', teacherAnalyticsController.getStudentPerformance);

export default router;
