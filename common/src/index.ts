import { z } from "zod";

export const signupInput = z.object({
    userName: z.string().email(),
    password: z.string().min(6),
    name: z.string().optional()
});

export const signinInput = z.object({
    userName: z.string().email(),
    password: z.string()
});

export const createBlogInput = z.object({
    title: z.string(),
    content: z.string()
});

export const editBlogInput = z.object({
    title: z.string(),
    content: z.string(),
    id: z.number()
});


export type SignupInput = z.infer<typeof signupInput>;
export type SigninInput = z.infer<typeof signinInput>;
export type CreateBlogInput = z.infer<typeof createBlogInput>;
export type EditBlogInput = z.infer<typeof editBlogInput>;




