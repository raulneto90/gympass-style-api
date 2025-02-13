import fastifyJwt from '@fastify/jwt';
import fastify from 'fastify';
import { ZodError } from 'zod';
import { env } from './config/environment';
import { checkinsRoutes } from './modules/check-ins/interfaces/routes';
import { GlobalError } from './modules/common/errors/global.error';
import { gymsRoutes } from './modules/gyms/interfaces/routes';
import { usersRoutes } from './modules/users/interfaces/routes';

export const app = fastify();
const APP_PREFIX = '/v1';

app.register(fastifyJwt, {
	secret: env.JWT_SECRET,
});

app.register(usersRoutes, { prefix: APP_PREFIX });
app.register(gymsRoutes, { prefix: APP_PREFIX });
app.register(checkinsRoutes, { prefix: APP_PREFIX });
app.setErrorHandler((error, _request, reply) => {
	if (error instanceof ZodError) {
		return reply.status(400).send({
			message: 'Validation error',
			issues: error.format(),
		});
	}

	if (error instanceof GlobalError) {
		return reply.status(error.statusCode).send({
			message: error.message,
		});
	}

	if (env.NODE_ENV !== 'production') {
		console.error(error);
	} else {
		// TODO: Send error to monitoring service
	}

	return reply.status(500).send({
		message: 'Internal server error',
	});
});
