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

	it('should find a checkin by id and date', async () => {
		const data = { gymId: 'gym1', userId: 'user1' };
		await repository.create(data);
		const foundCheckin = await repository.findByIdAndDate(data.userId, new Date());

		expect(foundCheckin).toBeDefined();
		expect(foundCheckin).toHaveProperty('gymId', data.gymId);
		expect(foundCheckin).toHaveProperty('userId', data.userId);
		expect(foundCheckin).toBeInstanceOf(Checkin);
	});

	it('should return null if no checkin is found by id and date', async () => {
		const foundCheckin = await repository.findByIdAndDate('nonexistentUser', new Date());

		expect(foundCheckin).toBeNull();
	});

	it('should find many checkins by user id', async () => {
		const data1 = { gymId: 'gym1', userId: 'user1' };
		const data2 = { gymId: 'gym2', userId: 'user1' };
		await repository.create(data1);
		await repository.create(data2);

		const checkins = await repository.findManyByUserId('user1', 1);

		expect(checkins).toHaveLength(2);
		expect(checkins[0]).toHaveProperty('gymId', data1.gymId);
		expect(checkins[1]).toHaveProperty('gymId', data2.gymId);
	});

	it('should count checkins by user id', async () => {
		const data1 = { gymId: 'gym1', userId: 'user1' };
		const data2 = { gymId: 'gym2', userId: 'user1' };
		await repository.create(data1);
		await repository.create(data2);

		const count = await repository.countByUserId('user1');

		expect(count).toBe(2);
	});
});
