import { DayJsDateService } from '@src/modules/common/application/services/day-js-date.service';
import { DateService } from '@src/modules/common/domain/services/date.service';
import { Checkin } from '../../domain/entities/CheckIn';
import { CheckInsRepository } from '../../domain/repositories/check-ins.repository';
import { CreateCheckinDTO } from '../../dtos/create-checkin-dto';
import { CheckinMapper } from '../../mappers/check-in.mapper';

export class InMemoryCheckInsRepository implements CheckInsRepository {
	private checkIns: Checkin[] = [];
	private dateService: DateService = new DayJsDateService();

	async create(data: CreateCheckinDTO): Promise<Checkin> {
		const checkIn = new Checkin(data);
		this.checkIns.push(checkIn);

		return CheckinMapper.toDomain(checkIn);
	}

	async findByUserIdOnDate(
		userId: string,
		date: Date,
	): Promise<Checkin | null> {
		const checkIn = this.checkIns.find(
			checkin =>
				checkin?.userId === userId &&
				this.dateService.isOnSameDay(date, checkin?.createdAt as Date),
		);

		if (!checkIn) {
			return null;
		}

		return CheckinMapper.toDomain(checkIn);
	}

	async findManyByUserId(userId: string, page: number): Promise<Checkin[]> {
		const checkIns = this.checkIns
			.filter(checkin => checkin.userId === userId)
			.slice((page - 1) * 20, page * 20);

		return checkIns.map(checkin => CheckinMapper.toDomain(checkin));
	}

	async countByUserId(userId: string): Promise<number> {
		return this.checkIns.filter(checkin => checkin.userId === userId).length;
	}
}
