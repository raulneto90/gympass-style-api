import { Checkin } from '@api/modules/check-ins/domain/entities/Checkin';
import { CheckinsRepository } from '@api/modules/check-ins/domain/repositories/CheckinsRepository';
import { PrismaCheckinsRepository } from '@api/modules/check-ins/infraestructure/repositories/PrismaCheckinsRepository';
import { prisma } from '@api/modules/common/config/prisma';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { User } from '../../domain/entities/User';
import { UsersRepository } from '../../domain/repositories/UsersRepository';
import { PrismaUsersRepository } from '../../infraestructure/repositories/PrismaUsersRepository';
import { makeCheckin } from '../fixtures/makeCheckin';
import { makeUser } from '../fixtures/user';

describe('PrismaCheckinsRepository', () => {
	let repository: CheckinsRepository;
	let usersRepository: UsersRepository;

	beforeEach(() => {
		repository = new PrismaCheckinsRepository();
		usersRepository = new PrismaUsersRepository();
	});

	afterEach(async () => {
		await prisma.checkin.deleteMany();
	});

	it('should create a new check-in', async () => {
		const user = User.create(makeUser());
		const checkin = Checkin.create(makeCheckin({ userId: user.id }));

		const result = await repository.create(checkin);

		expect(result).toMatchObject(checkin);
	});
});
