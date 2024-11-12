import { describe, expect, it } from 'vitest';
import { Gym } from '../domain/entities/Gym';
import { GymsMapper } from '../infraestructure/mappers/GymsMapper';

describe('GymsMapper', () => {
	it('should map GymProps to Gym domain entity', () => {
		const gymProps: Gym = {
			id: '1',
			title: 'Gym A',
			description: null,
			phone: null,
			latitude: 0,
			longitude: 0,
		};

		const gym = GymsMapper.toDomain(gymProps);

		expect(gym).toBeInstanceOf(Gym);
		expect(gym.id).toBe(gymProps.id);
		expect(gym.title).toBe(gymProps.title);
		expect(gym.description).toBe(gymProps.description);
		expect(gym.phone).toBe(gymProps.phone);
		expect(gym.latitude).toBe(gymProps.latitude);
		expect(gym.longitude).toBe(gymProps.longitude);
	});
});
