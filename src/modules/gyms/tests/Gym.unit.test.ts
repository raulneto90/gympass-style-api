import { beforeEach, describe, expect, it } from 'vitest';
import { Gym } from '../domain/entities/Gym';

describe('Gym Entity', () => {
	let gymParams: {
		title: string;
		description: string | null;
		phone: string | null;
		latitude: number;
		longitude: number;
	};

	beforeEach(() => {
		gymParams = {
			title: 'Test Gym',
			description: 'A gym for testing',
			phone: '1234567890',
			latitude: 40.7128,
			longitude: -74.006,
		};
	});

	it('should create a gym with a provided id', () => {
		const gym = Gym.create({ ...gymParams, id: 'gym-id' });

		expect(gym).toBeDefined();
		expect(gym.id).toBe('gym-id');
		expect(gym.title).toBe(gymParams.title);
		expect(gym.description).toBe(gymParams.description);
		expect(gym.phone).toBe(gymParams.phone);
		expect(gym.latitude).toBe(gymParams.latitude);
		expect(gym.longitude).toBe(gymParams.longitude);
	});

	it('should create a gym with a generated id if not provided', () => {
		const gym = Gym.create(gymParams);

		expect(gym).toBeDefined();
		expect(gym.id).toBeDefined();
		expect(gym.title).toBe(gymParams.title);
		expect(gym.description).toBe(gymParams.description);
		expect(gym.phone).toBe(gymParams.phone);
		expect(gym.latitude).toBe(gymParams.latitude);
		expect(gym.longitude).toBe(gymParams.longitude);
	});

	it('should create a gym with null description and phone', () => {
		const gym = Gym.create({ ...gymParams, description: null, phone: null });

		expect(gym).toBeDefined();
		expect(gym.description).toBeNull();
		expect(gym.phone).toBeNull();
	});
});
