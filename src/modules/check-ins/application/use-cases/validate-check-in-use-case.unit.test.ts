import { CheckInAlreadyExpiredError } from '@src/modules/common/errors/check-in-already-expired-error';
import { EntityNotFoundError } from '@src/modules/common/errors/entity-not-found.error';
import { makeCheckin } from '@src/tests/mocks/checkin';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { CheckInsRepository } from '../../domain/repositories/check-ins.repository';
import { InMemoryCheckInsRepository } from '../../infraestructure/repositories/in-memory-check-ins.repository';
import { ValidateCheckinUseCase } from './validate-check-in-use-case';

describe('ValidateCheckInUseCase', () => {
	let useCase: ValidateCheckinUseCase;
	let repository: CheckInsRepository;

	beforeEach(() => {
		repository = new InMemoryCheckInsRepository();
		useCase = new ValidateCheckinUseCase(repository);

		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it('should validate a check-in', async () => {
		const checkin = await repository.create(makeCheckin());

		await expect(
			useCase.execute({ checkinId: checkin.id }),
		).resolves.toBeUndefined();
	});

	it('should throw an error if check-in is not found', async () => {
		await expect(
			useCase.execute({ checkinId: 'invalid-id' }),
		).rejects.toThrowError('CheckIn not found');
		await expect(
			useCase.execute({ checkinId: 'invalid-id' }),
		).rejects.toBeInstanceOf(EntityNotFoundError);
	});

	it('should throw an error if check-in is validated after 20 minutes of its creation', async () => {
		vi.setSystemTime(new Date(2024, 0, 1, 12, 0, 0));

		const checkin = await repository.create(makeCheckin());

		const twentyMinutesInMillis = 1000 * 60 * 21;

		vi.advanceTimersByTime(twentyMinutesInMillis);

		await expect(
			useCase.execute({ checkinId: checkin.id }),
		).rejects.toThrowError('CheckIn already expired');
		await expect(
			useCase.execute({ checkinId: checkin.id }),
		).rejects.toBeInstanceOf(CheckInAlreadyExpiredError);
	});
});
