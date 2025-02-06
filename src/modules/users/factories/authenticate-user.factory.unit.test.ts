import { describe, expect, it } from 'vitest';
import { AuthenticateUseCase } from '../application/use-cases/authenticate-use-case';
import { makeAuthenticateUserUseCase } from './authenticate-user.factory';

describe('makeAuthenticateUserUseCase Factory', () => {
	it('should create an instance of AuthenticateUseCase', () => {
		const useCase = makeAuthenticateUserUseCase();

		expect(useCase).toBeInstanceOf(AuthenticateUseCase);
	});
});
