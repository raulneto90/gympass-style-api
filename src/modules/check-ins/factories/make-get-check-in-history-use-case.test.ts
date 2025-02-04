import { describe, expect, it } from 'vitest';
import { GetCheckInHistoryUseCase } from '../application/use-cases/get-check-in-history-use-case';
import { makeGetCheckinHistoryUseCase } from './make-get-check-in-history-use-case';

describe('makeGetCheckinHistoryUseCase', () => {
	it('should create an instance of GetCheckInHistoryUseCase', () => {
		const useCase = makeGetCheckinHistoryUseCase();
		expect(useCase).toBeInstanceOf(GetCheckInHistoryUseCase);
	});
});
