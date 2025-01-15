import { CreateUserDTO } from '@src/modules/users/dtos/create-user.dto';
import { User } from '../entities/User';

export interface UsersRepository {
	create(data: CreateUserDTO): Promise<User>;
	findByEmail(email: string): Promise<User | null>;
	findById(id: string): Promise<User | null>;
}
