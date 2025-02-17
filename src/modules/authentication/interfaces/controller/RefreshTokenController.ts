import { env } from '@src/config/environment';
import { FastifyReply, FastifyRequest } from 'fastify';

export class RefreshTokenController {
	async handle(request: FastifyRequest, reply: FastifyReply) {
		await request.jwtVerify({ onlyCookie: true });

		const token = await reply.jwtSign({}, { sign: { sub: request.user.sub } });
		const refreshToken = await reply.jwtSign(
			{},
			{
				sign: {
					sub: request.user.sub,
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
