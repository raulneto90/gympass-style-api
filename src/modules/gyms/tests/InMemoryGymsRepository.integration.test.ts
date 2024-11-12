import { beforeEach, describe, expect, it } from 'vitest';
import { Gym } from '../domain/entities/Gym';
import { InMemoryGymsRepository } from '../infraestructure/repositories/InMemoryGymsRepository';

describe('InMemoryGymsRepository', () => {
	let repository: InMemoryGymsRepository;

	beforeEach(() => {
		repository = new InMemoryGymsRepository();
	});

	it('should create a new gym', async () => {
		const gym: Gym = {
			id: '1',
			title: 'Gym A',
			description: null,
			phone: null,
			latitude: 0,
			longitude: 0,
		};
		const createdGym = await repository.create(gym);

		expect(createdGym).toEqual(gym);
	});

	it('should find a gym by id', async () => {
		const gym: Gym = {
			id: '1',
			title: 'Gym A',
			description: null,
			phone: null,
			latitude: 0,
			longitude: 0,
		};
		await repository.create(gym);

		const foundGym = await repository.findById('1');

		expect(foundGym).toEqual(gym);
	});

	it('should return null if gym is not found by id', async () => {
		const foundGym = await repository.findById('non-existing-id');

		expect(foundGym).toBeNull();
	});
});
