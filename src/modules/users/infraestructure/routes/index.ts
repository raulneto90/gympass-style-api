import { CreateUsersController } from '@src/modules/users/interfaces/controllers/create-user.controller';
import { FastifyInstance } from 'fastify';

const createUserController = new CreateUsersController();

export function usersRoutes(app: FastifyInstance) {
	app.post('/v1/users', createUserController.handle);
}
