import { z } from "zod";
export const CreateUserSchema = z.object({
    email: z.string().min(3).max(30),
    password: z.string().min(3),
    name: z.string(),
    photo: z.string().optional(),
});
export const SigninSchema = z.object({
    email: z.string(),
    password: z.string(),
});
export const CreateRoomSchema = z.object({
    name: z.string().min(3),
});
