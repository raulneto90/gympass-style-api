import { CheckInsRepository } from '../../domain/repositories/check-ins.repository';
import { GetUserCheckinMetricsDTO } from '../../dtos/get-user-checkin-metrics-dto';

export class GetUserCheckinMetricsUseCase {
	constructor(private readonly checkInsRepository: CheckInsRepository) {}

	async execute({ userId }: GetUserCheckinMetricsDTO) {
		const metrics = await this.checkInsRepository.countByUserId(userId);

		return metrics;
	}
}
