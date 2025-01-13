import { prisma } from '@src/config/prisma';
import { CreateUserDTO } from '@src/modules/common/dtos/create-user.dto';
import { User } from '@src/modules/users/domain/entities/User';
import { UsersRepository } from '@src/modules/users/domain/repositories/users.repository';
import { UserMapper } from '@src/modules/users/mappers/UserMapper';

export class PrismaUsersRepository implements UsersRepository {
	async create(data: CreateUserDTO): Promise<User> {
		const user = await prisma.user.create({ data });

		return UserMapper.toDomain(user);
	}

	async findByEmail(email: string): Promise<User | null> {
		const user = await prisma.user.findUnique({ where: { email } });

		if (!user) {
			return null;
		}

		return user;
	}
}
