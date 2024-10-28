import { beforeEach, describe, it } from 'vitest';
import { UsersRepository } from '../../domain/repositories/UsersRepository';
import { CreateUserUseCase } from './CreateUserUseCase';

describe('CreateUserUseCase', () => {
	let useCase: CreateUserUseCase;
	let repository: UsersRepository;

	beforeEach(() => {
		useCase = new CreateUserUseCase(repository);
	});

	it('should create a user', () => {});

	it('should throw an error if the user already exists', () => {});

	it('should hash user password', () => {});
});
