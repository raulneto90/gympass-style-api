import { CreateUserController } from '@api/modules/users/interface/controllers/CreateUserController';
import { FastifyInstance } from 'fastify';
import { FastifyPluginCallback } from 'fastify';

const createUserController = new CreateUserController();

export const routes: FastifyPluginCallback = (app: FastifyInstance, _opts, done) => {
	app.post('/users', createUserController.handle);
	done();
};
