import { prisma } from '@api/modules/common/config/prisma';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { CreateUserUseCase } from '../../application/useCases/CreateUserUseCase';
import { User } from '../../domain/entities/User';
import { UsersRepository } from '../../domain/repositories/UsersRepository';
import { PasswordEncryptor } from '../../infraestructure/adapters/PasswordEncryptor';
import { InMemoryUsersRepository } from '../../infraestructure/repositories/InMemoryUsersRepository';
import { makeUser } from '../fixtures/user';

describe('CreateUserUseCase - Unit tests', () => {
	let createUserUseCase: CreateUserUseCase;
	let usersRepository: UsersRepository;

	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository();
		createUserUseCase = new CreateUserUseCase(usersRepository);
	});

	it('should create a user', async () => {
		const input = User.create(makeUser());

		const result = await createUserUseCase.execute(input);

		expect(result).toBeInstanceOf(User);
		expect(result.id).toBeDefined();
		expect(result.name).toBe(input.name);
		expect(result.email).toBe(input.email);
		expect(result).toHaveProperty('password');
		expect(result.createdAt).toBeDefined();
		expect(result.updatedAt).toBeDefined();
	});

	it('should throw an error if the user already exists', async () => {
		const input = User.create(makeUser());

		await usersRepository.create(input);

		expect(createUserUseCase.execute(input)).rejects.toThrow('User already exists');
	});

	it('should hash user password', async () => {
		const input = User.create(makeUser());

		prisma.user.findUnique = vi.fn().mockResolvedValue(null);
		prisma.user.create = vi.fn().mockResolvedValue(input);

		vi.spyOn(PasswordEncryptor, 'encrypt');

		await createUserUseCase.execute(input);

		expect(PasswordEncryptor.encrypt).toHaveBeenCalledWith(input.password);
	});
});
