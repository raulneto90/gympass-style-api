import { FastifyReply, FastifyRequest } from 'fastify';
import { makeCreateUserUseCase } from '../../factories/create-user.factory';
import { createUserSchema } from '../validations/create-user.validation';

export class CreateUsersController {
	async handle(request: FastifyRequest, reply: FastifyReply) {
		const validation = createUserSchema.safeParse(request.body);

		if (!validation.success) {
			return reply.code(400).send(validation.error.format());
		}

		const createUserUseCase = makeCreateUserUseCase();

		await createUserUseCase.execute(validation.data);

		return reply.code(201).send();
	}
}
