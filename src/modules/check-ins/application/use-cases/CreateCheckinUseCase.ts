import { Checkin } from '../../domain/entities/Checkin';
import { CheckinsRepository } from '../../domain/repositories/CheckinsRepository';

interface RequestParams {
	userId: string;
	gymId: string;
}

interface ResponseParams {
	checkin: Checkin;
}

export class CreateCheckinUseCase {
	constructor(private readonly checkinsRepository: CheckinsRepository) {}

	async execute(data: RequestParams): Promise<ResponseParams> {
		const input = Checkin.create({ gymId: data.gymId, userId: data.userId });

		const checkin = await this.checkinsRepository.create(input);

		return { checkin };
	}
}
