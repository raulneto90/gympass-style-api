import { EntityNotFoundError } from '@src/modules/common/errors/entity-not-found.error';
import { User } from '../../domain/entities/User';
import { UsersRepository } from '../../domain/repositories/users.repository';
import { ProfileDTO } from '../../dtos/profile.dto';

type Response = {
	user: User;
};

export class ProfileUseCase {
	constructor(private readonly usersRepository: UsersRepository) {}

	async execute({ id }: ProfileDTO): Promise<Response> {
		const user = await this.usersRepository.findById(id);

		if (!user) {
			throw new EntityNotFoundError('User does not exists');
		}

		return { user };
	}
}
