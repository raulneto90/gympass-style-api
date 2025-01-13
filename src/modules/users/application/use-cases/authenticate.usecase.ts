import { env } from '@src/config/environment';
import { InvalidCredentialsError } from '@src/modules/common/errors/invalid-credentials.error';
import { UsersRepository } from '@src/modules/users/domain/repositories/users.repository';
import { PasswordHash } from '../../domain/services/password-hash';
import { TokenGeneratorService } from '../../domain/services/token-generator';
import { AuthenticateUserDTO } from '../../dtos/authenticate-user.dto';

interface Response {
	token: string;
	type: string;
	expiresIn: string;
}

export class AuthenticateUseCase {
	constructor(
		private readonly userRepository: UsersRepository,
		private readonly passwordHash: PasswordHash,
		private readonly tokenGeneratorService: TokenGeneratorService,
	) {}

	async execute({ email, password }: AuthenticateUserDTO): Promise<Response> {
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

		const token = this.tokenGeneratorService.sign(user.id);

		return { token, type: 'Bearer', expiresIn: env.JWT_EXPIRATION };
	}
}
