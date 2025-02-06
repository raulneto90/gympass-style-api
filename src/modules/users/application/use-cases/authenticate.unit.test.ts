import { InvalidCredentialsError } from '@src/modules/common/errors/invalid-credentials.error';
import { makeUser } from '@src/tests/mocks/user';
import { beforeEach, describe, expect, it } from 'vitest';
import { UsersRepository } from '../../domain/repositories/users.repository';
import { PasswordHash } from '../../domain/services/password-hash';
import { InMemoryUsersRepository } from '../../infraestructure/repositories/in-memory-users.repository';
import { BcryptPasswordHash } from '../../infraestructure/services/bcrypt-password-hash';
import { AuthenticateUseCase } from './authenticate.usecase';

describe('AuthenticateUseCase', () => {
	let passwordHash: PasswordHash;
	let repository: UsersRepository;
	let useCase: AuthenticateUseCase;

	beforeEach(() => {
		repository = new InMemoryUsersRepository();
		passwordHash = new BcryptPasswordHash();
		useCase = new AuthenticateUseCase(repository, passwordHash);
	});

	it('should authenticate a user', async () => {
		const user = await repository.create(
			makeUser({ password: passwordHash.hash('password') }),
		);

		const result = await useCase.execute({
			email: user.email,
			password: 'password',
		});

		expect(result).toBeDefined();
		expect(result).toHaveProperty('user');
		expect(result.user.email).toBe(user.email);
	});

	it('should throw an error if the user does not exist', async () => {
		await expect(
			useCase.execute({
				email: 'some-email@example.com',
				password: 'password',
			}),
		).rejects.toBeInstanceOf(InvalidCredentialsError);
	});

	it('should throw an error if user password does not match', async () => {
		const user = await repository.create(makeUser());

		await expect(
			useCase.execute({
				email: user.email,
				password: 'wrong-password',
			}),
		).rejects.toBeInstanceOf(InvalidCredentialsError);
	});
});
