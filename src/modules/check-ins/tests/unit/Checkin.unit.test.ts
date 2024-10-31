import { randomUUID } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import { Checkin } from '../../domain/entities/Checkin';

describe('Checkin', () => {
	it('should be able to create an instance of Checkin with all data', () => {
		const checkin = new Checkin({
			gymId: randomUUID(),
			userId: randomUUID(),
			createdAt: new Date(),
			id: randomUUID(),
			validatedAt: new Date(),
		});

		expect(checkin).toBeDefined();
		expect(checkin.gymId).toBeDefined();
		expect(checkin.userId).toBeDefined();
		expect(checkin.createdAt).toBeDefined();
		expect(checkin.id).toBeDefined();
		expect(checkin.validatedAt).toBeDefined();
	});

	it('should create an instance of checkin using the static method create', () => {
		const checkin = Checkin.create({
			gymId: randomUUID(),
			userId: randomUUID(),
			createdAt: new Date(),
			id: randomUUID(),
			validatedAt: new Date(),
		});

		expect(checkin).toBeDefined();
		expect(checkin.gymId).toBeDefined();
		expect(checkin.userId).toBeDefined();
		expect(checkin.createdAt).toBeDefined();
		expect(checkin.id).toBeDefined();
		expect(checkin.validatedAt).toBeDefined();
	});
});
