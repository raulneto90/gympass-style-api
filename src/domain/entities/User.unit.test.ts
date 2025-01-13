import { makeUser } from '@src/tests/mocks/user';
import { describe, expect, it } from 'vitest';
import { User } from './User';

describe('User Entity', () => {
	it('should create an instance of user', () => {
		const data = makeUser();

		const user = new User(data);

		expect(user).toBeDefined();
		expect(user.id).toBe(data.id);
		expect(user.name).toBe(data.name);
		expect(user.email).toBe(data.email);
		expect(user.password).toBe(data.password);
		expect(user.createdAt).toBe(data.createdAt);
	});
});
