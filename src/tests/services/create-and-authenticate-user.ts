import { FastifyInstance } from 'fastify';
import request from 'supertest';

export async function createAndAuthenticateUser(app: FastifyInstance) {
	await request(app.server).post('/v1/users').send({
		name: 'John Doe',
		email: 'johndoe@example.com',
		password: '123456',
	});

	const response = await request(app.server).post('/v1/sessions').send({
		email: 'johndoe@example.com',
		password: '123456',
	});

	const { token } = response.body;

	return { token };
}
