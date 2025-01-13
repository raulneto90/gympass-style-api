import { InvalidCredentialsError } from '@src/modules/common/errors/invalid-credentials.error';
import { UsersRepository } from '@src/modules/users/domain/repositories/users.repository';
import { PasswordHash } from '../../domain/services/password-hash';
import { AuthenticateUserDTO } from '../../dtos/authenticate-user.dto';

export class AuthenticateUseCase {
	constructor(
		private readonly userRepository: UsersRepository,
		private readonly passwordHash: PasswordHash,
	) {}

	async execute({ email, password }: AuthenticateUserDTO): Promise<void> {
		const user = await this.userRepository.findByEmail(email);

		if (!user) {
			throw new InvalidCredentialsError();
		}

		const doesPasswordMatches = this.passwordHash.compare(
			password,
			user.password,
		);

		if (!doesPasswordMatches) {
			throw new InvalidCredentialsError();
		}
	}
}
