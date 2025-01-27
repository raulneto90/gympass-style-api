import { makeGym } from '@src/tests/mocks/gyms';
import { beforeEach, describe, expect, it } from 'vitest';
import { GymsRepository } from '../../domain/repositories/gyms.repository';
import { InMemoryGymsRepository } from '../../infraestructure/repositories/in-memory-gyms.repository';
import { CreateGymUseCase } from './create-gym-use-case';

describe('CreateGymUseCase', () => {
	let repository: GymsRepository;
	let useCase: CreateGymUseCase;

	beforeEach(() => {
		repository = new InMemoryGymsRepository();
		useCase = new CreateGymUseCase(repository);
	});

	it('should create a gym', async () => {
		const gymData = makeGym();
		await expect(useCase.execute(gymData)).resolves.toBeUndefined();
	});
});
