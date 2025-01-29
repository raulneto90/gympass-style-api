import { CreateCheckinDTO } from '../../dtos/create-checkin-dto';
import { Checkin } from '../entities/CheckIn';

export interface CheckInsRepository {
	create(data: Pick<CreateCheckinDTO, 'gymId' | 'userId'>): Promise<Checkin>;
	findByUserIdOnDate(userId: string, date: Date): Promise<Checkin | null>;
	findById(id: string): Promise<Checkin | null>;
	findManyByUserId(userId: string, page: number): Promise<Checkin[]>;
	countByUserId(userId: string): Promise<number>;
	save(checkin: Checkin): Promise<void>;
}
