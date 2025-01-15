import z from 'zod';

export const createCheckinSchema = z.object({
	userId: z.string().uuid(),
	gymId: z.string().uuid(),
});

export type CreateCheckinDTO = z.infer<typeof createCheckinSchema>;
