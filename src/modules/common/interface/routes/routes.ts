import { AuthenticateController } from '@api/modules/authentication/interface/controller/AuthenticateController';
import { CreateUserController } from '@api/modules/users/interface/controllers/CreateUserController';
import { FastifyInstance } from 'fastify';
import { FastifyPluginCallback } from 'fastify';

const createUserController = new CreateUserController();
const createAuthenticationController = new AuthenticateController();

export const routes: FastifyPluginCallback = (app: FastifyInstance, _opts, done) => {
	app.post('/users', createUserController.handle);
	app.post('/users/authenticate', createAuthenticationController.handle);
	done();
};
