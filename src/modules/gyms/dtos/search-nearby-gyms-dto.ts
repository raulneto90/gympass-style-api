import z from 'zod';

export const searchNearbyGymsSchema = z.object({
	userLatitude: z.number(),
	userLongitude: z.number(),
});

export type SearchNearbyGymsDTO = z.infer<typeof searchNearbyGymsSchema>;
