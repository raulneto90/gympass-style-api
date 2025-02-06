import { ProfileUseCase } from '../application/use-cases/profile-use-case';
import { PrismaUsersRepository } from '../infraestructure/repositories/prisma-users.repository';

export function makeProfileUseCase() {
	const repository = new PrismaUsersRepository();
	return new ProfileUseCase(repository);
}
