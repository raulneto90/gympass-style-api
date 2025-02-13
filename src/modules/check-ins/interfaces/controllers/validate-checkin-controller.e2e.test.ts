import { app } from '@src/app';
import { createAndAuthenticateUser } from '@src/tests/services/create-and-authenticate-user';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('ValidateCheckinController', () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it('should be able to validate a checkin', async () => {
		const { token } = await createAndAuthenticateUser(app);

		const gymResponse = await request(app.server)
			.post('/v1/gyms')
			.set('Authorization', `Bearer ${token}`)
			.send({
				title: 'Gym 1',
				description: 'Gym 1 description',
				phone: '123456789',
				latitude: -23.56789,
				longitude: -46.78901,
			});

		const checkinResponse = await request(app.server)
			.post(`/v1/gyms/${gymResponse.body.id}/check-ins`)
			.set('Authorization', `Bearer ${token}`)
			.send({
				latitude: -23.56789,
				longitude: -46.78901,
			});

		const response = await request(app.server)
			.post(`/v1/check-ins/${checkinResponse.body.id}/validate`)
			.set('Authorization', `Bearer ${token}`);

		expect(response.statusCode).toBe(201);
	});
});
