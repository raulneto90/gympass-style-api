import { EntityNotFoundError } from '@src/modules/common/errors/entity-not-found.error';
import { makeCheckin } from '@src/tests/mocks/checkin';
import { beforeEach, describe, expect, it } from 'vitest';
import { CheckInsRepository } from '../../domain/repositories/check-ins.repository';
import { InMemoryCheckInsRepository } from '../../infraestructure/repositories/in-memory-check-ins.repository';
import { ValidateCheckinUseCase } from './validate-check-in-use-case';

describe('ValidateCheckInUseCase', () => {
	let useCase: ValidateCheckinUseCase;
	let repository: CheckInsRepository;

	beforeEach(() => {
		repository = new InMemoryCheckInsRepository();
		useCase = new ValidateCheckinUseCase(repository);
	});

	it('should validate a check-in', async () => {
		const checkin = await repository.create(makeCheckin());

		await expect(useCase.execute(checkin.id)).resolves.toBeUndefined();
	});

	it('should throw an error if check-in is not found', async () => {
		await expect(useCase.execute('invalid-id')).rejects.toThrowError(
			'CheckIn not found',
		);
		await expect(useCase.execute('invalid-id')).rejects.toBeInstanceOf(
			EntityNotFoundError,
		);
	});
});
