import { z } from 'zod';

export const createMessageSchema = z.object({
  content: z.string().min(1).max(1000),
});

export type CreateMessageDto = z.infer<typeof createMessageSchema>;
