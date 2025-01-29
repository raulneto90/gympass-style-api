import { Prisma } from '@prisma/client';
import { Gym } from '../domain/entities/Gym';

interface GymPersistence {
	id: string;
	title: string;
	description: string | null;
	phone: string | null;
	latitude: Prisma.Decimal;
	longitude: Prisma.Decimal;
}

export class GymMapper {
	static toDomain(data: GymPersistence): Gym {
		return new Gym({
			description: data.description,
			latitude: Number(data.latitude),
			longitude: Number(data.longitude),
			phone: data.phone,
			title: data.title,
			id: data.id,
		});
	}
}
