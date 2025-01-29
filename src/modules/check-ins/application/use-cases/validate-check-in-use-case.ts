import { CheckInAlreadyExpiredError } from '@src/modules/common/errors/check-in-already-expired-error';
import { EntityNotFoundError } from '@src/modules/common/errors/entity-not-found.error';
import dayjs from 'dayjs';
import { CheckInsRepository } from '../../domain/repositories/check-ins.repository';

export class ValidateCheckinUseCase {
	private static readonly MAX_MINUTES_TO_VALIDATE_CHECKIN = 20;

	constructor(private readonly checkinsRepository: CheckInsRepository) {}

	async execute(checkinId: string): Promise<void> {
		const checkin = await this.checkinsRepository.findById(checkinId);

		if (!checkin) {
			throw new EntityNotFoundError('CheckIn not found');
		}

		const distanceInMinutesFromCheckinCreation = dayjs(new Date()).diff(
			checkin.createdAt,
			'minutes',
		);

		if (
			distanceInMinutesFromCheckinCreation >
			ValidateCheckinUseCase.MAX_MINUTES_TO_VALIDATE_CHECKIN
		) {
			throw new CheckInAlreadyExpiredError();
		}

		Object.assign(checkin, { validatedAt: new Date() });

		await this.checkinsRepository.save(checkin);
	}
}
