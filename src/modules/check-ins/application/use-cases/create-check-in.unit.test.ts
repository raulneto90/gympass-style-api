import { makeCheckin } from '@src/tests/mocks/checkin';
import { beforeEach, describe, expect, it } from 'vitest';
import { CheckInsRepository } from '../../domain/repositories/check-ins.repository';
import { InMemoryCheckInsRepository } from '../../infraestructure/repositories/in-memory-check-ins.repository';
import { CheckinUseCase } from './create-check-in.usecase';

describe('CreateCheckinUseCase', () => {
	let repository: CheckInsRepository;
	let useCase: CheckinUseCase;

	beforeEach(() => {
		repository = new InMemoryCheckInsRepository();
		useCase = new CheckinUseCase(repository);
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
});
