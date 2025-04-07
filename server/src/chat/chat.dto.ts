import { z } from 'zod';

export const updateProfileSchema = z.object({
  nickname: z
    .string()
    .min(2, { message: 'El apodo debe tener al menos 2 caracteres' }),
});

export type UpdateProfileDTO = z.infer<typeof updateProfileSchema>;
