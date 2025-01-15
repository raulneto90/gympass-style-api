import { describe, expect, it } from 'vitest';
import { Checkin } from '../domain/entities/CheckIn';
import { CheckinMapper } from './check-in.mapper';

describe('CheckinMapper', () => {
	it('should map to domain correctly', () => {
		const checkinData = {
			id: '1',
			gymId: 'gym1',
			userId: 'user1',
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		const checkin = CheckinMapper.toDomain(checkinData);

		expect(checkin).toBeInstanceOf(Checkin);
		expect(checkin.id).toBe(checkinData.id);
		expect(checkin.userId).toBe(checkinData.userId);
		expect(checkin.createdAt).toEqual(checkinData.createdAt);
	});
});
