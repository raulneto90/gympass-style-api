import z from 'zod';

const profileSchema = z.object({
	id: z.string(),
});

export type ProfileDTO = z.infer<typeof profileSchema>;
