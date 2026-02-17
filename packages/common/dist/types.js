import { z } from "zod";
export const CreateUserSchema = z.object({
    username: z.string().min(3).max(30),
    password: z.string().min(3),
    firstname: z.string(),
    lastname: z.string(),
});
export const SigninSchema = z.object({
    username: z.string(),
    password: z.string(),
});
export const CreateRoomSchema = z.object({
    name: z.string().min(3),
});
