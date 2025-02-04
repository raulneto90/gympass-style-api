import { ValidateCheckinUseCase } from '../application/use-cases/validate-check-in-use-case';
import { PrismaCheckInsRepository } from '../infraestructure/repositories/prisma-check-ins-repository';

export function makeValidateCheckInUseCase(): ValidateCheckinUseCase {
	const checkInRepository = new PrismaCheckInsRepository();
	return new ValidateCheckinUseCase(checkInRepository);
}
