import { prisma } from '@src/config/prisma';
import dayjs from 'dayjs';
import { Checkin } from '../../domain/entities/CheckIn';
import { CheckInsRepository } from '../../domain/repositories/check-ins.repository';
import { CreateCheckinDTO } from '../../dtos/create-checkin-dto';
import { CheckinMapper } from '../../mappers/check-in.mapper';

export class PrismaCheckInsRepository implements CheckInsRepository {
	async create(data: CreateCheckinDTO): Promise<Checkin> {
		const checkin = await prisma.checkin.create({ data });

		return CheckinMapper.toDomain(checkin);
	}

	async findByUserIdOnDate(
		userId: string,
		date: Date,
	): Promise<Checkin | null> {
		const startOfTheDay = dayjs(date).startOf('day').toDate();
		const endOfTheDay = dayjs(date).endOf('day').toDate();

		const checkin = prisma.checkin.findFirst({
			where: {
				userId,
				createdAt: {
					gte: startOfTheDay,
					lte: endOfTheDay,
				},
			},
		}) as unknown as Checkin;

		return checkin ? CheckinMapper.toDomain(checkin) : null;
	}

	async findById(id: string): Promise<Checkin | null> {
		const checkin = await prisma.checkin.findUnique({ where: { id } });

		return checkin ? CheckinMapper.toDomain(checkin) : null;
	}

	async findManyByUserId(userId: string, page: number): Promise<Checkin[]> {
		const checkins = await prisma.checkin.findMany({
			where: {
				userId,
			},
			skip: (page - 1) * 20,
			take: 20,
		});

		return checkins.map(CheckinMapper.toDomain);
	}

	async countByUserId(userId: string): Promise<number> {
		const count = await prisma.checkin.count({
			where: { userId },
		});

		return count;
	}

	async save(checkin: Checkin): Promise<void> {
		await prisma.checkin.update({
			where: {
				id: checkin.id,
			},
			data: checkin,
		});
	}
}
