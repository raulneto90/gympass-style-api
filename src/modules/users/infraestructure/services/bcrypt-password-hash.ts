import { PasswordHash } from '@src/modules/users/domain/services/password-hash';
import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 8;

export class BcryptPasswordHash implements PasswordHash {
	hash(password: string): string {
		return bcrypt.hashSync(password, SALT_ROUNDS);
	}
	compare(password: string, hash: string): boolean {
		return bcrypt.compareSync(password, hash);
	}
}
