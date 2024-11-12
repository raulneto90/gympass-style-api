import { describe, expect, it } from 'vitest';
import { UsersMapper } from '../infraestructure/mappers/UsersMapper';
import { makeUser } from './fixtures/user';

describe('UsersMapper', () => {
	it('should return a user domain object', () => {
		const user = makeUser({
			createdAt: new Date(),
			updatedAt: new Date(),
			id: '1',
		});

		const userDomain = UsersMapper.toDomain({
			...user,
			createdAt: user.createdAt as Date,
			updatedAt: user.updatedAt as Date,
		});

		expect(userDomain).toBeDefined();
		expect(userDomain).toHaveProperty('id', user.id);
		expect(userDomain).toHaveProperty('name', user.name);
		expect(userDomain).toHaveProperty('email', user.email);
		expect(userDomain).toHaveProperty('password', user.password);
		expect(userDomain).toHaveProperty('createdAt', user.createdAt);
		expect(userDomain).toHaveProperty('updatedAt', user.updatedAt);
	});
});
