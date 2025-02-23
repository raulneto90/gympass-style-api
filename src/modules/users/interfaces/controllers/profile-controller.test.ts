import { app } from '@src/app';
import { createAndAuthenticateUser } from '@src/tests/services/create-and-authenticate-user';
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
		const { token } = await createAndAuthenticateUser(app);

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
