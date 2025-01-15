import { makeUser } from '@src/tests/mocks/user';
import { describe, expect, it } from 'vitest';
import { UserMapper } from './user.mapper';

describe('UserMapper', () => {
	it('should map data to domain', () => {
		const data = makeUser();

		const user = UserMapper.toDomain(data);

		expect(user).toEqual(data);
	});
});
