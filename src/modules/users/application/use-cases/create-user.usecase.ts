import { CreateUserDTO } from '@src/modules/common/dtos/create-user.dto';
import { EntityAlreadyExistsError } from '@src/modules/common/errors/entity-already-exists.error';
import { UsersRepository } from '@src/modules/users/domain/repositories/users.repository';
import { PasswordHash } from '@src/modules/users/domain/services/password-hash';

interface Response {
	id: string;
	name: string;
	email: string;
	password: string;
}

export class CreateUserUseCase {
	constructor(
		private passwordHash: PasswordHash,
		private usersRepository: UsersRepository,
	) {}

	async execute(data: CreateUserDTO): Promise<Response> {
		const userAlreadyExists = await this.usersRepository.findByEmail(
			data.email,
		);

		if (userAlreadyExists) {
			throw new EntityAlreadyExistsError('User already exists');
		}

		const passwordHash = this.passwordHash.hash(data.password);

		return this.usersRepository.create({ ...data, password: passwordHash });
	}
}
