import { Gym } from '../entities/Gym';

export interface GymsRepository {
	create(data: Gym): Promise<Gym>;
	findById(id: string): Promise<Gym | null>;
}
