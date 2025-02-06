import { AuthenticateUseCase } from '../application/use-cases/authenticate.usecase';
import { PrismaUsersRepository } from '../infraestructure/repositories/prisma-users.repository';
import { BcryptPasswordHash } from '../infraestructure/services/bcrypt-password-hash';

export function makeAuthenticateUserUseCase() {
	const repository = new PrismaUsersRepository();
	const passwordHash = new BcryptPasswordHash();

	return new AuthenticateUseCase(repository, passwordHash);
}
