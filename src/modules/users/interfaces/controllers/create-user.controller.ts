import { CreateUserUseCase } from '@src/modules/users/application/use-cases/create-user.usecase';
import { PrismaUsersRepository } from '@src/modules/users/infraestructure/repositories/prisma-users.repository';
import { BcryptPasswordHash } from '@src/modules/users/infraestructure/services/bcrypt-password-hash';
import { FastifyReply, FastifyRequest } from 'fastify';
import { createUserSchema } from '../validations/create-user.validation';

export class CreateUsersController {
	async handle(request: FastifyRequest, reply: FastifyReply) {
		const bcryptPasswordHash = new BcryptPasswordHash();
		const usersRepository = new PrismaUsersRepository();
		const createUserUseCase = new CreateUserUseCase(
			bcryptPasswordHash,
			usersRepository,
		);

		const validation = createUserSchema.safeParse(request.body);

		if (!validation.success) {
			return reply.code(400).send(validation.error.format());
		}

		await createUserUseCase.execute(validation.data);

		return reply.code(201).send();
	}
}
