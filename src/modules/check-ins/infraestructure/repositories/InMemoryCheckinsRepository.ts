import dayjs from 'dayjs';
import { Checkin } from '../../domain/entities/Checkin';
import { CheckinsRepository } from '../../domain/repositories/CheckinsRepository';

export class InMemoryCheckinsRepository implements CheckinsRepository {
	private checkins: Checkin[] = [];

	async create(data: Pick<Checkin, 'gymId' | 'userId'>): Promise<Checkin> {
		const checkin = Checkin.create(data);

		this.checkins.push(checkin);

		return checkin;
	}

	async findByIdAndDate(id: string, date: Date): Promise<Checkin | null> {
		const startOfTheDay = dayjs(date).startOf('date');
		const endOfTheDay = dayjs(date).endOf('date');

		const checkin = this.checkins.find(checkin => {
			const checkinDate = dayjs(checkin.createdAt);
			const isOnSameDate = checkinDate.isAfter(startOfTheDay) && checkinDate.isBefore(endOfTheDay);

			return checkin.userId === id && isOnSameDate;
		});

		if (!checkin) {
			return null;
		}

		return checkin;
	}

	async findManyByUserId(userId: string, page: number): Promise<Checkin[]> {
		return this.checkins.filter(checkin => checkin.userId === userId).slice((page - 1) * 20, page * 20);
	}

	async countByUserId(userId: string): Promise<number> {
		return this.checkins.filter(checkin => checkin.userId === userId).length;
	}
}
