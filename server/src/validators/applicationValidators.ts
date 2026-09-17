import { z } from 'zod';
import mongoose from 'mongoose';

const objectIdSchema = z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
  message: 'Invalid ObjectId',
});

export const createApplicationSchema = z.object({
  body: z.object({
    opportunityId: objectIdSchema,
    status: z.enum(['INTERESTED']).default('INTERESTED'),
  }),
});

export const updateApplicationSchema = z.object({
  params: z.object({
    applicationId: objectIdSchema,
  }),
  body: z.object({
    status: z.enum(['INTERESTED', 'PREPARING', 'APPLIED', 'OFFER_RECEIVED', 'NOT_SELECTED']).optional(),
    notes: z.string().optional(),
  }),
});
