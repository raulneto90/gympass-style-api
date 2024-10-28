import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateUserUseCase } from '../../application/use-cases/CreateUserUseCase';
import { PostgreUsersRepository } from '../../infraestructure/repositories/PostgreUsersRepository';
import { createUserValidationSchema } from '../validations/CreateUserValidation';

export class CreateUserController {
	async handle(request: FastifyRequest, response: FastifyReply): Promise<FastifyReply> {
		const body = createUserValidationSchema.safeParse(request.body);

		if (!body.success) {
			return response.status(400).send(body.error);
		}

		const usersRepository = new PostgreUsersRepository();
		const createUserUseCase = new CreateUserUseCase(usersRepository);

		const user = await createUserUseCase.execute(body.data);

		return response.status(201).send(user);
	}
}
