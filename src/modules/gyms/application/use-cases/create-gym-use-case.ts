import { GymsRepository } from '../../domain/repositories/gyms.repository';
import { CreateGymDTO } from '../../dtos/create-gym.dto';

export class CreateGymUseCase {
	constructor(private readonly gymsRepository: GymsRepository) {}

	async execute(data: CreateGymDTO) {
		await this.gymsRepository.create(data);
	}
}
