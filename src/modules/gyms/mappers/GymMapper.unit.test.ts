import { describe, expect, it } from 'vitest';
import { GymMapper } from './GymMapper';

describe('GymMapper', () => {
	it('should map a gym from a data object', () => {
		const gymData = {
			description: 'description',
			latitude: 1,
			longitude: 1,
			phone: 'phone',
			title: 'title',
			id: 'id',
		};

		const gym = GymMapper.toDomain(gymData);

		expect(gym).toEqual({
			description: 'description',
			latitude: 1,
			longitude: 1,
			phone: 'phone',
			title: 'title',
			id: 'id',
		});
	});
});
