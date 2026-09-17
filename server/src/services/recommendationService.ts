import { Recommendation } from '../models/Recommendation';
import { Opportunity } from '../models/SharedStubs';
import { checkMenteeAssigned } from './mentorService';

export const createRecommendation = async (mentorId: string, studentId: string, data: any) => {
  await checkMenteeAssigned(mentorId, studentId);

  const opportunity = await Opportunity.findById(data.opportunityId);
  if (!opportunity) throw new Error('NOT_FOUND_OPPORTUNITY');

  try {
    const recommendation = new Recommendation({ ...data, studentId, recommendedBy: mentorId });
    return await recommendation.save();
  } catch (error: any) {
    if (error.code === 11000) {
      throw new Error('DUPLICATE_RECOMMENDATION');
    }
    throw error;
  }
};

export const getRecommendations = async (mentorId: string, studentId: string) => {
  await checkMenteeAssigned(mentorId, studentId);
  return await Recommendation.find({ studentId }).populate('opportunityId', 'title');
};
