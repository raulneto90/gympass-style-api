import { afterEach } from 'node:test';
import { app } from '@api/app';
import { prisma } from '@api/modules/common/config/prisma';
import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { makeUser } from '../fixtures/user';

describe('CreateUserUseCase - E2E tests', () => {
	afterEach(() => {
		prisma.user.deleteMany();
	});

	it('should create a user', async () => {
		const input = makeUser();

		const response = await request(app.server).post('/users').send(input);

		expect(response.status).toBe(201);
		expect(response.body).toHaveProperty('id');
		expect(response.body.name).toBe('John Doe');
		expect(response.body.email).toBe('john.doe@example.com');
	});

	// it('should return an error if the user already exists', async () => {});
});
