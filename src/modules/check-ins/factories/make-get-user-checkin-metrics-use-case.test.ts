import { describe, expect, it } from 'vitest';
import { GetUserCheckinMetricsUseCase } from '../application/use-cases/get-user-checkin-metric-use-case';
import { makeGetUserCheckinsMetricsUseCase } from './make-get-user-checkin-metric-use-case';

describe('makeGetUserCheckinsMetricsUseCase', () => {
	it('should create an instance of GetUserCheckinMetricsUseCase', () => {
		const useCase = makeGetUserCheckinsMetricsUseCase();
		expect(useCase).toBeInstanceOf(GetUserCheckinMetricsUseCase);
	});
});
