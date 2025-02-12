import z from 'zod';

export const createCheckinSchema = z.object({
	latitude: z.number(),
	longitude: z.number(),
});

export const createCheckinParamsSchema = z.object({
	gymId: z.string().uuid(),
});

export type CreateCheckinDTO = z.infer<typeof createCheckinSchema> &
	z.infer<typeof createCheckinParamsSchema> & { userId: string };
