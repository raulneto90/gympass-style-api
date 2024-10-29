import z from 'zod';

export const createUserAuthenticationValidation = z.object({
	email: z.string().email(),
	password: z.string().min(6),
});
