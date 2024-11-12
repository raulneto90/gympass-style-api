import { beforeEach, describe, expect, it } from 'vitest';
import { CreateGymUseCase } from '../application/use-cases/CreateGymUseCase';
import { Gym } from '../domain/entities/Gym';
import { GymsRepository } from '../domain/repositories/GymsRepository';
import { InMemoryGymsRepository } from '../infraestructure/repositories/InMemoryGymsRepository';

describe('CreateGymUseCase', () => {
	let useCase: CreateGymUseCase;
	let repository: GymsRepository;

	beforeEach(() => {
		repository = new InMemoryGymsRepository();
		useCase = new CreateGymUseCase(repository);
	});

	it('should create a new gym', async () => {
		const params = {
			title: 'Gym Title',
			description: 'Gym Description',
			phone: '123456789',
			latitude: 40.7128,
			longitude: -74.006,
		};

		const gym = await useCase.execute(params);

		expect(gym).toBeDefined();
		expect(gym).toBeInstanceOf(Gym);
		expect(gym).toHaveProperty('title', params.title);
		expect(gym).toHaveProperty('description', params.description);
		expect(gym).toHaveProperty('phone', params.phone);
		expect(gym).toHaveProperty('latitude', params.latitude);
		expect(gym).toHaveProperty('longitude', params.longitude);
	});
});
