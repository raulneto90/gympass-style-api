import { CreateUserDTO } from '@src/common/dtos/create-user.dto';
import { User } from '../entities/User';

export interface UsersRepository {
	create(data: CreateUserDTO): Promise<User>;
	findByEmail(email: string): Promise<User | null>;
}
