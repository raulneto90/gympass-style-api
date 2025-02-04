import { describe, expect, it } from 'vitest';
import { SearchNearbyGymsUseCase } from '../application/use-cases/search-nearby-gyms-use-case';
import { makeSearchNearbyGymsUseCase } from './make-search-nearby-gyms-use-case';

describe('makeSearchNearbyGymsUseCase', () => {
	it('should create an instance of SearchNearbyGymsUseCase', () => {
		const useCase = makeSearchNearbyGymsUseCase();
		expect(useCase).toBeInstanceOf(SearchNearbyGymsUseCase);
	});
});
