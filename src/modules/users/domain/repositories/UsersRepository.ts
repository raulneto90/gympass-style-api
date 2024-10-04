import { UserDTO } from '../../application/dtos/User.dto';
import { User } from '../entities/User';

export interface UsersRepository {
	create(data: Pick<UserDTO, 'name' | 'email' | 'password'>): Promise<User>;
	findByEmail(email: string): Promise<User | null>;
}
