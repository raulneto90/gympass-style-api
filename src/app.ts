import fastify from 'fastify';
import { ZodError } from 'zod';
import { GlobalError } from './modules/common/errors/GlobalError';
import { routes } from './modules/common/interface/routes/routes';

export const app = fastify();

app.register(routes);

app.setErrorHandler((error, request, reply) => {
	if (error instanceof ZodError) {
		return reply.status(400).send({
			message: 'Validation error',
			issues: error.format(),
		});
	}

	if (error instanceof GlobalError) {
		return reply.status(error.statusCode).send({ message: error.message });
	}

	return reply.status(500).send({ message: 'Internal server error' });
});
