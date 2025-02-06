import { describe, expect, it } from 'vitest';
import { CreateGymUseCase } from '../application/use-cases/create-gym-use-case';
import { makeCreateGymUseCase } from './make-create-gym-use-case';

describe('makeCreateGymUseCase', () => {
	it('should create an instance of CreateGymUseCase', () => {
		const createGymUseCase = makeCreateGymUseCase();
		expect(createGymUseCase).toBeInstanceOf(CreateGymUseCase);
	});
});
