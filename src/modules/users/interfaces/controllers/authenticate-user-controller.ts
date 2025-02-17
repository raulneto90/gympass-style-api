import { env } from '@src/config/environment';
import { FastifyReply, FastifyRequest } from 'fastify';
import { authenticateUserSchema } from '../../dtos/authenticate-user.dto';
import { makeAuthenticateUserUseCase } from '../../factories/authenticate-user.factory';

export class AuthenticateUserController {
	async handle(request: FastifyRequest, reply: FastifyReply) {
		const validation = authenticateUserSchema.safeParse(request.body);

		if (!validation.success) {
			return reply.code(400).send(validation.error.format());
		}

		const authenticateUseCase = makeAuthenticateUserUseCase();

		const { user } = await authenticateUseCase.execute(validation.data);

		const token = await reply.jwtSign(
			{},
			{
				sign: {
					sub: user.id,
				},
			},
		);

		const refreshToken = await reply.jwtSign(
			{},
			{
				sign: {
					sub: user.id,
					expiresIn: env.REFRESH_TOKEN_EXPIRATION,
				},
			},
		);

		return reply
			.setCookie('refreshToken', refreshToken, {
				httpOnly: true,
				secure: true,
				sameSite: true,
				path: '/',
			})
			.code(200)
			.send({ type: 'Bearer', token, expiresIn: env.JWT_EXPIRATION });
	}
}
