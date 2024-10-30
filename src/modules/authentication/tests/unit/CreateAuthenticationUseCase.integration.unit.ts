import { UsersRepository } from '@api/modules/users/domain/repositories/UsersRepository';
import { InMemoryUsersRepository } from '@api/modules/users/infraestructure/repositories/InMemoryUsersRepository';

import { PasswordEncryptor } from '@api/modules/users/infraestructure/adapters/PasswordEncryptor';
import { makeUser } from '@api/modules/users/tests/fixtures/user';
import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { AuthenticateUseCase } from '../../application/use-cases/AuthenticateUseCase';

describe('CreateAuthenticationUseCase', () => {
	let useCase: AuthenticateUseCase;
	let repository: UsersRepository;

	beforeEach(() => {
		repository = new InMemoryUsersRepository();
		useCase = new AuthenticateUseCase(repository);
	});

	it('should create a new authentication', async () => {
		const user = makeUser();

		vitest.spyOn(useCase, 'execute');
		vitest.spyOn(repository, 'findByEmail').mockResolvedValue(user);
		vitest.spyOn(PasswordEncryptor, 'compare').mockResolvedValue(true);

		const response = await useCase.execute({
			email: user.email,
			password: user.password,
		});

		expect(useCase.execute).toHaveBeenCalledWith({
			email: user.email,
			password: user.password,
		});
		expect(response).toBeDefined();
		expect(response).toHaveProperty('user');
		expect(response.user).toHaveProperty('id');
		expect(response.user).toHaveProperty('email', user.email);
		expect(response).toHaveProperty('name', user.name);
	});

	it('should throw an error when the user does not exist', async () => {
		const user = makeUser();

		vitest.spyOn(useCase, 'execute');
		vitest.spyOn(repository, 'findByEmail').mockResolvedValue(null);

		await useCase.execute({ email: user.email, password: user.password });

		expect(useCase.execute).toHaveBeenCalledWith({
			email: user.email,
			password: user.password,
		});
		expect(useCase.execute({ email: user.email, password: user.password })).rejects.toThrowError('Invalid credentials');
	});

	it('should throw an error when the password is incorrect', async () => {
		const user = makeUser();

		vitest.spyOn(useCase, 'execute');
		vitest.spyOn(repository, 'findByEmail').mockResolvedValue(user);
		vitest.spyOn(PasswordEncryptor, 'compare').mockResolvedValue(false);

		await useCase.execute({ email: user.email, password: user.password });

		expect(useCase.execute).toHaveBeenCalledWith({
			email: user.email,
			password: user.password,
		});
		expect(useCase.execute({ email: user.email, password: user.password })).rejects.toThrowError('Invalid credentials');
	});
});
