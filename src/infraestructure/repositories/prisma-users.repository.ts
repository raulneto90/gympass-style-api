import { CreateUserDTO } from '@src/common/dtos/create-user.dto';
import { prisma } from '@src/config/prisma';
import { User } from '@src/domain/entities/User';
import { UsersRepository } from '@src/domain/repositories/users.repository';
import { UserMapper } from '@src/mappers/UserMapper';

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
