import { FastifyReply, FastifyRequest } from 'fastify';
import { searchNearbyGymsSchema } from '../../dtos/search-nearby-gyms-dto';
import { makeSearchNearbyGymsUseCase } from '../../factories/make-search-nearby-gyms-use-case';

export class SearchNearbyGymsController {
	async handle(request: FastifyRequest, reply: FastifyReply) {
		const { userLatitude, userLongitude } = searchNearbyGymsSchema.parse(
			request.body,
		);

		const searchNearbyGymsUseCase = makeSearchNearbyGymsUseCase();

		const gyms = await searchNearbyGymsUseCase.execute({
			userLatitude,
			userLongitude,
		});

		return reply.status(200).send(gyms);
	}
}
