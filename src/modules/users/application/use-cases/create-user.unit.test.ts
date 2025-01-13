import { EntityAlreadyExistsError } from '@src/modules/common/errors/entity-already-exists.error';
import { UsersRepository } from '@src/modules/users/domain/repositories/users.repository';
import { PasswordHash } from '@src/modules/users/domain/services/password-hash';
import { InMemoryUsersRepository } from '@src/modules/users/infraestructure/repositories/in-memory-users.repository';
import { makeUser } from '@src/tests/mocks/user';
import { Mock, beforeEach, describe, expect, it, vi } from 'vitest';
import { CreateUserUseCase } from './create-user.usecase';

describe('CreateUserUseCase', () => {
	let useCase: CreateUserUseCase;
	let repository: UsersRepository;
	const passwordHash = {
		hash: vi.fn(),
	} as unknown as PasswordHash;

	beforeEach(() => {
		repository = new InMemoryUsersRepository();
		useCase = new CreateUserUseCase(passwordHash, repository);
	});

	it('should create a user', async () => {
		const data = makeUser();

		(passwordHash.hash as Mock).mockReturnValue('hashed-password');

		const user = await useCase.execute(data);

		expect(user).toEqual({
			...data,
			password: 'hashed-password',
		});
	});

	it('should throw an error if user already exists', async () => {
		const data = makeUser();

		await useCase.execute(data);

		await expect(useCase.execute(data)).rejects.toThrowError(
			'User already exists',
		);
		await expect(useCase.execute(data)).rejects.toBeInstanceOf(
			EntityAlreadyExistsError,
		);
	});
});
