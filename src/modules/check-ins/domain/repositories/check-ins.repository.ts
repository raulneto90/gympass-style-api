import { CreateCheckinDTO } from '../../dtos/create-checkin.dto';
import { Checkin } from '../entities/CheckIn';

export interface CheckInsRepository {
	create(data: CreateCheckinDTO): Promise<Checkin>;
	findByUserIdOnDate(userId: string, date: Date): Promise<Checkin | null>;
	findManyByUserId(userId: string, page: number): Promise<Checkin[]>;
}
