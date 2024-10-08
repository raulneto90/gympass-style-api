import { randomUUID } from 'node:crypto';
import { PasswordEncryptor } from '../../infraestructure/adapters/PasswordEncryptor';

interface ConstructorParams {
	id?: string;
	name: string;
	email: string;
	password: string;
	createdAt?: Date;
	updatedAt?: Date;
}

export class User {
	readonly id?: string;
	readonly name: string;
	readonly email: string;
	readonly password: string;
	readonly createdAt?: Date;
	readonly updatedAt?: Date;

	constructor(data: ConstructorParams) {
		this.id = data.id;
		this.name = data.name;
		this.email = data.email;
		this.password = data.password;
		this.createdAt = data.createdAt;
		this.updatedAt = data.updatedAt;
	}

	static create(data: ConstructorParams): User {
		const passwordHash = PasswordEncryptor.encrypt(data.password);
		return new User({
			...data,
			password: passwordHash,
			createdAt: data.createdAt ?? new Date(),
			updatedAt: data.updatedAt ?? new Date(),
			id: data.id ?? randomUUID(),
		});
	}
}
