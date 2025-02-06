import { EntityNotFoundError } from '@src/modules/common/errors/entity-not-found.error';
import { makeUser } from '@src/tests/mocks/user';
import { beforeEach, describe, expect, it } from 'vitest';
import { UsersRepository } from '../../domain/repositories/users.repository';
import { InMemoryUsersRepository } from '../../infraestructure/repositories/in-memory-users.repository';
import { ProfileUseCase } from './profile-use-case';

describe('UserProfileUseCase', () => {
	let useCase: ProfileUseCase;
	let repository: UsersRepository;

	beforeEach(() => {
		repository = new InMemoryUsersRepository();
		useCase = new ProfileUseCase(repository);
	});

	it('should return a user profile', async () => {
		const data = makeUser();

		const user = await repository.create(data);

		const response = await useCase.execute({ id: user.id });

		expect(response.user).toBeDefined();
		expect(response.user.id).toBe(user.id);
	});

	it('should throw an error if the user does not exists', async () => {
		const id = 'invalid-id';

		await expect(useCase.execute({ id })).rejects.toThrow(
			'User does not exists',
		);
		await expect(useCase.execute({ id })).rejects.toBeInstanceOf(
			EntityNotFoundError,
		);
	});
});
