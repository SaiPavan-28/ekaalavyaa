import { Router } from 'express';
import * as applicationController from '../controllers/applicationController';

const router = Router();

// Opportunities
router.get('/', applicationController.getOpportunities);
router.get('/:opportunityId', applicationController.getOpportunityById);

export default router;
