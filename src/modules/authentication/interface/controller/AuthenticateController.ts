import { FastifyReply, FastifyRequest } from 'fastify';
import { makeAuthenticateUseCase } from '../../infraestructure/factories/make-authenticate-use-case';
import { createUserAuthenticationValidation } from '../validations/createUserAuthenticationValidation';

export class AuthenticateController {
	async handle(request: FastifyRequest, response: FastifyReply): Promise<FastifyReply> {
		const body = createUserAuthenticationValidation.safeParse(request.body);

		if (!body.success) {
			return response.status(400).send(body.error.format());
		}

		const createAuthenticationUseCase = makeAuthenticateUseCase();

		const result = await createAuthenticationUseCase.execute(body.data);

		return response.status(201).send(result);
	}
}
