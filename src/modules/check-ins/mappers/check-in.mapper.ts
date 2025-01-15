import { Checkin } from '../domain/entities/CheckIn';

export class CheckinMapper {
	static toDomain(props: Checkin): Checkin {
		return new Checkin(props);
	}
}
