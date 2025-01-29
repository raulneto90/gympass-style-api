import z from 'zod';

export const searchGymsSchema = z.object({
	title: z.string(),
	page: z.number().default(1),
});

export type SearchGymsDTO = z.infer<typeof searchGymsSchema>;
