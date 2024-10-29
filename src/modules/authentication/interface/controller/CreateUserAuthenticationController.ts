import { PostgreUsersRepository } from '@api/modules/users/infraestructure/repositories/PostgreUsersRepository';
import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateAuthenticationUseCase } from '../../application/use-cases/CreateAuthenticationUseCase';
import { createUserAuthenticationValidation } from '../validations/createUserAuthenticationValidation';

export class CreateUserAuthenticateController {
	async handle(request: FastifyRequest, response: FastifyReply): Promise<FastifyReply> {
		const body = createUserAuthenticationValidation.safeParse(request.body);

		if (!body.success) {
			return response.status(400).send(body.error);
		}

		const repository = new PostgreUsersRepository();
		const createAuthenticationUseCase = new CreateAuthenticationUseCase(repository);

		const result = await createAuthenticationUseCase.execute(body.data);

		return response.status(201).send(result);
	}
}
