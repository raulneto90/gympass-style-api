import { app } from '@src/app';
import request from 'supertest';
import { describe, expect, it } from 'vitest';

describe('AuthenticateUserController', () => {
	it('should be able to authenticate', async () => {
		await request(app.server).post('/v1/users').send({
			name: 'John Doe',
			email: 'johndoe@example.com',
			password: '123456',
		});

		const response = await request(app.server).post('/v1/sessions').send({
			email: 'johndoe@example.com',
			password: '123456',
		});

		expect(response.statusCode).toBe(200);
		expect(response.body).toEqual({ token: expect.any(String) });
	});
});
