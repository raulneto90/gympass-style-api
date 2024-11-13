import { beforeEach, describe, expect, it } from 'vitest';
import { FetchUserCheckinsHistoryUseCase } from '../application/use-cases/FetchUserCheckinsHistory';
import { CheckinsRepository } from '../domain/repositories/CheckinsRepository';
import { InMemoryCheckinsRepository } from '../infraestructure/repositories/InMemoryCheckinsRepository';

describe('FechMemberCheckinsHistoryUseCase', () => {
	let checkinsRepository: CheckinsRepository;
	let useCase: FetchUserCheckinsHistoryUseCase;

	beforeEach(() => {
		checkinsRepository = new InMemoryCheckinsRepository();
		useCase = new FetchUserCheckinsHistoryUseCase(checkinsRepository);
	});

	it('should be able to fech checkin history', async () => {
		await checkinsRepository.create({
			gymId: '1',
			userId: '1',
		});

		await checkinsRepository.create({
			gymId: '2',
			userId: '1',
		});

		const { checkins } = await useCase.execute({ userId: '1', page: 1 });

		expect(checkins).toBeDefined();
		expect(checkins).toHaveLength(2);
		expect(checkins).toEqual([expect.objectContaining({ gymId: '1' }), expect.objectContaining({ gymId: '2' })]);
	});

	it('should be able to fech paginated checkin history', async () => {
		for (let i = 0; i < 22; i++) {
			await checkinsRepository.create({
				gymId: `${i}`,
				userId: '1',
			});
		}

		const { checkins } = await useCase.execute({ userId: '1', page: 2 });

		expect(checkins).toBeDefined();
		expect(checkins).toHaveLength(2);
		expect(checkins).toEqual([expect.objectContaining({ gymId: '20' }), expect.objectContaining({ gymId: '21' })]);
	});
});
