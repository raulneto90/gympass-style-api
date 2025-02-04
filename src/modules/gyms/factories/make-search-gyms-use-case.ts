import { SearchGymsUseCase } from '../application/use-cases/search-gyms-use-case';
import { PrismaGymsRepository } from '../infraestructure/repositories/prisma-gyms.repository';

export function makeSearchGymsUseCase() {
	const gymsRepository = new PrismaGymsRepository();
	return new SearchGymsUseCase(gymsRepository);
}
