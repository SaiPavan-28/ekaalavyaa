import { Router } from 'express';
import * as assignmentController from '../controllers/assignmentController';

const router = Router();

router.post('/classes/:classId/assignments', assignmentController.createAssignment);
router.get('/classes/:classId/assignments', assignmentController.getAssignments);
router.get('/assignments/:assignmentId/submissions', assignmentController.getSubmissions);
router.post('/submissions/:submissionId/grade', assignmentController.gradeSubmission);

export default router;
