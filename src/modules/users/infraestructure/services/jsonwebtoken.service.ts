import { env } from '@src/config/environment';
import jwt from 'jsonwebtoken';
import { TokenGeneratorService } from '../../domain/services/token-generator';

export class JsonWebTokenService implements TokenGeneratorService {
	sign(payload: any): string {
		return jwt.sign(payload, env.JWT_SECRET as string, {
			expiresIn: env.JWT_EXPIRATION,
		});
	}

	verify(token: string) {
		return jwt.verify(token, env.JWT_SECRET as string);
	}
}
