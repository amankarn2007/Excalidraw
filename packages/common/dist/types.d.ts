import { z } from "zod";
export declare const CreateUserSchema: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
    firstname: z.ZodString;
    lastname: z.ZodString;
}, z.core.$strip>;
export declare const SigninSchema: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export declare const CreateRoomSchema: z.ZodObject<{
    name: z.ZodString;
}, z.core.$strip>;
//# sourceMappingURL=types.d.ts.map