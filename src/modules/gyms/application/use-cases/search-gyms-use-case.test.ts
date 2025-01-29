import { makeGym } from '@src/tests/mocks/gyms';
import { beforeEach, describe, expect, it } from 'vitest';
import { GymsRepository } from '../../domain/repositories/gyms.repository';
import { InMemoryGymsRepository } from '../../infraestructure/repositories/in-memory-gyms.repository';
import { SearchGymsUseCase } from './search-gyms-use-case';

describe('SearchGymsUseCase', () => {
	let useCase: SearchGymsUseCase;
	let repository: GymsRepository;

	beforeEach(() => {
		repository = new InMemoryGymsRepository();
		useCase = new SearchGymsUseCase(repository);
	});

	it('should return all gyms by title', async () => {
		await repository.create(makeGym({ title: 'Jungle Gym' }));
		await repository.create(makeGym({ title: 'City Gym' }));

		const result = await useCase.execute({ title: 'Jungle', page: 1 });

		expect(result).toBeDefined();
		expect(result).toHaveLength(1);
		expect(result[0].title).toBe('Jungle Gym');
	});

	it('should return all gyms searched by page', async () => {
		for (let i = 1; i <= 22; i++) {
			await repository.create(makeGym({ title: `Gym ${i}` }));
		}

		const result = await useCase.execute({ title: 'Gym', page: 2 });

		expect(result).toBeDefined();
		expect(result).toHaveLength(2);
		expect(result[0].title).toBe('Gym 21');
		expect(result[1].title).toBe('Gym 22');
	});
});
