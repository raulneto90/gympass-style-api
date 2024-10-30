import { Checkin } from '@api/modules/check-ins/domain/entities/Checkin';
import { CheckinMapper } from '@api/modules/check-ins/infraestructure/mappers/CheckinMapper';
import { describe, expect, it } from 'vitest';

describe('CheckinMapper', () => {
	it('should map raw checkin data to Checkin domain entity', () => {
		const rawCheckin = {
			id: 'checkin-id',
			userId: 'user-id',
			gymId: 'gym-id',
			createdAt: new Date(),
		};

		const checkin = CheckinMapper.toDomain(rawCheckin);

		expect(checkin).toBeInstanceOf(Checkin);
		expect(checkin.id).toBe(rawCheckin.id);
		expect(checkin.userId).toBe(rawCheckin.userId);
		expect(checkin.gymId).toBe(rawCheckin.gymId);
		expect(checkin.createdAt).toEqual(rawCheckin.createdAt);
	});
});
