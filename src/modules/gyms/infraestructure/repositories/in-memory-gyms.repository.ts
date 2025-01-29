import { getDistanceBetweenCoordinates } from '@src/modules/check-ins/utils/get-distance-between-coordinates';
import { Gym } from '../../domain/entities/Gym';
import { GymsRepository } from '../../domain/repositories/gyms.repository';
import { CreateGymDTO } from '../../dtos/create-gym.dto';
import { SearchNearbyGymsDTO } from '../../dtos/search-nearby-gyms-dto';
import { GymMapper } from '../../mappers/GymMapper';

export class InMemoryGymsRepository implements GymsRepository {
	private gyms: Gym[] = [];

	async create(data: CreateGymDTO): Promise<void> {
		this.gyms.push(data);
	}

	async findById(id: string): Promise<Gym | null> {
		const gym = this.gyms.find(gym => gym.id === id);

		if (!gym) {
			return null;
		}

		return GymMapper.toDomain(gym);
	}

	async searchMany(query: string, page: number): Promise<Gym[]> {
		const gyms = this.gyms
			.filter(gym => gym.title.includes(query))
			.slice((page - 1) * 20, page * 20 + 20);

		return gyms.map(GymMapper.toDomain);
	}

	async searchManyNearby(data: SearchNearbyGymsDTO): Promise<Gym[]> {
		const gyms = this.gyms.filter(gym => {
			const distance = getDistanceBetweenCoordinates(
				{
					latitude: data.userLatitude,
					longitude: data.userLongitude,
				},
				{
					latitude: gym.latitude,
					longitude: gym.longitude,
				},
			);

			return distance <= 10;
		});

		return gyms.map(GymMapper.toDomain);
	}
}
