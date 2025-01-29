import { randomUUID } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import { getUserCheckinMetricsSchema } from './get-user-checkin-metrics-dto';

describe('GetUserCheckinMetricsDto', () => {
	it('should validate a valid schema', () => {
		const validData = {
			userId: randomUUID(),
		};

		expect(() => getUserCheckinMetricsSchema.parse(validData)).not.toThrow();
	});

	it('should throw an error for invalid userId', () => {
		const invalidData = {
			userId: 'invalid-uuid',
		};

		expect(() => getUserCheckinMetricsSchema.parse(invalidData)).toThrow();
	});
});
