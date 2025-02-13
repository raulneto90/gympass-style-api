import { app } from '@src/app';
import { createAndAuthenticateUser } from '@src/tests/services/create-and-authenticate-user';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('SearchNearbyGymsController', () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it('should be able to list nearby gyms', async () => {
		const { token } = await createAndAuthenticateUser(app);

		await request(app.server)
			.post('/v1/gyms')
			.set('Authorization', `Bearer ${token}`)
			.send({
				title: 'Gym 1',
				description: 'Gym 1 description',
				phone: '123456789',
				latitude: -23.56789,
				longitude: -46.78901,
			});

		await request(app.server)
			.post('/v1/gyms')
			.set('Authorization', `Bearer ${token}`)
			.send({
				title: 'Gym 2',
				description: 'Gym 2 description',
				phone: '123456789',
				latitude: -27.56789,
				longitude: -49.78901,
			});

		const response = await await request(app.server)
			.get('/v1/gyms/nearby')
			.query({ latitude: -23.56789, longitude: -46.78901 })
			.set('Authorization', `Bearer ${token}`);

		expect(response.statusCode).toBe(200);
		expect(response.body).toEqual([
			expect.objectContaining({
				id: expect.any(String),
				title: 'Gym 1',
			}),
		]);
	});
});
