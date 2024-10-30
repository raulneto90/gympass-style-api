import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateUserUseCase } from '../../application/useCases/CreateUserUseCase';
import { makeCreateUserUseCase } from '../../infraestructure/factories/make-create-user-use-case';
import { PrismaUsersRepository } from '../../infraestructure/repositories/PrismaUsersRepository';
import { createUserValidationSchema } from '../validations/CreateUserValidation';

export class CreateUserController {
	async handle(request: FastifyRequest, response: FastifyReply): Promise<FastifyReply> {
		const body = createUserValidationSchema.safeParse(request.body);

		if (!body.success) {
			return response.status(400).send(body.error);
		}

		const createUserUseCase = makeCreateUserUseCase();

		const user = await createUserUseCase.execute(body.data);

		return response.status(201).send(user);
	}
}
