import { Router } from 'express';
import * as recommendationController from '../controllers/recommendationController';

const router = Router();

router.post('/students/:studentId/recommendations', recommendationController.createRecommendation);
router.get('/students/:studentId/recommendations', recommendationController.getRecommendations);

export default router;
