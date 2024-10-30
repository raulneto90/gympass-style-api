import { prisma } from '@api/modules/common/config/prisma';

import { Prisma } from '@prisma/client';
import { UserDTO } from '../../application/dtos/User.dto';
import { User } from '../../domain/entities/User';
import { UsersRepository } from '../../domain/repositories/UsersRepository';
import { UsersMapper } from '../mappers/UsersMapper';

export class PrismaUsersRepository implements UsersRepository {
	private repository: Prisma.UserDelegate;

	constructor() {
		this.repository = prisma.user;
	}

	async create(data: Pick<UserDTO, 'name' | 'email' | 'password'>): Promise<User> {
		const user = await this.repository.create({
			data: {
				name: data.name,
				email: data.email,
				password: data.password,
			},
		});

		return UsersMapper.toDomain(user);
	}

	async findByEmail(email: string): Promise<User | null> {
		const user = await this.repository.findUnique({
			where: { email },
		});

		return user ? UsersMapper.toDomain(user) : null;
	}
}
