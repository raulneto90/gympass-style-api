import { AuthenticateUseCase } from '../application/use-cases/authenticate.usecase';
import { PrismaUsersRepository } from '../infraestructure/repositories/prisma-users.repository';
import { BcryptPasswordHash } from '../infraestructure/services/bcrypt-password-hash';
import { JsonWebTokenService } from '../infraestructure/services/jsonwebtoken.service';

export function makeAuthenticateUserUseCase() {
	const repository = new PrismaUsersRepository();
	const passwordHash = new BcryptPasswordHash();
	const tokenGeneratorService = new JsonWebTokenService();
	return new AuthenticateUseCase(
		repository,
		passwordHash,
		tokenGeneratorService,
	);
}
