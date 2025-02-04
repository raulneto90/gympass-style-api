import { PrismaGymsRepository } from '@src/modules/gyms/infraestructure/repositories/prisma-gyms.repository';
import { CreateCheckinUseCase } from '../application/use-cases/create-check-in-use-case';
import { PrismaCheckInsRepository } from '../infraestructure/repositories/prisma-check-ins-repository';

export function makeCreateCheckinsUseCase() {
	const checkinsRepository = new PrismaCheckInsRepository();
	const gymsRepository = new PrismaGymsRepository();
	return new CreateCheckinUseCase(checkinsRepository, gymsRepository);
}
