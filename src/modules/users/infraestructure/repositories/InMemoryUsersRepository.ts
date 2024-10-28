import { User } from '../../domain/entities/User';
import { UsersRepository } from '../../domain/repositories/UsersRepository';

export class InMemoryUsersRepository implements UsersRepository {
	private users: User[] = [];

	async create(user: User): Promise<User> {
		this.users.push(user);

		return user;
	}

	async findByEmail(email: string): Promise<User | null> {
		const user = this.users.find(user => user.email === email);

		if (!user) {
			return null;
		}

		return user;
	}
}
