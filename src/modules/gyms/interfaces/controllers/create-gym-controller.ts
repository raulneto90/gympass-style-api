import { FastifyReply, FastifyRequest } from 'fastify';
import { createGymSchema } from '../../dtos/create-gym.dto';
import { makeCreateGymUseCase } from '../../factories/make-create-gym-use-case';

export class CreateGymController {
	async handle(request: FastifyRequest, reply: FastifyReply) {
		const { title, phone, description, latitude, longitude } =
			createGymSchema.parse(request.body);

		const createGymUseCase = makeCreateGymUseCase();

		await createGymUseCase.execute({
			title,
			phone,
			description,
			latitude,
			longitude,
		});

		return reply.status(201).send();
	}
}
