import { UsersRepository } from '@api/modules/users/domain/repositories/UsersRepository';
import { InMemoryUsersRepository } from '@api/modules/users/infraestructure/repositories/InMemoryUsersRepository';

import { InvalidCredentialsError } from '@api/modules/common/errors/InvalidCredentialsError';
import { PasswordEncryptor } from '@api/modules/users/infraestructure/adapters/PasswordEncryptor';
import { makeUser } from '@api/modules/users/tests/fixtures/user';
import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { CreateAuthenticationUseCase } from '../../application/use-cases/CreateAuthenticationUseCase';

describe('CreateAuthenticationUseCase', () => {
	let useCase: CreateAuthenticationUseCase;
	let repository: UsersRepository;

	beforeEach(() => {
		repository = new InMemoryUsersRepository();
		useCase = new CreateAuthenticationUseCase(repository);
	});

	it('should create a new authentication', async () => {
		const user = await repository.create({
			email: 'email',
			password: PasswordEncryptor.encrypt('password'),
			name: 'name',
		});

		const response = await useCase.execute({
			email: user.email,
			password: 'password',
		});

		expect(response).toBeDefined();
		expect(response).toHaveProperty('user');
		expect(response.user).toHaveProperty('email', user.email);
		expect(response.user).toHaveProperty('name', user.name);
	});

	it('should throw an error when the user does not exist', async () => {
		expect(useCase.execute({ email: 'email', password: 'password' })).rejects.toBeInstanceOf(InvalidCredentialsError);
		expect(useCase.execute({ email: 'email', password: 'password' })).rejects.toThrowError('Invalid credentials');
	});

	it('should throw an error when the password is incorrect', async () => {
		const user = await repository.create({
			email: 'email',
			password: PasswordEncryptor.encrypt('password'),
			name: 'name',
		});

		expect(useCase.execute({ email: user.email, password: 'wrong-password' })).rejects.toBeInstanceOf(
			InvalidCredentialsError,
		);
		expect(useCase.execute({ email: user.email, password: 'wrong-password' })).rejects.toThrowError(
			'Invalid credentials',
		);
	});
});
