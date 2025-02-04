import { GetUserCheckinMetricsUseCase } from '../application/use-cases/get-user-checkin-metric-use-case';
import { PrismaCheckInsRepository } from '../infraestructure/repositories/prisma-check-ins-repository';

export function makeGetUserCheckinsMetricsUseCase() {
	const checkinsRepository = new PrismaCheckInsRepository();
	return new GetUserCheckinMetricsUseCase(checkinsRepository);
}
