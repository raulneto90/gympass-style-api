import { Checkin } from '@api/modules/check-ins/domain/entities/Checkin';
import { InMemoryCheckinsRepository } from '@api/modules/check-ins/infraestructure/repositories/InMemoryCheckinsRepository';
import { beforeEach, describe, expect, it } from 'vitest';

describe('InMemoryCheckinsRepository', () => {
	let repository: InMemoryCheckinsRepository;

	beforeEach(() => {
		repository = new InMemoryCheckinsRepository();
	});

	it('should create a new checkin', async () => {
		const data = { gymId: 'gym1', userId: 'user1' };
		const checkin = await repository.create(data);

		expect(checkin).toBeDefined();
		expect(checkin).toHaveProperty('gymId', data.gymId);
		expect(checkin).toHaveProperty('userId', data.userId);
		expect(checkin).toHaveProperty('createdAt');
		expect(checkin).toBeInstanceOf(Checkin);
	});
});
