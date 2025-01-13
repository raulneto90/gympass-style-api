import { User } from '@src/domain/entities/User';

export class UserMapper {
	static toDomain(data: User): User {
		return new User(data);
	}
}
