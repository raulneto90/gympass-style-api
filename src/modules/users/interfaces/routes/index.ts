import { verifyJWT } from '@src/modules/common/interfaces/middlewares/verify-jwt';
import { CreateUsersController } from '@src/modules/users/interfaces/controllers/create-user-controller';
import { FastifyInstance } from 'fastify';
import { ProfileController } from '../controllers/profile-controller';

const createUserController = new CreateUsersController();
const profileController = new ProfileController();

export function usersRoutes(app: FastifyInstance) {
	app.post('/users', createUserController.handle);
	app.get('/me', { onRequest: [verifyJWT] }, profileController.handle);
}
