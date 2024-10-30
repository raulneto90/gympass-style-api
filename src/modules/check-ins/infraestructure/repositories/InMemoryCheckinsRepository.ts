import { Checkin } from '../../domain/entities/Checkin';
import { CheckinsRepository } from '../../domain/repositories/CheckinsRepository';

export class InMemoryCheckinsRepository implements CheckinsRepository {
	private checkins: Checkin[] = [];

	async create(data: Pick<Checkin, 'gymId' | 'userId'>): Promise<Checkin> {
		const checkin = Checkin.create(data);

		this.checkins.push(checkin);

		return checkin;
	}
}
