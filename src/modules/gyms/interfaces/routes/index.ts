import { verifyJWT } from '@src/modules/common/interfaces/middlewares/verify-jwt';
import { FastifyInstance } from 'fastify';
import { CreateGymController } from '../controllers/create-gym-controller';

const createGymController = new CreateGymController();

export function gymsRoutes(app: FastifyInstance) {
	app.addHook('onRequest', verifyJWT);
	app.post('/gyms', createGymController.handle);
}
