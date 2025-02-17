import { FastifyInstance } from 'fastify';
import { RefreshTokenController } from '../controller/RefreshTokenController';

const refreshTokenController = new RefreshTokenController();

export async function authRoutes(app: FastifyInstance) {
	app.patch('/token/refresh', refreshTokenController.handle);
}
