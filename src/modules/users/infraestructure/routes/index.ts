import { verifyJWT } from '@src/modules/common/interfaces/middlewares/verify-jwt';
import { CreateUsersController } from '@src/modules/users/interfaces/controllers/create-user-controller';
import { FastifyInstance } from 'fastify';
import { ProfileController } from '../../interfaces/controllers/profile-controller';

const createUserController = new CreateUsersController();
const profileController = new ProfileController();

export function usersRoutes(app: FastifyInstance) {
	app.post('/v1/users', createUserController.handle);
	app.get('/v1/me', { onRequest: [verifyJWT] }, profileController.handle);
}
