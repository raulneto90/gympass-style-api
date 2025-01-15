import { describe, expect, it } from 'vitest';
import { z } from 'zod';
import { authenticateUserSchema } from './authenticate-user.dto';

describe('authenticateUserSchema', () => {
	it('should validate a correct schema', () => {
		const validData = {
			email: 'test@example.com',
			password: 'password123',
		};

		expect(() => authenticateUserSchema.parse(validData)).not.toThrow();
	});

	it('should invalidate an incorrect email', () => {
		const invalidData = {
			email: 'invalid-email',
			password: 'password123',
		};

		expect(() => authenticateUserSchema.parse(invalidData)).toThrow(z.ZodError);
	});

	it('should invalidate a missing password', () => {
		const invalidData = {
			email: 'test@example.com',
		};

		expect(() => authenticateUserSchema.parse(invalidData)).toThrow(z.ZodError);
	});

	it('should invalidate an empty password', () => {
		const invalidData = {
			email: 'test@example.com',
		};

		expect(() => authenticateUserSchema.parse(invalidData)).toThrow(z.ZodError);
	});
});
