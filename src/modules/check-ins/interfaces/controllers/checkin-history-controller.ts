import { FastifyReply, FastifyRequest } from 'fastify';
import { getCheckinHistorySchema } from '../../dtos/get-checkin-history-dto';
import { makeGetCheckinHistoryUseCase } from '../../factories/make-get-check-in-history-use-case';

export class GetCheckinHistoryController {
	async handle(request: FastifyRequest, reply: FastifyReply) {
		const { page } = getCheckinHistorySchema.parse(request.query);

		const getCheckinHistoryUseCase = makeGetCheckinHistoryUseCase();

		const checkinHistory = await getCheckinHistoryUseCase.execute({
			userId: request.user.sub,
			page,
		});

		return reply.status(200).send(checkinHistory);
	}
}
