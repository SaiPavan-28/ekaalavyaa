import { Application } from '../models/Application';
import { Opportunity } from '../models/SharedStubs';

export const getOpportunities = async (page: number, limit: number) => {
  const skip = (page - 1) * limit;
  const data = await Opportunity.find().skip(skip).limit(limit);
  const total = await Opportunity.countDocuments();
  return { data, total, page, limit };
};

export const getOpportunityById = async (opportunityId: string) => {
  return await Opportunity.findById(opportunityId);
};

// Assuming saved opportunities are stored in the StudentProfile or a separate model
// We will stub this to use Application with a specific status or just return empty for now
export const getSavedOpportunities = async (userId: string) => {
  return [];
};

export const saveOpportunity = async (userId: string, opportunityId: string) => {
  // stub implementation
  return { message: 'Opportunity saved' };
};

export const removeSavedOpportunity = async (userId: string, opportunityId: string) => {
  // stub implementation
  return { message: 'Opportunity removed' };
};

export const getApplications = async (userId: string, page: number, limit: number) => {
  const skip = (page - 1) * limit;
  const data = await Application.find({ studentId: userId }).populate('opportunityId').skip(skip).limit(limit);
  const total = await Application.countDocuments({ studentId: userId });
  return { data, total, page, limit };
};

export const createApplication = async (userId: string, opportunityId: string, status: string) => {
  const existing = await Application.findOne({ studentId: userId, opportunityId });
  if (existing) {
    throw new Error('DUPLICATE_APPLICATION');
  }

  const application = new Application({
    studentId: userId,
    opportunityId,
    status
  });
  return await application.save();
};

export const updateApplication = async (userId: string, applicationId: string, updateData: any) => {
  // ensure student can only update their own application
  return await Application.findOneAndUpdate(
    { _id: applicationId, studentId: userId },
    { $set: updateData },
    { new: true }
  );
};
