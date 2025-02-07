import { app } from '@src/app';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('ProfileController', () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it('should be able to authenticate', async () => {
		await request(app.server).post('/v1/users').send({
			name: 'John Doe',
			email: 'johndoe@example.com',
			password: '123456',
		});

		const authResponse = await request(app.server).post('/v1/sessions').send({
			email: 'johndoe@example.com',
			password: '123456',
		});

		const { token } = authResponse.body;

		const response = await request(app.server)
			.get('/v1/me')
			.set('Authorization', `Bearer ${token}`)
			.send();

		expect(response.statusCode).toBe(200);
		expect(response.body).toEqual(
			expect.objectContaining({
				id: expect.any(String),
				email: 'johndoe@example.com',
			}),
		);
	});
});
