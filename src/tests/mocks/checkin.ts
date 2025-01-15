import { randomUUID } from 'node:crypto';
import { Checkin } from '@src/modules/check-ins/domain/entities/CheckIn';

export function makeCheckin(props?: Partial<Checkin>): Checkin {
	return {
		id: randomUUID(),
		gymId: props?.gymId ?? '1',
		userId: props?.userId ?? '1',
		createdAt: new Date(),
	};
}
