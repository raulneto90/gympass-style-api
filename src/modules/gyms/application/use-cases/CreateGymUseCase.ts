import { Gym } from '../../domain/entities/Gym';
import { GymsRepository } from '../../domain/repositories/GymsRepository';

interface RequestParams {
	title: string;
	description: string | null;
	phone: string | null;
	latitude: number;
	longitude: number;
}

export class CreateGymUseCase {
	constructor(private readonly gymsRepository: GymsRepository) {}

	async execute(params: RequestParams): Promise<Gym> {
		const data = Gym.create(params);

		return this.gymsRepository.create(data);
	}
}
