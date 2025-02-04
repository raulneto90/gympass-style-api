import { describe, expect, it } from 'vitest';
import { SearchGymsUseCase } from '../application/use-cases/search-gyms-use-case';
import { makeSearchGymsUseCase } from './make-search-gyms-use-case';

describe('makeSearchGymsUseCase Factory', () => {
	it('should create an instance of SearchGymsUseCase', () => {
		const searchGymsUseCase = makeSearchGymsUseCase();
		expect(searchGymsUseCase).toBeInstanceOf(SearchGymsUseCase);
	});
});
