import { Checkin } from '../../domain/entities/Checkin';
import { CheckinsRepository } from '../../domain/repositories/CheckinsRepository';

interface RequestParams {
	userId: string;
	page: number;
}

interface ResponseParams {
	checkins: Checkin[];
}

export class FetchUserCheckinsHistoryUseCase {
	constructor(private checkinsRepository: CheckinsRepository) {}

	async execute(params: RequestParams): Promise<ResponseParams> {
		const checkins = await this.checkinsRepository.findManyByUserId(params.userId, params.page);

		return { checkins };
	}
}
