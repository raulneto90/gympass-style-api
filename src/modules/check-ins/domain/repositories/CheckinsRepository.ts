import { Checkin } from '../entities/Checkin';

export interface CheckinsRepository {
	create(data: Pick<Checkin, 'gymId' | 'userId'>): Promise<Checkin>;
	findByIdAndDate(id: string, date: Date): Promise<Checkin | null>;
}
