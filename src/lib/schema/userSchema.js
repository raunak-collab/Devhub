import z from "zod";

export const loginSchema = z.object({
    email: z.email('Invalid email address'),
    password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, 'Enter at least 8 characters with uppercase, lowercase and a number')
})

export const registerSchema = loginSchema.extend({
    name: z.string().min(4, 'Name should be at least 4 characters').max(100, 'Name should be max at 100 characters')
})