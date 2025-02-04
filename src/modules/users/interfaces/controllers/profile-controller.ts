import { FastifyReply, FastifyRequest } from 'fastify';

export class ProfileController {
	async handle(
		request: FastifyRequest,
		reply: FastifyReply,
	): Promise<FastifyReply> {
		await request.jwtVerify();

		return reply.send('Hello, world!');
	}
}
