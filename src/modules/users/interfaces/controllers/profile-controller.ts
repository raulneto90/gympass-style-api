import { FastifyReply, FastifyRequest } from 'fastify';
import { makeProfileUseCase } from '../../factories/profile.factory';

export class ProfileController {
	async handle(
		request: FastifyRequest,
		reply: FastifyReply,
	): Promise<FastifyReply> {
		const getUserProfileUseCase = makeProfileUseCase();

		const { user } = await getUserProfileUseCase.execute({
			id: request.user.sub,
		});

		return reply.status(200).send({
			...user,
			password: undefined,
		});
	}
}
