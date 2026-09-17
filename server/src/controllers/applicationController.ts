import { Response } from 'express';
import { AuthRequest } from '../middlewares/authMiddleware';
import { sendSuccess, sendError } from '../utils/response';
import * as applicationService from '../services/applicationService';

export const getOpportunities = async (req: AuthRequest, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const result = await applicationService.getOpportunities(page, limit);
    return sendSuccess(res, result);
  } catch (error) {
    return sendError(res, 'INTERNAL_ERROR', 'An error occurred', 500);
  }
};

export const getOpportunityById = async (req: AuthRequest, res: Response) => {
  try {
    const { opportunityId } = req.params;
    const opportunity = await applicationService.getOpportunityById(opportunityId);
    if (!opportunity) {
      return sendError(res, 'NOT_FOUND', 'Opportunity not found', 404);
    }
    return sendSuccess(res, opportunity);
  } catch (error) {
    return sendError(res, 'INTERNAL_ERROR', 'An error occurred', 500);
  }
};

export const getSavedOpportunities = async (req: AuthRequest, res: Response) => {
  try {
    const saved = await applicationService.getSavedOpportunities(req.user!.userId);
    return sendSuccess(res, saved);
  } catch (error) {
    return sendError(res, 'INTERNAL_ERROR', 'An error occurred', 500);
  }
};

export const saveOpportunity = async (req: AuthRequest, res: Response) => {
  try {
    const { opportunityId } = req.params;
    const result = await applicationService.saveOpportunity(req.user!.userId, opportunityId);
    return sendSuccess(res, result, 201);
  } catch (error) {
    return sendError(res, 'INTERNAL_ERROR', 'An error occurred', 500);
  }
};

export const removeSavedOpportunity = async (req: AuthRequest, res: Response) => {
  try {
    const { opportunityId } = req.params;
    await applicationService.removeSavedOpportunity(req.user!.userId, opportunityId);
    return sendSuccess(res, { success: true });
  } catch (error) {
    return sendError(res, 'INTERNAL_ERROR', 'An error occurred', 500);
  }
};

export const getApplications = async (req: AuthRequest, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const applications = await applicationService.getApplications(req.user!.userId, page, limit);
    return sendSuccess(res, applications);
  } catch (error) {
    return sendError(res, 'INTERNAL_ERROR', 'An error occurred', 500);
  }
};

export const createApplication = async (req: AuthRequest, res: Response) => {
  try {
    const { opportunityId, status } = req.body;
    const application = await applicationService.createApplication(req.user!.userId, opportunityId, status);
    
    // Formatting response based on APPLICATION CONTRACT
    const formattedData = {
      id: application._id,
      opportunityId: application.opportunityId,
      status: application.status,
      createdAt: application.createdAt
    };
    
    return sendSuccess(res, formattedData, 201);
  } catch (error: any) {
    if (error.message === 'DUPLICATE_APPLICATION') {
      return sendError(res, 'CONFLICT', 'Application already exists for this opportunity', 409);
    }
    return sendError(res, 'INTERNAL_ERROR', 'An error occurred', 500);
  }
};

export const updateApplication = async (req: AuthRequest, res: Response) => {
  try {
    const { applicationId } = req.params;
    const application = await applicationService.updateApplication(req.user!.userId, applicationId, req.body);
    
    if (!application) {
      return sendError(res, 'NOT_FOUND', 'Application not found', 404);
    }
    return sendSuccess(res, application);
  } catch (error) {
    return sendError(res, 'INTERNAL_ERROR', 'An error occurred', 500);
  }
};
