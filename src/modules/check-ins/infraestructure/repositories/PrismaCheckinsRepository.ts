import { prisma } from '@api/modules/common/config/prisma';
import { Prisma } from '@prisma/client';
import { Checkin } from '../../domain/entities/Checkin';
import { CheckinsRepository } from '../../domain/repositories/CheckinsRepository';
import { CheckinMapper } from '../mappers/CheckinMapper';

export class PrismaCheckinsRepository implements CheckinsRepository {
	private repository: Prisma.CheckinDelegate;

	constructor() {
		this.repository = prisma.checkin;
	}

	async create(data: Pick<Checkin, 'gymId' | 'userId'>): Promise<Checkin> {
		const checkin = await this.repository.create({
			data: {
				gymId: data.gymId,
				userId: data.userId,
			},
		});

		return CheckinMapper.toDomain(checkin);
	}
}
