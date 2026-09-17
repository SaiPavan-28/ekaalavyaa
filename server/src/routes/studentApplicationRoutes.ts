import { Router } from 'express';
import * as applicationController from '../controllers/applicationController';

const router = Router();

// Saved Opportunities
router.get('/me/saved-opportunities', applicationController.getSavedOpportunities);
router.post('/me/saved-opportunities/:opportunityId', applicationController.saveOpportunity);
router.delete('/me/saved-opportunities/:opportunityId', applicationController.removeSavedOpportunity);

// Applications
router.get('/me/applications', applicationController.getApplications);
router.post('/me/applications', applicationController.createApplication);
router.patch('/me/applications/:applicationId', applicationController.updateApplication);

export default router;
