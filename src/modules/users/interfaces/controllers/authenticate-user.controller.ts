import { FastifyReply, FastifyRequest } from 'fastify';
import { makeAuthenticateUserUseCase } from '../../factories/authenticate-user.factory';
import { authenticateUserSchema } from '../validations/authenticate-user.validation';

export class AuthenticateUserController {
	async handle(request: FastifyRequest, reply: FastifyReply) {
		const validation = authenticateUserSchema.safeParse(request.body);

		if (!validation.success) {
			return reply.code(400).send(validation.error.format());
		}

		const authenticateUseCase = makeAuthenticateUserUseCase();

		const result = await authenticateUseCase.execute(validation.data);

		return reply.code(200).send(result);
	}
}
