import z from 'zod';

export const contactSchema = z.object({
  user_name: z
    .string()
    .min(3, 'Username is too short')
    .transform((val) => val.trim()),
  email: z.email('Invalid email').transform((val) => val.trim()),
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number')
    .transform((val) => val.trim()),
  note: z
    .string()
    .min(1, 'Note cannot be blank')
    .transform((val) => val.trim()),
});

export type ContactMessageInput = z.infer<typeof contactSchema>;
