import { CreateGymUseCase } from '../application/use-cases/create-gym-use-case';
import { PrismaGymsRepository } from '../infraestructure/repositories/prisma-gyms.repository';

export function makeCreateGymUseCase() {
	const gymsRepository = new PrismaGymsRepository();
	return new CreateGymUseCase(gymsRepository);
}
