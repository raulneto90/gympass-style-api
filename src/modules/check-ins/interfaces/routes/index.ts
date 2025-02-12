import { verifyJWT } from '@src/modules/common/interfaces/middlewares/verify-jwt';
import { FastifyInstance } from 'fastify';
import { GetCheckinHistoryController } from '../controllers/checkin-history-controller';
import { CreateCheckinController } from '../controllers/create-checkin-controller';
import { GetUserCheckinMetricsController } from '../controllers/get-user-checkin-metrics-controller';
import { ValidateCheckinController } from '../controllers/validate-checkin-controller';

const createCheckinController = new CreateCheckinController();
const validateCheckinController = new ValidateCheckinController();
const getUserCheckinMetricsController = new GetUserCheckinMetricsController();
const getCheckinHistoryController = new GetCheckinHistoryController();

export function checkinsRoutes(app: FastifyInstance) {
	app.addHook('onRequest', verifyJWT);
	app.post('/gyms/:gymId/check-ins', createCheckinController.handle);
	app.patch('/check-ins/:checkinId/validate', validateCheckinController.handle);
	app.get('/check-ins/metrics', getUserCheckinMetricsController.handle);
	app.get('/check-ins/history', getCheckinHistoryController.handle);
}
