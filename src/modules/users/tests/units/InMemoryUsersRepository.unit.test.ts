import { beforeEach, describe, expect, it } from 'vitest';
import { User } from '../../domain/entities/User';
import { InMemoryUsersRepository } from '../../infraestructure/repositories/InMemoryUsersRepository';
import { makeUser } from '../fixtures/user';

describe('InMemoryUsersRepository - Unit tests', () => {
	let repository: InMemoryUsersRepository;

	beforeEach(() => {
		repository = new InMemoryUsersRepository();
	});

	it('should create a user', async () => {
		const user = User.create(makeUser());

		const createdUser = await repository.create(user);

		expect(createdUser).toBe(user);
	});

	it('should find a user by email', async () => {
		const user = User.create(makeUser());

		await repository.create(user);

		const foundUser = await repository.findByEmail(user.email);

		expect(foundUser).toBe(user);
	});

	it('should find a user by id', async () => {
		const user = User.create(makeUser());

		await repository.create(user);

		const foundUser = await repository.findById(user.id as string);

		expect(foundUser).toBe(user);
	});
});
