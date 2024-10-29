import { CreateUserAuthenticateController } from '@api/modules/authentication/interface/controller/CreateUserAuthenticationController';
import { CreateUserController } from '@api/modules/users/interface/controllers/CreateUserController';
import { FastifyInstance } from 'fastify';
import { FastifyPluginCallback } from 'fastify';

const createUserController = new CreateUserController();
const createAuthenticationController = new CreateUserAuthenticateController();

export const routes: FastifyPluginCallback = (app: FastifyInstance, _opts, done) => {
	app.post('/users', createUserController.handle);
	app.post('/users/authenticate', createAuthenticationController.handle);
	done();
};
