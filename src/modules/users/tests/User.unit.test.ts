import { describe, expect, it } from 'vitest';
import { User } from '../domain/entities/User';
import { makeUser } from './fixtures/user';

describe('User', () => {
	it('should create a new user using static method', () => {
		const user = User.create(makeUser());

		expect(user).toBeInstanceOf(User);
	});

	it('should create user by default', () => {
		const user = new User(makeUser());

		expect(user.createdAt).toBeUndefined();
		expect(user.updatedAt).toBeUndefined();
		expect(user.id).toBeDefined();
		expect(user.name).toBe('John Doe');
		expect(user.email).toBe('johndoe@example.com');
		expect(user.password).toBe('password');
	});

	it('should return all user information', () => {
		const user = User.create(makeUser({ id: '1' }));

		expect(user.id).toBe('1');
		expect(user.name).toBe('John Doe');
		expect(user.email).toBe('johndoe@example.com');
		expect(user).toHaveProperty('password');
		expect(user.createdAt).toBeInstanceOf(Date);
		expect(user.createdAt).toBeInstanceOf(Date);
	});
});
