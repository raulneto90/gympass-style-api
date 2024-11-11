import { Gym } from '../../domain/entities/Gym';
import { GymsRepository } from '../../domain/repositories/GymsRepository';
import { GymsMapper } from '../mappers/GymsMapper';

export class InMemoryGymsRepository implements GymsRepository {
	private gyms: Gym[] = [];

	async create(data: Gym): Promise<Gym> {
		this.gyms.push(data);

		return data;
	}

	async findById(id: string): Promise<Gym | null> {
		const gym = this.gyms.find(gym => gym.id === id);

		if (!gym) {
			return null;
		}

		return GymsMapper.toDomain(gym);
	}
}
