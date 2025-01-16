import { makeCheckin } from '@src/tests/mocks/checkin';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { CheckInsRepository } from '../../domain/repositories/check-ins.repository';
import { InMemoryCheckInsRepository } from '../../infraestructure/repositories/in-memory-check-ins.repository';
import { CheckinUseCase } from './create-check-in.usecase';

describe('CreateCheckinUseCase', () => {
	let repository: CheckInsRepository;
	let useCase: CheckinUseCase;

	beforeEach(() => {
		vi.useFakeTimers();
		repository = new InMemoryCheckInsRepository();
		useCase = new CheckinUseCase(repository);
	});

	afterEach(() => {
		vi.useRealTimers();
		vi.resetAllMocks();
	});

	it('should create a check-in', async () => {
		const data = makeCheckin();

		const result = await useCase.execute(data);

		expect(result).toBeDefined();
		expect(result.checkin).toBeDefined();
		expect(result.checkin.id).toBeDefined();
		expect(result.checkin.userId).toBe(data.userId);
		expect(result.checkin.gymId).toBe(data.gymId);
		expect(result.checkin.createdAt).toBeDefined();
	});

	it('should not create a check-in twice in the same day', async () => {
		vi.setSystemTime(new Date('2021-01-01T10:00:00'));
		const data = makeCheckin();

		await useCase.execute(data);

		await expect(useCase.execute(data)).rejects.toBeInstanceOf(Error);
	});

	it('should create a check-in if the user checks in on different days', async () => {
		vi.setSystemTime(new Date(2021, 0, 1, 10, 0, 0));
		const data = makeCheckin();

		await useCase.execute(data);

		vi.setSystemTime(new Date(2021, 0, 2, 10, 0, 0));

		const result = await useCase.execute(data);

		expect(result).toBeDefined();
		expect(result.checkin).toBeDefined();
		expect(result.checkin.id).toBeDefined();
		expect(result.checkin.userId).toBe(data.userId);
		expect(result.checkin.gymId).toBe(data.gymId);
		expect(result.checkin.createdAt).toBeDefined();
	});
});
