import { CreateUserController } from '@api/modules/users/interface/controllers/CreateUserController';
import { FastifyInstance } from 'fastify';

const createUserController = new CreateUserController();

export const routes = (app: FastifyInstance) => {
	app.post('/users', createUserController.handle);
};
