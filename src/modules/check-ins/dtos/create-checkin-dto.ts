import z from 'zod';

export const createCheckinSchema = z.object({
	userId: z.string().uuid(),
	gymId: z.string().uuid(),
	latitude: z.number(),
	longitude: z.number(),
});

export type CreateCheckinDTO = z.infer<typeof createCheckinSchema>;
