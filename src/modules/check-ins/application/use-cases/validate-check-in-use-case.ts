import { EntityNotFoundError } from '@src/modules/common/errors/entity-not-found.error';
import { CheckInsRepository } from '../../domain/repositories/check-ins.repository';

export class ValidateCheckinUseCase {
	constructor(private readonly checkinsRepository: CheckInsRepository) {}

	async execute(checkinId: string): Promise<void> {
		const checkin = await this.checkinsRepository.findById(checkinId);

		if (!checkin) {
			throw new EntityNotFoundError('CheckIn not found');
		}

		Object.assign(checkin, { validatedAt: new Date() });

		await this.checkinsRepository.save(checkin);
	}
}
