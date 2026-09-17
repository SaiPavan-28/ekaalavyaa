import { MentoringSession } from '../models/MentoringSession';
import { checkMenteeAssigned } from './mentorService';

export const createSession = async (mentorId: string, data: any) => {
  await checkMenteeAssigned(mentorId, data.studentId);
  const session = new MentoringSession({ ...data, mentorId });
  return await session.save();
};

export const getSessions = async (mentorId: string) => {
  return await MentoringSession.find({ mentorId }).populate('studentId', 'name email');
};

export const getSessionById = async (mentorId: string, sessionId: string) => {
  const session = await MentoringSession.findOne({ _id: sessionId, mentorId });
  if (!session) throw new Error('NOT_FOUND_OR_UNAUTHORIZED');
  return session;
};

export const updateSession = async (mentorId: string, sessionId: string, updateData: any) => {
  const session = await MentoringSession.findOneAndUpdate(
    { _id: sessionId, mentorId },
    { $set: updateData },
    { new: true }
  );
  if (!session) throw new Error('NOT_FOUND_OR_UNAUTHORIZED');
  return session;
};
