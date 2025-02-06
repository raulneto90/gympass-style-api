import { app } from '@src/app';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('CreateUserController', () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it('should be able to create an user', async () => {
		const response = await request(app.server).post('/v1/users').send({
			name: 'John Doe',
			email: 'johndoe@example.com',
			password: '123456',
		});

		expect(response.statusCode).toBe(201);
	});
});
