import { User } from '../../domain/entities/User';

export const makeUser = (data?: Partial<User>) => {
	return {
		id: '1',
		name: 'John Doe',
		email: 'johndoe@example.com',
		password: 'password',
		...data,
	};
};
