import { compareSync, hashSync } from 'bcryptjs';

export class PasswordEncryptor {
	static encrypt(password: string): string {
		return hashSync(password, 8);
	}

	static compare(password: string, hashedPassword: string): boolean {
		return compareSync(password, hashedPassword);
	}
}
