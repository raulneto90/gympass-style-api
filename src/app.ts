import fastify from 'fastify';
import { routes } from './modules/common/interface/routes/routes';

export const app = fastify();

app.register(routes);
