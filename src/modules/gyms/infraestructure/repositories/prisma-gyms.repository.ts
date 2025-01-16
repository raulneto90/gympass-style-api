import { prisma } from '@src/config/prisma';
import { Gym } from '../../domain/entities/Gym';
import { GymsRepository } from '../../domain/repositories/gyms.repository';
import { CreateGymDTO } from '../../dtos/create-gym.dto';
import { GymMapper } from '../../mappers/GymMapper';

export class PrismaGymsRepository implements GymsRepository {
	async create(data: CreateGymDTO): Promise<void> {
		await prisma.gym.create({ data });
	}

	async findById(id: string): Promise<Gym | null> {
		const gym = await prisma.gym.findUnique({ where: { id } });

		if (!gym) {
			return null;
		}

		return GymMapper.toDomain({
			description: gym.description as string,
			latitude: Number(gym.latitude),
			longitude: Number(gym.longitude),
			phone: gym.phone as string,
			title: gym.title,
			id: gym.id,
		});
	}
}
