import { Router } from 'express';
import * as studentController from '../controllers/studentController';
import * as submissionController from '../controllers/submissionController';
import * as testController from '../controllers/testController';

const router = Router();

// Profile
router.get('/me', studentController.getMe);
router.get('/me/profile', studentController.getProfile);
router.put('/me/profile', studentController.updateProfile);

// Courses
router.get('/me/courses', studentController.getCourses);
router.get('/me/progress', studentController.getProgress);

// Assignments
router.get('/me/assignments', submissionController.getAssignments);
router.get('/assignments/:assignmentId', submissionController.getAssignmentById);
router.post('/assignments/:assignmentId/submit', submissionController.submitAssignment);

// Tests
router.get('/me/tests', testController.getTests);
router.get('/tests/:testId', testController.getTestById);
router.post('/tests/:testId/submit', testController.submitTest);
router.get('/me/results', testController.getResults);

// Notifications
router.get('/me/notifications', studentController.getNotifications);

export default router;
