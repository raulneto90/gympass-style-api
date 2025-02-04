import { describe, expect, it } from 'vitest';
import { makeCreateCheckinsUseCase } from './make-create-check-ins-use-case';

describe('makeCreateCheckinsUseCase', () => {
	it('should create an instance of CreateCheckinUseCase', () => {
		const useCase = makeCreateCheckinsUseCase();
		expect(useCase).toBeTruthy();
	});
});
