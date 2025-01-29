import { makeGym } from '@src/tests/mocks/gyms';
import { beforeEach, describe, expect, it } from 'vitest';
import { GymsRepository } from '../../domain/repositories/gyms.repository';
import { InMemoryGymsRepository } from '../../infraestructure/repositories/in-memory-gyms.repository';
import { SearchNearbyGymsUseCase } from './search-nearby-gyms-use-case';

describe('SearchNearbyGymsUseCase', () => {
	let useCase: SearchNearbyGymsUseCase;
	let repository: GymsRepository;

	beforeEach(() => {
		repository = new InMemoryGymsRepository();
		useCase = new SearchNearbyGymsUseCase(repository);
	});

	it('should return nearby gyms', async () => {
		await repository.create(makeGym({ title: 'Jungle Gym' }));
		await repository.create(makeGym({ title: 'City Gym' }));
		await repository.create(
			makeGym({ title: 'Beach Gym', latitude: 0, longitude: 0 }),
		);

		const result = await useCase.execute({
			userLatitude: -23.5505199,
			userLongitude: -46.6333094,
		});

		expect(result).toBeDefined();
		expect(result).toHaveLength(2);
		expect(result[0].title).toBe('Jungle Gym');
		expect(result[1].title).toBe('City Gym');
	});
});
