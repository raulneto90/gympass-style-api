import { makeCheckin } from '@src/tests/mocks/checkin';
import { beforeEach, describe, expect, it } from 'vitest';
import { CheckInsRepository } from '../../domain/repositories/check-ins.repository';
import { InMemoryCheckInsRepository } from '../../infraestructure/repositories/in-memory-check-ins.repository';
import { GetUserCheckinMetricsUseCase } from './get-user-checkin-metric-use-case';

describe('GetUserCheckinMetricsUseCase', () => {
	let useCase: GetUserCheckinMetricsUseCase;
	let repository: CheckInsRepository;

	beforeEach(() => {
		repository = new InMemoryCheckInsRepository();
		useCase = new GetUserCheckinMetricsUseCase(repository);
	});

	it('should return the user checkin metrics', async () => {
		await repository.create(makeCheckin({ userId: '1' }));
		await repository.create(makeCheckin({ userId: '1' }));
		await repository.create(makeCheckin({ userId: '1' }));

		const metrics = await useCase.execute({ userId: '1' });

		expect(metrics).toBeDefined();
		expect(metrics).toEqual(3);
	});
});
