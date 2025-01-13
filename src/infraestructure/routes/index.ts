import { CreateUsersController } from '@src/interfaces/controllers/create-user.controller';
import { FastifyInstance } from 'fastify';

const createUserController = new CreateUsersController();

export function routes(app: FastifyInstance) {
	app.post('/v1/users', createUserController.handle);
}
