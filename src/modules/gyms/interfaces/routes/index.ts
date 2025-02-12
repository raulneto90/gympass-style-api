import { verifyJWT } from '@src/modules/common/interfaces/middlewares/verify-jwt';
import { FastifyInstance } from 'fastify';
import { CreateGymController } from '../controllers/create-gym-controller';
import { SearchGymsController } from '../controllers/search-gyms-controller';
import { SearchNearbyGymsController } from '../controllers/search-nearby-gyms-controller';

const createGymController = new CreateGymController();
const searchGymsController = new SearchGymsController();
const searchNearbyGymsController = new SearchNearbyGymsController();

export function gymsRoutes(app: FastifyInstance) {
	app.addHook('onRequest', verifyJWT);
	app.post('/gyms', createGymController.handle);
	app.get('/gyms', searchGymsController.handle);
	app.get('/gyms/nearby', searchNearbyGymsController.handle);
}
