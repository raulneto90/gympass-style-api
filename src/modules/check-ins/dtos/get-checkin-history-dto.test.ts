import { describe, expect, it } from 'vitest';
import { getCheckinHistorySchema } from './get-checkin-history-dto';

describe('GetCheckinHistoryDto', () => {
	it('should validate a valid schema', () => {
		const validData = {
			userId: '123e4567-e89b-12d3-a456-426614174000',
			page: 1,
		};

		expect(() => getCheckinHistorySchema.parse(validData)).not.toThrow();
	});

	it('should throw an error for invalid userId', () => {
		const invalidData = {
			userId: 'invalid-uuid',
			page: 1,
		};

		expect(() => getCheckinHistorySchema.parse(invalidData)).toThrow();
	});

	it('should throw an error for invalid page', () => {
		const invalidData = {
			userId: '123e4567-e89b-12d3-a456-426614174000',
			page: 'invalid-page',
		};

		expect(() => getCheckinHistorySchema.parse(invalidData)).toThrow();
	});
});
