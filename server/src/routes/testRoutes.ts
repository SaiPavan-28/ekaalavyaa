import { Router } from 'express';
import * as testController from '../controllers/testController';

const router = Router();

router.post('/courses/:courseId/tests', testController.createTeacherTest);
router.get('/courses/:courseId/tests', testController.getTeacherTests);
router.get('/tests/:testId/submissions', testController.getTeacherTestSubmissions);

export default router;
