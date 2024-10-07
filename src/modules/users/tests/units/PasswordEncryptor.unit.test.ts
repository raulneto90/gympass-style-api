import { describe, expect, it } from 'vitest';
import { PasswordEncryptor } from '../../infraestructure/adapters/PasswordEncryptor';

describe('PasswordEncryptor', () => {
	it('should encrypt a password', () => {
		const password = 'mySecretPassword';
		const hashedPassword = PasswordEncryptor.encrypt(password);

		expect(hashedPassword).not.toBe(password);
		expect(hashedPassword).toBeDefined();
		expect(hashedPassword.length).toBeGreaterThan(0);
	});

	it('should compare a password with its hashed version successfully', () => {
		const password = 'mySecretPassword';
		const hashedPassword = PasswordEncryptor.encrypt(password);

		const isMatch = PasswordEncryptor.compare(password, hashedPassword);

		expect(isMatch).toBe(true);
	});

	it('should fail to compare a password with an incorrect hashed version', () => {
		const password = 'mySecretPassword';
		const hashedPassword = PasswordEncryptor.encrypt(password);
		const wrongPassword = 'wrongPassword';

		const isMatch = PasswordEncryptor.compare(wrongPassword, hashedPassword);

		expect(isMatch).toBe(false);
	});
});
