import z from 'zod';

export const getUserCheckinMetricsSchema = z.object({
	userId: z.string().uuid(),
});

export type GetUserCheckinMetricsDTO = z.infer<
	typeof getUserCheckinMetricsSchema
>;
