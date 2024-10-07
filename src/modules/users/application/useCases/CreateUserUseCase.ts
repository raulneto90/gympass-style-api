import { EntityAlreadyExistsEror } from '@api/modules/common/errors/EntityAlreadyExistsError';
import { User } from '../../domain/entities/User';
import { UsersRepository } from '../../domain/repositories/UsersRepository';
import { UserDTO } from '../dtos/User.dto';

type ExecuteParams = Omit<UserDTO, 'id' | 'createdAt' | 'updatedAt'>;

export class CreateUserUseCase {
	constructor(private usersRepository: UsersRepository) {}

	async execute(data: ExecuteParams): Promise<User> {
		const userAlreadyExists = await this.usersRepository.findByEmail(data.email);

		if (userAlreadyExists) {
			throw new EntityAlreadyExistsEror('User already exists');
		}

		const user = User.create(data);

		return this.usersRepository.create(user);
	}
}
