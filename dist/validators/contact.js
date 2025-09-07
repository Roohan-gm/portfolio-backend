import { z } from 'zod';
export const contactSchema = z.object({
    name: z.string().min(1, 'Name is required').max(100),
    email: z.email('Invalid email'),
    subject: z.string().min(1).max(200),
    message: z.string().min(1).max(2000)
});
//# sourceMappingURL=contact.js.map