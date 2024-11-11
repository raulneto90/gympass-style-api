import { GlobalError } from '@api/modules/common/errors/GlobalError';
import { NotFoundError } from '@api/modules/common/errors/NotFoundError';
import { GymsRepository } from '@api/modules/gyms/domain/repositories/GymsRepository';
import { Checkin } from '../../domain/entities/Checkin';
import { CheckinsRepository } from '../../domain/repositories/CheckinsRepository';

interface RequestParams {
	userId: string;
	gymId: string;
	userLatitude: number;
	userLongitude: number;
}

interface ResponseParams {
	checkin: Checkin;
}

export class CreateCheckinUseCase {
	constructor(
		private readonly checkinsRepository: CheckinsRepository,
		private readonly gymsRepository: GymsRepository,
	) {}

	async execute(data: RequestParams): Promise<ResponseParams> {
		const gym = await this.gymsRepository.findById(data.gymId);

		if (!gym) {
			throw new NotFoundError('Gym not found');
		}

		const isAlreadyCheckedIn = await this.checkinsRepository.findByIdAndDate(data.userId, new Date());

		if (isAlreadyCheckedIn) {
			throw new GlobalError('User is already checked in', 400);
		}

		const input = Checkin.create({ gymId: data.gymId, userId: data.userId });

		const checkin = await this.checkinsRepository.create(input);

		return { checkin };
	}
}
