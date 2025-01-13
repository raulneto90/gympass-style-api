import jwt from 'jsonwebtoken';
import { Mock, beforeEach, describe, expect, it, vi } from 'vitest';
import { TokenGeneratorService } from '../../domain/services/token-generator';
import { JsonWebTokenService } from './jsonwebtoken.service';

vi.mock('jsonwebtoken');

describe('JsonWebTokenService', () => {
	let tokenGeneratorService: TokenGeneratorService;

	beforeEach(() => {
		tokenGeneratorService = new JsonWebTokenService();
	});

	it('should return a token', () => {
		const payload = { id: '123' };

		(jwt.sign as Mock).mockReturnValue('token');

		const token = tokenGeneratorService.sign(payload);

		expect(token).toBeDefined();
		expect(token).toEqual(expect.any(String));
		expect(jwt.sign).toHaveBeenCalledWith(payload, expect.any(String), {
			expiresIn: expect.any(String),
		});
	});

	it('should return a payload', () => {
		const token = 'my-token';
		const decoded = { id: '123' };

		(jwt.verify as Mock).mockReturnValue(decoded);

		const result = tokenGeneratorService.verify(token);

		expect(result).toBeDefined();
		expect(result).toEqual(decoded);
		expect(jwt.verify).toHaveBeenCalledWith(token, expect.any(String));
	});
});
