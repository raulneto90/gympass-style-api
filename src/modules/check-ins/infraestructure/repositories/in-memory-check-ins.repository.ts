import { Checkin } from '../../domain/entities/CheckIn';
import { CheckInsRepository } from '../../domain/repositories/check-ins.repository';
import { CreateCheckinDTO } from '../../dtos/create-checkin.dto';
import { CheckinMapper } from '../../mappers/check-in.mapper';

export class InMemoryCheckInsRepository implements CheckInsRepository {
	private checkIns: Checkin[] = [];

	async create(data: CreateCheckinDTO): Promise<Checkin> {
		const checkIn = new Checkin(data);
		this.checkIns.push(checkIn);

		return CheckinMapper.toDomain(checkIn);
	}
}
