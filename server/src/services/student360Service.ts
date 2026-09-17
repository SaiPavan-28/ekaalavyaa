import { StudentProfile } from '../models/StudentProfile';
import { Enrollment } from '../models/SharedStubs';
import { Attendance } from '../models/Attendance';
import { AssignmentSubmission } from '../models/AssignmentSubmission';
import { TestAttempt } from '../models/TestAttempt';
import { Application } from '../models/Application';
import { Recommendation } from '../models/Recommendation';
import { MentoringSession } from '../models/MentoringSession';
import { checkMenteeAssigned } from './mentorService';

export const getStudent360Overview = async (mentorId: string, studentId: string) => {
  await checkMenteeAssigned(mentorId, studentId);

  // Fetch all related data in parallel for efficiency
  const [
    profile,
    enrollments,
    attendance,
    assignments,
    tests,
    applications,
    recommendations,
    sessions
  ] = await Promise.all([
    StudentProfile.findOne({ userId: studentId }),
    Enrollment.find({ studentId }).populate('classId', 'name'),
    Attendance.find({ studentId }).populate('classId', 'name'),
    AssignmentSubmission.find({ studentId }).populate('assignmentId', 'title'),
    TestAttempt.find({ studentId }).populate('testId', 'title'),
    Application.find({ studentId }).populate('opportunityId', 'title'),
    Recommendation.find({ studentId }).populate('opportunityId', 'title'),
    MentoringSession.find({ studentId })
  ]);

  // Aggregate basic academic performance (mock aggregation)
  const averageScore = assignments.length > 0 
    ? assignments.reduce((acc, curr) => acc + (curr.marks || 0), 0) / assignments.length 
    : 0;

  return {
    profile,
    academicPerformance: { averageScore },
    attendance,
    courses: enrollments,
    assignments,
    tests,
    applications,
    recommendations,
    sessions
  };
};
