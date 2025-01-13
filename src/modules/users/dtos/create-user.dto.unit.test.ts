import { describe, expect, it } from 'vitest';
import { CreateUserDTO, createUserSchema } from './create-user.dto';

describe('CreateUserDTO', () => {
	it('should validate a valid user', () => {
		const validUser: CreateUserDTO = {
			name: 'John Doe',
			email: 'john.doe@example.com',
			password: 'password123',
		};

		const result = createUserSchema.safeParse(validUser);

		expect(result.success).toBe(true);
	});

	it('should invalidate a user with a short name', () => {
		const invalidUser: Partial<CreateUserDTO> = {
			name: 'Jo',
			email: 'john.doe@example.com',
			password: 'password123',
		};

		const result = createUserSchema.safeParse(invalidUser);

		expect(result.success).toBe(false);
		expect(result.error?.issues[0].message).toBe(
			'String must contain at least 3 character(s)',
		);
	});

	it('should invalidate a user with an invalid email', () => {
		const invalidUser: Partial<CreateUserDTO> = {
			name: 'John Doe',
			email: 'not-an-email',
			password: 'password123',
		};

		const result = createUserSchema.safeParse(invalidUser);

		expect(result.success).toBe(false);
		expect(result.error?.issues[0].message).toBe('Invalid email');
	});

	it('should invalidate a user with a short password', () => {
		const invalidUser: Partial<CreateUserDTO> = {
			name: 'John Doe',
			email: 'john.doe@example.com',
			password: 'pass',
		};

		const result = createUserSchema.safeParse(invalidUser);

		expect(result.success).toBe(false);
		expect(result.error?.issues[0].message).toBe(
			'String must contain at least 6 character(s)',
		);
	});
});
