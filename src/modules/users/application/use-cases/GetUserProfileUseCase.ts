import { NotFoundError } from '@api/modules/common/errors/NotFoundError';
import { User } from '../../domain/entities/User';
import { UsersRepository } from '../../domain/repositories/UsersRepository';

export class GetUserProfileUseCase {
	constructor(private usersRepository: UsersRepository) {}

	async execute(userId: string): Promise<Partial<User>> {
		const user = await this.usersRepository.findById(userId);

		if (!user) {
			throw new NotFoundError('User not found');
		}

		return {
			id: user.id,
			name: user.name,
			email: user.email,
		};
	}
}
