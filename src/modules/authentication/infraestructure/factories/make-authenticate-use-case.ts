import { PrismaUsersRepository } from '@api/modules/users/infraestructure/repositories/PrismaUsersRepository';
import { AuthenticateUseCase } from '../../application/use-cases/AuthenticateUseCase';

export function makeAuthenticateUseCase(): AuthenticateUseCase {
	const userRepository = new PrismaUsersRepository();
	return new AuthenticateUseCase(userRepository);
}
