import { Router } from 'express';
import * as sessionController from '../controllers/sessionController';

const router = Router();

router.post('/sessions', sessionController.createSession);
router.get('/sessions', sessionController.getSessions);
router.get('/sessions/:sessionId', sessionController.getSessionById);
router.patch('/sessions/:sessionId', sessionController.updateSession);

export default router;
