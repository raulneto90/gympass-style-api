import z from 'zod';

export const createGymSchema = z.object({
	title: z.string().min(3).max(100),
	phone: z.string().min(10).max(10),
	description: z.string().min(10).max(255),
	latitude: z.coerce.number(),
	longitude: z.coerce.number(),
});

export type CreateGymDTO = z.infer<typeof createGymSchema>;
