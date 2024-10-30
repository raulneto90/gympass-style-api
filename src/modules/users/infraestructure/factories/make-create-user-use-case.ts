import { CreateUserUseCase } from '../../application/use-cases/CreateUserUseCase';
import { PrismaUsersRepository } from '../repositories/PrismaUsersRepository';

export function makeCreateUserUseCase(): CreateUserUseCase {
	const userRepository = new PrismaUsersRepository();
	return new CreateUserUseCase(userRepository);
}
