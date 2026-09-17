import { Router } from 'express';
import * as attendanceController from '../controllers/attendanceController';

const router = Router();

router.post('/classes/:classId/attendance', attendanceController.markAttendance);
router.get('/classes/:classId/attendance', attendanceController.getAttendance);
router.patch('/attendance/:attendanceId', attendanceController.updateAttendance);

export default router;
