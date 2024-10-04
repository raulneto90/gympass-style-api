import { User } from '../../domain/entities/User';

export class UsersMapper {
	static toDomain(user: { name: string; email: string; password: string; id: string; createdAt: Date }): User {
		return new User(user);
	}
}
