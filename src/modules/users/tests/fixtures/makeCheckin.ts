import { randomUUID } from 'node:crypto';
import { Checkin } from '@api/modules/check-ins/domain/entities/Checkin';

export function makeCheckin(data: Partial<Checkin> = {}): Checkin {
	return {
		userId: data.userId || randomUUID(),
		gymId: data.gymId || randomUUID(),
	};
}
