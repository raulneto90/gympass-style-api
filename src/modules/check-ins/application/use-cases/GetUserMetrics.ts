import { CheckinsRepository } from '../../domain/repositories/CheckinsRepository';

interface RequestParams {
	userId: string;
}

export class GetUserMetrics {
	constructor(private readonly checkInRepository: CheckinsRepository) {}

	async execute({ userId }: RequestParams) {
		const totalCheckins = await this.checkInRepository.countByUserId(userId);

		return {
			totalCheckins,
		};
	}
}
