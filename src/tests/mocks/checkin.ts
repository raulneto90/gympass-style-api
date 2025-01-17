import { randomUUID } from 'node:crypto';
import { Checkin } from '@src/modules/check-ins/domain/entities/CheckIn';

export function makeCheckin(props?: Partial<Checkin>): Checkin {
	return {
		id: randomUUID(),
		gymId: props?.gymId ?? 'gym-01',
		userId: props?.userId ?? 'gym-01',
		createdAt: new Date(),
	};
}
