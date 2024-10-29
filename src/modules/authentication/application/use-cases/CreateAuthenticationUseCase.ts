import { InvalidCredentialsError } from '@api/modules/common/errors/InvalidCredentialsError';
import { User } from '@api/modules/users/domain/entities/User';
import { UsersRepository } from '@api/modules/users/domain/repositories/UsersRepository';
import { PasswordEncryptor } from '@api/modules/users/infraestructure/adapters/PasswordEncryptor';

interface ExecuteParams {
	email: string;
	password: string;
}

interface ExecuteResponse {
	user: User;
}

export class CreateAuthenticationUseCase {
	constructor(private readonly usersRepository: UsersRepository) {}

	async execute({ email, password }: ExecuteParams): Promise<ExecuteResponse> {
		const user = await this.usersRepository.findByEmail(email);

		if (!user) {
			throw new InvalidCredentialsError();
		}

		const isMatchingPassword = PasswordEncryptor.compare(password, user.password);

		if (!isMatchingPassword) {
			throw new InvalidCredentialsError();
		}

		return { user };
	}
}
