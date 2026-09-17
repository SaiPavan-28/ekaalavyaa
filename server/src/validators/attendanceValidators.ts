import { z } from 'zod';
import mongoose from 'mongoose';

const objectIdSchema = z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
  message: 'Invalid ObjectId',
});

export const markAttendanceSchema = z.object({
  params: z.object({
    classId: objectIdSchema,
  }),
  body: z.object({
    date: z.string().datetime(),
    records: z.array(
      z.object({
        studentId: objectIdSchema,
        status: z.enum(['PRESENT', 'ABSENT', 'LATE']),
      })
    ).min(1),
  }),
});

export const updateAttendanceSchema = z.object({
  params: z.object({
    attendanceId: objectIdSchema,
  }),
  body: z.object({
    status: z.enum(['PRESENT', 'ABSENT', 'LATE']),
  }),
});
