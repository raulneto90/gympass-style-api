import z from 'zod';

export const getCheckinHistorySchema = z.object({
	userId: z.string().uuid(),
	page: z.number().default(1),
});

export type GetCheckinHistoryDTO = z.infer<typeof getCheckinHistorySchema>;
