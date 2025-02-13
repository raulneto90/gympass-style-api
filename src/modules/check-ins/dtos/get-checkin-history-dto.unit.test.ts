import { describe, expect, it } from 'vitest';
import { getCheckinHistorySchema } from './get-checkin-history-dto';

describe('GetCheckinHistoryDTO', () => {
	it('should validate with default page value', () => {
		const data = { userId: 'user-123' };
		const parsedData = getCheckinHistorySchema.parse(data);
		expect(parsedData).toEqual({ page: 1 });
	});

	it('should validate with provided page value', () => {
		const data = { page: 2, userId: 'user-123' };
		const parsedData = getCheckinHistorySchema.parse(data);
		expect(parsedData).toEqual({ page: 2 });
	});

	it('should throw an error if page is not a number', () => {
		const data = { page: 'invalid', userId: 'user-123' };
		expect(() => getCheckinHistorySchema.parse(data)).toThrow();
	});
});
