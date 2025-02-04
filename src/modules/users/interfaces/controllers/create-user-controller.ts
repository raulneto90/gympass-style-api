import { FastifyReply, FastifyRequest } from 'fastify';
import { createUserSchema } from '../../dtos/create-user.dto';
import { makeCreateUserUseCase } from '../../factories/create-user.factory';

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
