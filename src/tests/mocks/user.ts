import { randomUUID } from 'node:crypto';
import { User } from '@src/modules/users/domain/entities/User';

export function makeUser(props?: Partial<User>): User {
	return {
		id: randomUUID(),
		name: props?.name ?? 'John Doe',
		email: props?.email ?? 'johndoe@example.com',
		password: props?.password ?? '123',
		createdAt: new Date(),
	};
}
