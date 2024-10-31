import { GlobalError } from '@api/modules/common/errors/GlobalError';
import { afterEach, beforeEach, describe, expect, it, vitest } from 'vitest';
import { CreateCheckinUseCase } from '../../application/use-cases/CreateCheckinUseCase';
import { CheckinsRepository } from '../../domain/repositories/CheckinsRepository';
import { InMemoryCheckinsRepository } from '../../infraestructure/repositories/InMemoryCheckinsRepository';

describe('CreateCheckinUseCase', () => {
	let checkinRepository: CheckinsRepository;
	let useCase: CreateCheckinUseCase;

	beforeEach(() => {
		checkinRepository = new InMemoryCheckinsRepository();
		useCase = new CreateCheckinUseCase(checkinRepository);

		vitest.useFakeTimers();
	});

	afterEach(() => {
		vitest.useRealTimers();
	});

	it('should create a checkin', async () => {
		const { checkin } = await useCase.execute({
			userId: '1',
			gymId: '1',
		});

		expect(checkin).toBeDefined();
		expect(checkin).toHaveProperty('id');
		expect(checkin.userId).toBe('1');
		expect(checkin.gymId).toBe('1');
	});

	it('should not create a checkin if the user is already checked in', async () => {
		vitest.setSystemTime(new Date(2024, 0, 20, 8, 0, 0));

		await useCase.execute({
			userId: '1',
			gymId: '1',
		});

		await expect(useCase.execute({ gymId: '1', userId: '1' })).rejects.toThrowError('User is already checked in');
		await expect(useCase.execute({ gymId: '1', userId: '1' })).rejects.toBeInstanceOf(GlobalError);
	});
});
