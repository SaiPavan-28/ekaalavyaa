import { Router } from 'express';
import * as adminController from '../controllers/adminController';
import { authorize } from '../middlewares/authMiddleware';

const router = Router();
router.use(authorize('ADMIN'));

// Users
router.get('/users', adminController.getUsers);
router.get('/users/:userId', adminController.getUserById);
router.patch('/users/:userId/status', adminController.updateUserStatus);

// Courses
router.post('/courses', adminController.createCourse);
router.get('/courses', adminController.getCourses);
router.get('/courses/:courseId', adminController.getCourseById);
router.patch('/courses/:courseId', adminController.updateCourse);
router.delete('/courses/:courseId', adminController.deleteCourse);

// Classes
router.post('/classes', adminController.createClass);
router.get('/classes', adminController.getClasses);
router.get('/classes/:classId', adminController.getClassById);
router.patch('/classes/:classId', adminController.updateClass);
router.patch('/classes/:classId/teacher', adminController.assignTeacher);
router.post('/classes/:classId/students', adminController.enrollStudents);

// Universities
router.post('/universities', adminController.createUniversity);
router.get('/universities', adminController.getUniversities);
router.patch('/universities/:universityId', adminController.updateUniversity);
router.delete('/universities/:universityId', adminController.deleteUniversity);

// Opportunities
router.post('/opportunities', adminController.createOpportunity);
router.get('/opportunities', adminController.getOpportunities);
router.patch('/opportunities/:opportunityId', adminController.updateOpportunity);
router.delete('/opportunities/:opportunityId', adminController.deleteOpportunity);

// Mentor Assignment
router.post('/students/:studentId/mentor', adminController.assignMentor);

export default router;
