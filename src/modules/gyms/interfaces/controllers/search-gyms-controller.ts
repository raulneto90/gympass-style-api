import { FastifyReply, FastifyRequest } from 'fastify';
import { searchGymsSchema } from '../../dtos/search-gyms-dto';
import { makeSearchGymsUseCase } from '../../factories/make-search-gyms-use-case';

export class SearchGymsController {
	async handle(request: FastifyRequest, reply: FastifyReply) {
		const { page, title } = searchGymsSchema.parse(request.query);

		const searchGymsUseCase = makeSearchGymsUseCase();

		const gyms = await searchGymsUseCase.execute({
			title,
			page,
		});

		return reply.status(200).send(gyms);
	}
}
