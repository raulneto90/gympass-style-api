import { GetCheckInHistoryUseCase } from '../application/use-cases/get-check-in-history-use-case';
import { PrismaCheckInsRepository } from '../infraestructure/repositories/prisma-check-ins-repository';

export function makeGetCheckinHistoryUseCase() {
	const checkinsRepository = new PrismaCheckInsRepository();
	return new GetCheckInHistoryUseCase(checkinsRepository);
}
