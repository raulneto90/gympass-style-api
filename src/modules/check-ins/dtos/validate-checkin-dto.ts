import z from 'zod';

export const validateCheckinParamsSchema = z.object({
	checkinId: z.string().uuid(),
});

export type ValidateCheckinDTO = z.infer<typeof validateCheckinParamsSchema>;
