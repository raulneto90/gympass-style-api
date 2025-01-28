import { CheckInsRepository } from '../../domain/repositories/check-ins.repository';
import { GetCheckinHistoryDTO } from '../../dtos/get-checkin-history-dto';

export class GetCheckInHistoryUseCase {
	constructor(private readonly checkInsRepository: CheckInsRepository) {}

	async execute({ userId, page }: GetCheckinHistoryDTO) {
		return this.checkInsRepository.findManyByUserId(userId, page);
	}
}
