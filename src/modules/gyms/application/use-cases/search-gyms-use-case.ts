import { GymsRepository } from '../../domain/repositories/gyms.repository';
import { SearchGymsDTO } from '../../dtos/search-gyms-dto';

export class SearchGymsUseCase {
	constructor(private readonly gymsRepository: GymsRepository) {}

	async execute({ page, title }: SearchGymsDTO) {
		return this.gymsRepository.searchMany(title, page);
	}
}
