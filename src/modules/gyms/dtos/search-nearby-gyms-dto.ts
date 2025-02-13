import z from 'zod';

export const searchNearbyGymsSchema = z.object({
	userLatitude: z.coerce.number().refine(value => Math.abs(value) <= 90, {
		message: 'Latitude must be between -90 and 90',
	}),
	userLongitude: z.coerce.number().refine(value => Math.abs(value) <= 180, {
		message: 'Longitude must be between -180 and 180',
	}),
});

export type SearchNearbyGymsDTO = z.infer<typeof searchNearbyGymsSchema>;
