import { beforeEach, describe, expect, it } from 'vitest';
import { GetUserMetrics } from '../application/use-cases/GetUserMetrics';
import { CheckinsRepository } from '../domain/repositories/CheckinsRepository';
import { InMemoryCheckinsRepository } from '../infraestructure/repositories/InMemoryCheckinsRepository';

describe('GetUserMetrics', () => {
	let useCase: GetUserMetrics;
	let repository: CheckinsRepository;

	beforeEach(() => {
		repository = new InMemoryCheckinsRepository();
		useCase = new GetUserMetrics(repository);
	});

	it('should return the total number of check-ins for a user', async () => {
		const userId = 'user-id';
		await repository.create({ userId, gymId: 'gym-id' });
		await repository.create({ userId, gymId: 'gym-id' });

		const response = await useCase.execute({ userId });

		expect(response).toBeDefined();
		expect(response).toHaveProperty('totalCheckins', 2);
	});

	it('should return zero if the user has no check-ins', async () => {
		const userId = 'user-id';

		const response = await useCase.execute({ userId });

		expect(response).toBeDefined();
		expect(response).toHaveProperty('totalCheckins', 0);
	});
});
