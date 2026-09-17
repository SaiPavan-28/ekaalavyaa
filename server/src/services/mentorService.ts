import { MentorAssignment } from '../models/MentorAssignment';

export const getMentees = async (mentorId: string) => {
  return await MentorAssignment.find({ mentorId, status: 'ACTIVE' }).populate('studentId', 'name email');
};

export const checkMenteeAssigned = async (mentorId: string, studentId: string) => {
  const assignment = await MentorAssignment.findOne({ mentorId, studentId, status: 'ACTIVE' });
  if (!assignment) {
    throw new Error('UNAUTHORIZED_MENTEE');
  }
  return true;
};
