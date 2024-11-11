import { GlobalError } from '@api/modules/common/errors/GlobalError';
import { GymsRepository } from '@api/modules/gyms/domain/repositories/GymsRepository';
import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { CreateCheckinUseCase } from '../../application/use-cases/CreateCheckinUseCase';
import { Checkin } from '../../domain/entities/Checkin';
import { CheckinsRepository } from '../../domain/repositories/CheckinsRepository';

describe('CreateCheckinUseCase', () => {
	let checkInsRepository: CheckinsRepository;
	let gymsRepository: GymsRepository;
	let useCase: CreateCheckinUseCase;

	beforeEach(() => {
		checkInsRepository = {
			create: vitest.fn(),
			findByIdAndDate: vitest.fn(),
		};
		gymsRepository = {
			create: vitest.fn(),
			findById: vitest.fn(),
		};
		useCase = new CreateCheckinUseCase(checkInsRepository, gymsRepository);
	});

	it('should create a new checkin', async () => {
		const data = { gymId: 'gym1', userId: 'user1', userLatitude: 0, userLongitude: 0 };
		const mockCheckin = Checkin.create(data);

		vitest.spyOn(useCase, 'execute').mockResolvedValue({ checkin: mockCheckin });

		const result = await useCase.execute(data);

		expect(result).toBeDefined();
		expect(result.checkin).toHaveProperty('gymId', data.gymId);
		expect(result.checkin).toHaveProperty('userId', data.userId);
		expect(result.checkin).toHaveProperty('createdAt');
	});

	it('should throw an error if user is already checked in', async () => {
		const data = { gymId: 'gym1', userId: 'user1', userLatitude: 0, userLongitude: 0 };
		const gym = { id: 'gym1', title: 'Gym 1', latitude: 0, longitude: 0, description: '', phone: '' };
		const mockCheckin = Checkin.create(data);

		vitest.spyOn(gymsRepository, 'findById').mockResolvedValue(gym);
		vitest.spyOn(checkInsRepository, 'findByIdAndDate').mockResolvedValue(mockCheckin);

		await expect(useCase.execute(data)).rejects.toThrowError('User is already checked in');
		await expect(useCase.execute(data)).rejects.toBeInstanceOf(GlobalError);
	});
});
