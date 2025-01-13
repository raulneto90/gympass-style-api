import bcrypt from 'bcryptjs';
import { describe, expect, it, vi } from 'vitest';
import { BcryptPasswordHash } from './bcrypt-password-hash';

vi.mock('bcryptjs');

describe('BcryptPasswordHash', () => {
	const passwordHash = new BcryptPasswordHash();

	it('should hash a password', () => {
		const password = 'my-password';
		const hash = 'hashed-password';

		vi.spyOn(bcrypt, 'hashSync').mockReturnValue(hash);

		const result = passwordHash.hash(password);

		expect(result).toBe(hash);
		expect(bcrypt.hashSync).toHaveBeenCalledWith(password, 8);
	});

	it('should compare a password with a hash', () => {
		const password = 'my-password';
		const hash = 'hashed-password';

		vi.spyOn(bcrypt, 'compareSync').mockReturnValue(true);

		const result = passwordHash.compare(password, hash);

		expect(result).toBe(true);
		expect(bcrypt.compareSync).toHaveBeenCalledWith(password, hash);
	});

	it('should return false if password does not match hash', () => {
		const password = 'my-password';
		const hash = 'hashed-password';

		vi.spyOn(bcrypt, 'compareSync').mockReturnValue(false);

		const result = passwordHash.compare(password, hash);

		expect(result).toBe(false);
		expect(bcrypt.compareSync).toHaveBeenCalledWith(password, hash);
	});
});
