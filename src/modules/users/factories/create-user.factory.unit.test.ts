import { describe, expect, it } from 'vitest';
import { CreateUserUseCase } from '../application/use-cases/create-user-use-case';
import { makeCreateUserUseCase } from './create-user.factory';

describe('makeCreateUserUseCase Factory', () => {
	it('should create an instance of CreateUserUseCase', () => {
		const useCase = makeCreateUserUseCase();

		expect(useCase).toBeInstanceOf(CreateUserUseCase);
	});
});
