import z from 'zod';

export const contactSchema = z.object({
  user_name: z.string().transform((val) => val.trim()),
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number')
    .transform((val) => val.trim()),
  note: z.string().transform((val) => val.trim()),
});

export type ContactFormType = z.infer<typeof contactSchema>;
