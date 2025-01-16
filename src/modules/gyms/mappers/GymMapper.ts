import { Gym } from '../domain/entities/Gym';

export class GymMapper {
	static toDomain(data: Gym): Gym {
		return new Gym({
			description: data.description,
			latitude: data.latitude,
			longitude: data.longitude,
			phone: data.phone,
			title: data.title,
			id: data.id,
		});
	}
}
