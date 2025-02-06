import { describe, expect, it } from 'vitest';
import { createCheckinSchema } from './create-checkin-dto';

describe('createCheckinSchema', () => {
	it('should validate a valid schema', () => {
		const validData = {
			userId: '123e4567-e89b-12d3-a456-426614174000',
			gymId: '123e4567-e89b-12d3-a456-426614174001',
			latitude: -23.5505199,
			longitude: -46.6333094,
		};

		expect(() => createCheckinSchema.parse(validData)).not.toThrow();
	});

	it('should throw an error for invalid userId', () => {
		const invalidData = {
			userId: 'invalid-uuid',
			gymId: '123e4567-e89b-12d3-a456-426614174001',
		};

		expect(() => createCheckinSchema.parse(invalidData)).toThrow();
	});

	it('should throw an error for invalid gymId', () => {
		const invalidData = {
			userId: '123e4567-e89b-12d3-a456-426614174000',
			gymId: 'invalid-uuid',
		};

		expect(() => createCheckinSchema.parse(invalidData)).toThrow();
	});

	it('should throw an error for missing userId', () => {
		const invalidData = {
			gymId: '123e4567-e89b-12d3-a456-426614174001',
		};

		expect(() => createCheckinSchema.parse(invalidData)).toThrow();
	});

	it('should throw an error for missing gymId', () => {
		const invalidData = {
			userId: '123e4567-e89b-12d3-a456-426614174000',
		};

		expect(() => createCheckinSchema.parse(invalidData)).toThrow();
	});
});
