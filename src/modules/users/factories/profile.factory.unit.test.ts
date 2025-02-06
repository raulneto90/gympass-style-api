import { describe, expect, it } from 'vitest';
import { ProfileUseCase } from '../application/use-cases/profile-use-case';
import { makeProfileUseCase } from './profile.factory';

describe('MakeProfileUseCase', () => {
	it('should create an instance of ProfileUseCase', () => {
		const useCase = makeProfileUseCase();

		expect(useCase).toBeInstanceOf(ProfileUseCase);
	});
});
