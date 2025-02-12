import { FastifyReply, FastifyRequest } from 'fastify';
import { getCheckinHistorySchema } from '../../dtos/get-checkin-history-dto';
import { makeGetCheckinHistoryUseCase } from '../../factories/make-get-check-in-history-use-case';
import { makeGetUserCheckinsMetricsUseCase } from '../../factories/make-get-user-checkin-metric-use-case';

export class GetUserCheckinMetricsController {
	async handle(request: FastifyRequest, reply: FastifyReply) {
		const getUserCheckinMetricsUseCase = makeGetUserCheckinsMetricsUseCase();

		const metrics = await getUserCheckinMetricsUseCase.execute({
			userId: request.user.sub,
		});

		return reply.status(200).send(metrics);
	}
}
