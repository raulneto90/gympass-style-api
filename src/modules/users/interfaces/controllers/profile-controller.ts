import { FastifyReply, FastifyRequest } from 'fastify';

export class ProfileController {
	async handle(
		request: FastifyRequest,
		reply: FastifyReply,
	): Promise<FastifyReply> {
		return reply.send('Hello, world!');
	}
}
