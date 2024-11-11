import { GlobalError } from '@api/modules/common/errors/GlobalError';
import { GymsRepository } from '@api/modules/gyms/domain/repositories/GymsRepository';
import { InMemoryGymsRepository } from '@api/modules/gyms/infraestructure/repositories/InMemoryGymsRepository';
import { afterEach, beforeEach, describe, expect, it, vitest } from 'vitest';
import { CreateCheckinUseCase } from '../../application/use-cases/CreateCheckinUseCase';
import { CheckinsRepository } from '../../domain/repositories/CheckinsRepository';
import { InMemoryCheckinsRepository } from '../../infraestructure/repositories/InMemoryCheckinsRepository';

describe('CreateCheckinUseCase', () => {
	let checkinRepository: CheckinsRepository;
	let gymsRepository: GymsRepository;
	let useCase: CreateCheckinUseCase;

	beforeEach(async () => {
		checkinRepository = new InMemoryCheckinsRepository();
		gymsRepository = new InMemoryGymsRepository();
		useCase = new CreateCheckinUseCase(checkinRepository, gymsRepository);

		await gymsRepository.create({
			id: '1',
			title: 'Gym 1',
			latitude: 0,
			longitude: 0,
			description: '',
			phone: '',
		});

		vitest.useFakeTimers();
	});

	afterEach(() => {
		vitest.useRealTimers();
	});

	it('should create a checkin', async () => {
		const { checkin } = await useCase.execute({
			userId: '1',
			gymId: '1',
			userLatitude: 0,
			userLongitude: 0,
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
			userLatitude: 0,
			userLongitude: 0,
		});

		await expect(
			useCase.execute({
				gymId: '1',
				userId: '1',
				userLatitude: 0,
				userLongitude: 0,
			}),
		).rejects.toThrowError('User is already checked in');
		await expect(
			useCase.execute({
				gymId: '1',
				userId: '1',
				userLatitude: 0,
				userLongitude: 0,
			}),
		).rejects.toBeInstanceOf(GlobalError);
	});
});
