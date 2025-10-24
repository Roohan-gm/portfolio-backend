import { z } from 'zod';
export declare const contactSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodEmail;
    subject: z.ZodString;
    message: z.ZodString;
}, z.core.$strip>;
export type ContactInput = z.infer<typeof contactSchema>;
