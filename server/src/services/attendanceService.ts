import { Attendance } from '../models/Attendance';
import { Enrollment, Class } from '../models/SharedStubs';

export const markAttendance = async (teacherId: string, classId: string, date: string, records: any[]) => {
  // Check if teacher owns the class
  const classDoc = await Class.findOne({ _id: classId, teacherId });
  if (!classDoc) {
    throw new Error('UNAUTHORIZED_CLASS');
  }

  // Use bulk operations to create or update attendance
  const bulkOps = records.map((record: any) => ({
    updateOne: {
      filter: { studentId: record.studentId, classId, date },
      update: { $set: { status: record.status, markedBy: teacherId } },
      upsert: true,
    }
  }));

  const result = await Attendance.bulkWrite(bulkOps);
  return result;
};

export const getAttendance = async (teacherId: string, classId: string) => {
  const classDoc = await Class.findOne({ _id: classId, teacherId });
  if (!classDoc) {
    throw new Error('UNAUTHORIZED_CLASS');
  }
  return await Attendance.find({ classId }).populate('studentId', 'name');
};

export const updateAttendanceRecord = async (teacherId: string, attendanceId: string, status: string) => {
  const record = await Attendance.findById(attendanceId);
  if (!record) throw new Error('NOT_FOUND');

  // Verify ownership
  const classDoc = await Class.findOne({ _id: record.classId, teacherId });
  if (!classDoc) throw new Error('UNAUTHORIZED_CLASS');

  record.status = status as any;
  record.markedBy = teacherId as any;
  return await record.save();
};
