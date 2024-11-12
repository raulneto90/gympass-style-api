import { describe, expect, it } from 'vitest';
import { GetDistanceBetweenCordinatesService } from '../../application/services/GetDistanceBetweenCordinatesService';

describe('GetDistanceBetweenCordinatesService', () => {
	it('should return 0 if coordinates are the same', () => {
		const from = { latitude: 0, longitude: 0 };
		const to = { latitude: 0, longitude: 0 };

		const distance = GetDistanceBetweenCordinatesService.execute(from, to);

		expect(distance).toBe(0);
	});

	it('should calculate the distance between two coordinates correctly', () => {
		const from = { latitude: 34.0522, longitude: -118.2437 }; // Los Angeles
		const to = { latitude: 36.1699, longitude: -115.1398 }; // Las Vegas

		const distance = GetDistanceBetweenCordinatesService.execute(from, to);

		expect(distance).toBeCloseTo(367.6, 1); // Approximate distance in km
	});
});
