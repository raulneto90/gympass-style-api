import { NotFoundError } from '@api/modules/common/errors/NotFoundError';
import { UsersRepository } from '@api/modules/users/domain/repositories/UsersRepository';
import { InMemoryUsersRepository } from '@api/modules/users/infraestructure/repositories/InMemoryUsersRepository';
import { makeUser } from '@api/modules/users/tests/fixtures/user';
import { beforeEach, describe, expect, it } from 'vitest';
import { GetUserProfileUseCase } from '../application/use-cases/GetUserProfileUseCase';

describe('GetUserProfileUseCase', () => {
	let useCase: GetUserProfileUseCase;
	let repository: UsersRepository;

	beforeEach(() => {
		repository = new InMemoryUsersRepository();
		useCase = new GetUserProfileUseCase(repository);
	});

	it('should return user profile for a valid user ID', async () => {
		const user = await repository.create(makeUser());

		const response = await useCase.execute(user.id as string);

		expect(response).toBeDefined();
		expect(response).toHaveProperty('id', user.id);
		expect(response).toHaveProperty('name', user.name);
		expect(response).toHaveProperty('email', user.email);
	});

	it('should throw NotFoundError for an invalid user ID', async () => {
		await expect(useCase.execute('invalid-id')).rejects.toBeInstanceOf(NotFoundError);
		await expect(useCase.execute('invalid-id')).rejects.toThrowError('User not found');
	});
});
