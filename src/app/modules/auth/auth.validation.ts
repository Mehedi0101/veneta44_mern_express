import { z } from 'zod';

const loginValidationSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
});

const registerValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    phone: z.string(),
    organizationId: z.string(),
    organizationType: z.enum(['venue', 'supplier']),
  }),
});

export const AuthValidation = {
  loginValidationSchema,
  registerValidationSchema,
};
