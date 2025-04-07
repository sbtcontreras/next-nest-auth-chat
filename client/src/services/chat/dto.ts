import { z } from "zod";
import { JWTPayload } from "../auth/dto";

export const updateProfileSchema = z.object({
  nickname: z
    .string()
    .min(2, { message: "El apodo debe tener al menos 2 caracteres" }),
});

export type UpdateProfileDTO = z.infer<typeof updateProfileSchema>;

export type ChatMessage = {
  id: string;
  user: {
    id: string;
    nickname: string;
  };
  content: string;
  createdAt: string;
};

export type ChatUser = JWTPayload;
