import { Checkin } from '../../domain/entities/CheckIn';
import { CheckInsRepository } from '../../domain/repositories/check-ins.repository';
import { CreateCheckinDTO } from '../../dtos/create-checkin.dto';

type Response = {
	checkin: Checkin;
};

export class CheckinUseCase {
	constructor(private readonly checkinsRepository: CheckInsRepository) {}

	async execute(data: CreateCheckinDTO): Promise<Response> {
		const checkinOnSameDay = await this.checkinsRepository.findByUserIdOnDate(
			data.userId,
			new Date(),
		);

		if (checkinOnSameDay) {
			throw new Error('User already checked in today');
		}

		const checkin = await this.checkinsRepository.create(data);

		return { checkin };
	}
}
