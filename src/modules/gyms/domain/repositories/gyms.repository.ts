import { CreateGymDTO } from '../../dtos/create-gym.dto';
import { SearchNearbyGymsDTO } from '../../dtos/search-nearby-gyms-dto';
import { Gym } from '../entities/Gym';

export interface GymsRepository {
	create(data: CreateGymDTO): Promise<void>;
	findById(id: string): Promise<Gym | null>;
	searchMany(query: string, page: number): Promise<Gym[]>;
	searchManyNearby(data: SearchNearbyGymsDTO): Promise<Gym[]>;
}
