import { User } from '@src/modules/users/domain/entities/User';

export class UserMapper {
	static toDomain(data: User): User {
		return new User(data);
	}
}
