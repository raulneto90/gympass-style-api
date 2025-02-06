import { CreateUserUseCase } from '../application/use-cases/create-user-use-case';
import { PrismaUsersRepository } from '../infraestructure/repositories/prisma-users.repository';
import { BcryptPasswordHash } from '../infraestructure/services/bcrypt-password-hash';

export function makeCreateUserUseCase() {
	const bcryptPasswordHash = new BcryptPasswordHash();
	const usersRepository = new PrismaUsersRepository();
	return new CreateUserUseCase(bcryptPasswordHash, usersRepository);
}
