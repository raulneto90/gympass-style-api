import { prisma } from '@api/modules/common/config/prisma';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { User } from '../domain/entities/User';
import { UsersRepository } from '../domain/repositories/UsersRepository';
import { PrismaUsersRepository } from '../infraestructure/repositories/PrismaUsersRepository';
import { makeUser } from './fixtures/user';

describe('UsersRepository - Integration tests', () => {
	let usersRepository: UsersRepository;

	beforeEach(() => {
		usersRepository = new PrismaUsersRepository();
	});

	afterEach(async () => {
		await prisma.user.deleteMany();
	});

	it('should be able to create a new user', async () => {
		const input = User.create(makeUser());
		const user = await usersRepository.create(input);

		expect(user).toHaveProperty('id');
		expect(user).toHaveProperty('email', input.email);
		expect(user).toHaveProperty('password', input.password);
		expect(user).toHaveProperty('name', input.name);
		expect(user).toHaveProperty('createdAt');
		expect(user).toHaveProperty('updatedAt');
	});

	it('should be able to find a user by email', async () => {
		const input = User.create(makeUser());
		const user = await usersRepository.create(input);

		const result = await usersRepository.findByEmail(user.email);

		expect(result).toHaveProperty('id', user.id);
		expect(result).toHaveProperty('email', user.email);
		expect(result).toHaveProperty('password', user.password);
		expect(result).toHaveProperty('name', user.name);
		expect(result).toHaveProperty('createdAt', user.createdAt);
		expect(result).toHaveProperty('updatedAt', user.updatedAt);
	});
});
