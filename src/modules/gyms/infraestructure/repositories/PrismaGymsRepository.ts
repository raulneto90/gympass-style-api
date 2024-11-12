import { prisma } from '@api/modules/common/config/prisma';
import { Prisma } from '@prisma/client';
import { Gym } from '../../domain/entities/Gym';
import { GymsRepository } from '../../domain/repositories/GymsRepository';
import { GymsMapper } from '../mappers/GymsMapper';

export class PrismaGymsRepository implements GymsRepository {
	private repository: Prisma.GymDelegate;

	constructor() {
		this.repository = prisma.gym;
	}

	async create(data: Gym): Promise<Gym> {
		const gym = await this.repository.create({ data });

		return GymsMapper.toDomain({
			...gym,
			latitude: gym.latitude.toNumber(),
			longitude: gym.longitude.toNumber(),
		});
	}

	async findById(id: string): Promise<Gym | null> {
		const gym = await this.repository.findUnique({ where: { id } });

		if (!gym) {
			return null;
		}

		return GymsMapper.toDomain({
			...gym,
			latitude: gym.latitude.toNumber(),
			longitude: gym.longitude.toNumber(),
		});
	}
}
