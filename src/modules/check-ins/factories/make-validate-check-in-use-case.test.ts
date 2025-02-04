import { describe, expect, it } from 'vitest';
import { ValidateCheckinUseCase } from '../application/use-cases/validate-check-in-use-case';
import { makeValidateCheckInUseCase } from './make-validate-check-in-use-case';

describe('makeValidateCheckInUseCase', () => {
	it('should create an instance of ValidateCheckinUseCase', () => {
		const useCase = makeValidateCheckInUseCase();
		expect(useCase).toBeInstanceOf(ValidateCheckinUseCase);
	});
});
