import { GymsRepository } from '../../domain/repositories/gyms.repository';
import { SearchNearbyGymsDTO } from '../../dtos/search-nearby-gyms-dto';

export class SearchNearbyGymsUseCase {
	constructor(private readonly gymsRepository: GymsRepository) {}

	async execute({ userLatitude, userLongitude }: SearchNearbyGymsDTO) {
		return this.gymsRepository.searchManyNearby({
			userLatitude,
			userLongitude,
		});
	}
}
