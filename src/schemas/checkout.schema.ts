import z from 'zod';

export const checkoutSchema = z.object({
  id: z.uuid(),
  user_id: z.string().transform((val) => val.trim()),
  user_name: z
    .string()
    .min(3, 'Username is too short')
    .transform((val) => val.trim()),
  email: z.email('Invalid email').transform((val) => val.trim()),
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number')
    .transform((val) => val.trim()),
  address: z
    .string()
    .min(1, 'Address is required')
    .transform((val) => val.trim()),
  note: z.string().transform((val) => val.trim()),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;
