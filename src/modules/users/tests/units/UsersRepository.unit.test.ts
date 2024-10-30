import { prisma } from '@api/modules/common/config/prisma';
import { Mock, beforeEach, describe, expect, it, vi } from 'vitest';
import { UsersRepository } from '../../domain/repositories/UsersRepository';
import { PrismaUsersRepository } from '../../infraestructure/repositories/PrismaUsersRepository';
import { makeUser } from '../fixtures/user';

vi.mock('@api/common/config/prisma', () => ({
	prisma: {
		user: {
			create: vi.fn(),
			findUnique: vi.fn(),
		},
	},
}));

describe('UsersRepository', () => {
	let usersRepository: UsersRepository;

	beforeEach(() => {
		usersRepository = new PrismaUsersRepository();
	});

	it('should create new user', async () => {
		const input: Parameters<UsersRepository['create']>[0] = makeUser();
		const userMock = { ...input, id: '1' };

		prisma.user.create = vi.fn().mockResolvedValue(userMock);

		const user = await usersRepository.create(input);

		expect(user).toEqual(userMock);
	});

	it('should find user by email', async () => {
		const userMock = makeUser();

		prisma.user.findUnique = vi.fn().mockResolvedValue(userMock);

		const user = await usersRepository.findByEmail(userMock.email);

		expect(user).toEqual(userMock);
	});
});
