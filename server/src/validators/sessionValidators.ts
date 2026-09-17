import { z } from 'zod';
import mongoose from 'mongoose';

const objectIdSchema = z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
  message: 'Invalid ObjectId',
});

export const createSessionSchema = z.object({
  body: z.object({
    studentId: objectIdSchema,
    scheduledAt: z.string().datetime(),
    agenda: z.string().min(1),
  }),
});

export const updateSessionSchema = z.object({
  params: z.object({
    sessionId: objectIdSchema,
  }),
  body: z.object({
    agenda: z.string().optional(),
    notes: z.string().optional(),
    nextAction: z.string().optional(),
    status: z.enum(['SCHEDULED', 'COMPLETED', 'CANCELLED']).optional(),
  }),
});
