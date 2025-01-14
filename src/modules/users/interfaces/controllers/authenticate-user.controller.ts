import { FastifyReply, FastifyRequest } from 'fastify';
import { AuthenticateUseCase } from '../../application/use-cases/authenticate.usecase';
import { PrismaUsersRepository } from '../../infraestructure/repositories/prisma-users.repository';
import { BcryptPasswordHash } from '../../infraestructure/services/bcrypt-password-hash';
import { JsonWebTokenService } from '../../infraestructure/services/jsonwebtoken.service';
import { authenticateUserSchema } from '../validations/authenticate-user.validation';

export class AuthenticateUserController {
	async handle(request: FastifyRequest, reply: FastifyReply) {
		const repository = new PrismaUsersRepository();
		const passwordHash = new BcryptPasswordHash();
		const tokenGeneratorService = new JsonWebTokenService();
		const authenticateUseCase = new AuthenticateUseCase(
			repository,
			passwordHash,
			tokenGeneratorService,
		);

		const validation = authenticateUserSchema.safeParse(request.body);

		if (!validation.success) {
			return reply.code(400).send(validation.error.format());
		}

		const result = await authenticateUseCase.execute(validation.data);

		return reply.code(200).send(result);
	}
}
