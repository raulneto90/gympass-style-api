import { Checkin } from '../../domain/entities/CheckIn';
import { CheckInsRepository } from '../../domain/repositories/check-ins.repository';
import { CreateCheckinDTO } from '../../dtos/create-checkin.dto';

type Response = {
	checkin: Checkin;
};

export class CheckinUseCase {
	constructor(private readonly checkinsRepository: CheckInsRepository) {}

	async execute(data: CreateCheckinDTO): Promise<Response> {
		const checkin = await this.checkinsRepository.create(data);

		return { checkin };
	}
}
