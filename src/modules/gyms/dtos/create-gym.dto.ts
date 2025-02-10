import z from 'zod';

export const createGymSchema = z.object({
	title: z.string().min(3).max(100),
	phone: z.string().min(10).max(10),
	description: z.string().min(10).max(255),
	latitude: z.coerce.number().refine(value => {
		return Math.abs(value) <= 90;
	}),
	longitude: z.coerce.number().refine(value => {
		return Math.abs(value) <= 180;
	}),
});

export type CreateGymDTO = z.infer<typeof createGymSchema>;
