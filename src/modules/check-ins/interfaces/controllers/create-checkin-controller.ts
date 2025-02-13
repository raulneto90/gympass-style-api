import { FastifyReply, FastifyRequest } from 'fastify';
import {
	createCheckinParamsSchema,
	createCheckinSchema,
} from '../../dtos/create-checkin-dto';
import { makeCreateCheckinsUseCase } from '../../factories/make-create-check-ins-use-case';

export class CreateCheckinController {
	async handle(request: FastifyRequest, reply: FastifyReply) {
		const { latitude, longitude } = createCheckinSchema.parse(request.body);

		const { gymId } = createCheckinParamsSchema.parse(request.params);

		const createCheckinUseCase = makeCreateCheckinsUseCase();

		const { checkin } = await createCheckinUseCase.execute({
			latitude,
			longitude,
			gymId,
			userId: request.user.sub,
		});

		return reply.status(201).send(checkin);
	}
}
