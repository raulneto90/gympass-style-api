import { SearchNearbyGymsUseCase } from '../application/use-cases/search-nearby-gyms-use-case';
import { PrismaGymsRepository } from '../infraestructure/repositories/prisma-gyms.repository';

export function makeSearchNearbyGymsUseCase() {
	const gymsRepository = new PrismaGymsRepository();
	return new SearchNearbyGymsUseCase(gymsRepository);
}
