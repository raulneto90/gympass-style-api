import { EntityNotFoundError } from '@src/modules/common/errors/entity-not-found.error';
import { MaxCheckinDistanceError } from '@src/modules/common/errors/max-check-in-distance-error';
import { MaxNumberOfCheckinError } from '@src/modules/common/errors/max-number-of-check-in-error';
import { GymsRepository } from '@src/modules/gyms/domain/repositories/gyms.repository';
import { Checkin } from '../../domain/entities/CheckIn';
import { CheckInsRepository } from '../../domain/repositories/check-ins.repository';
import { CreateCheckinDTO } from '../../dtos/create-checkin-dto';
import { getDistanceBetweenCoordinates } from '../../utils/get-distance-between-coordinates';

type Response = {
	checkin: Checkin;
};

export class CheckinUseCase {
	private static readonly MAX_DISTANCE_IN_KILOMETERS = 0.1;

	constructor(
		private readonly checkinsRepository: CheckInsRepository,
		private readonly gymsRepository: GymsRepository,
	) {}

	async execute({
		gymId,
		latitude,
		longitude,
		userId,
	}: CreateCheckinDTO): Promise<Response> {
		const gym = await this.gymsRepository.findById(gymId);

		if (!gym) {
			throw new EntityNotFoundError('Gym not found');
		}

		const distance = getDistanceBetweenCoordinates(
			{ latitude: gym.latitude, longitude: gym.longitude },
			{ latitude, longitude },
		);

		if (distance > CheckinUseCase.MAX_DISTANCE_IN_KILOMETERS) {
			throw new MaxCheckinDistanceError();
		}

		const checkinOnSameDay = await this.checkinsRepository.findByUserIdOnDate(
			userId,
			new Date(),
		);

		if (checkinOnSameDay) {
			throw new MaxNumberOfCheckinError();
		}

		const checkin = await this.checkinsRepository.create({ gymId, userId });

		return { checkin };
	}
}
