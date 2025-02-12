import z from 'zod';

export const getCheckinHistorySchema = z.object({
	page: z.number().default(1),
});

export type GetCheckinHistoryDTO = z.infer<typeof getCheckinHistorySchema> & {
	userId: string;
};
