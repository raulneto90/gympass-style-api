import { CreateUserDTO } from '@src/common/dtos/create-user.dto';
import { User } from '@src/domain/entities/User';
import { UsersRepository } from '@src/domain/repositories/users.repository';

export class InMemoryUsersRepository implements UsersRepository {
	private users: User[] = [];

	async create(data: CreateUserDTO): Promise<User> {
		const user = new User(data);
		this.users.push(user);

		return user;
	}

	async findByEmail(email: string): Promise<User | null> {
		return this.users.find(user => user.email === email) || null;
	}
}
