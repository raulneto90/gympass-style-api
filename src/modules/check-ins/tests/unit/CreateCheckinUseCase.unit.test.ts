import { GlobalError } from '@api/modules/common/errors/GlobalError';
import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { CreateCheckinUseCase } from '../../application/use-cases/CreateCheckinUseCase';
import { Checkin } from '../../domain/entities/Checkin';
import { CheckinsRepository } from '../../domain/repositories/CheckinsRepository';

describe('CreateCheckinUseCase', () => {
	let repository: CheckinsRepository;
	let useCase: CreateCheckinUseCase;

	beforeEach(() => {
		repository = {
			create: vitest.fn(),
			findByIdAndDate: vitest.fn(),
		};
		useCase = new CreateCheckinUseCase(repository);
	});

	it('should create a new checkin', async () => {
		const data = { gymId: 'gym1', userId: 'user1' };
		const mockCheckin = Checkin.create(data);

		vitest.spyOn(useCase, 'execute').mockResolvedValue({ checkin: mockCheckin });

		const result = await useCase.execute(data);

		expect(result).toBeDefined();
		expect(result.checkin).toHaveProperty('gymId', data.gymId);
		expect(result.checkin).toHaveProperty('userId', data.userId);
		expect(result.checkin).toHaveProperty('createdAt');
	});

	it('should throw an error if user is already checked in', async () => {
		const data = { gymId: 'gym1', userId: 'user1' };
		const mockCheckin = Checkin.create(data);

		vitest.spyOn(repository, 'findByIdAndDate').mockResolvedValue(mockCheckin);

		await expect(useCase.execute(data)).rejects.toThrowError('User is already checked in');
		await expect(useCase.execute(data)).rejects.toBeInstanceOf(GlobalError);
	});
});
