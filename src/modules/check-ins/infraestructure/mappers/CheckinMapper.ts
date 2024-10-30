import { Checkin } from '../../domain/entities/Checkin';

export class CheckinMapper {
	static toDomain(checkin: {
		id: string;
		userId: string;
		gymId: string;
		createdAt: Date;
	}) {
		return new Checkin(checkin);
	}
}
