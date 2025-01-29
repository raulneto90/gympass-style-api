import { Gym as GymDB } from '@prisma/client';
import { prisma } from '@src/config/prisma';
import { Gym } from '../../domain/entities/Gym';
import { GymsRepository } from '../../domain/repositories/gyms.repository';
import { CreateGymDTO } from '../../dtos/create-gym.dto';
import { SearchNearbyGymsDTO } from '../../dtos/search-nearby-gyms-dto';
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
			latitude: gym.latitude,
			longitude: gym.longitude,
			phone: gym.phone as string,
			title: gym.title,
			id: gym.id,
		});
	}

	async searchMany(query: string, page: number): Promise<Gym[]> {
		const gyms = await prisma.gym.findMany({
			where: {
				title: {
					contains: query,
				},
			},
			skip: (page - 1) * 20,
			take: 20,
		});

		return gyms.map(gym => GymMapper.toDomain(gym));
	}

	async searchManyNearby({
		userLatitude,
		userLongitude,
	}: SearchNearbyGymsDTO): Promise<Gym[]> {
		const gyms = await prisma.$queryRaw<GymDB[]>`SELECT * from gyms
		WHERE ( 6371 * acos( cos( radians(${userLatitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${userLongitude}) ) + sin( radians(${userLatitude}) ) * sin( radians( latitude ) ) ) ) <= 10`;

		return gyms.map(gym => GymMapper.toDomain(gym));
	}
}
