import { makeCheckin } from '@src/tests/mocks/checkin';
import { beforeEach, describe, expect, it } from 'vitest';
import { CheckInsRepository } from '../../domain/repositories/check-ins.repository';
import { InMemoryCheckInsRepository } from '../../infraestructure/repositories/in-memory-check-ins.repository';
import { GetCheckInHistoryUseCase } from './get-check-in-history-use-case';

describe('GetCheckInUseCase', () => {
	let useCase: GetCheckInHistoryUseCase;
	let repository: CheckInsRepository;

	beforeEach(() => {
		repository = new InMemoryCheckInsRepository();
		useCase = new GetCheckInHistoryUseCase(repository);
	});

	it('should return the check-in history filtered by user', async () => {
		const checkIn = await repository.create(makeCheckin());

		const result = await useCase.execute({ userId: checkIn.userId, page: 1 });

		expect(result).toBeDefined();
		expect(result).toHaveLength(1);
		expect(result).toEqual([checkIn]);
	});

	it('should return an empty array if no check-ins are found', async () => {
		const result = await useCase.execute({
			userId: 'non-existing-user',
			page: 1,
		});

		expect(result).toBeDefined();
		expect(result).toHaveLength(0);
	});

	it('should be able to return check-ins history paginated', async () => {
		for (let i = 1; i <= 22; i++) {
			await repository.create(
				makeCheckin({ gymId: `gym-${i}`, userId: 'user-1' }),
			);
		}

		const result = await useCase.execute({ userId: 'user-1', page: 2 });

		expect(result).toBeDefined();
		expect(result).toHaveLength(2);
	});
});
