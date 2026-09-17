import { Router } from 'express';
import * as mentorController from '../controllers/mentorController';

const router = Router();

router.get('/me/mentees', mentorController.getMentees);
router.get('/mentees/:studentId', mentorController.getMenteeProfile);

import * as student360Controller from '../controllers/student360Controller';
router.get('/mentees/:studentId/overview', student360Controller.getOverview);

import * as mentorApplicationController from '../controllers/mentorApplicationController';
router.get('/students/:studentId/applications', mentorApplicationController.getStudentApplications);
router.patch('/applications/:applicationId', mentorApplicationController.updateApplicationStatus);

export default router;
