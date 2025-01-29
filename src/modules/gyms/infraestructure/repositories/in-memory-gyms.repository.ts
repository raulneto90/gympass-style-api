import { Gym } from '../../domain/entities/Gym';
import { GymsRepository } from '../../domain/repositories/gyms.repository';
import { CreateGymDTO } from '../../dtos/create-gym.dto';
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
}
