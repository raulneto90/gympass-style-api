import { randomUUID } from 'node:crypto';

interface ConstructorParams {
	name: string;
	email: string;
	password: string;
	id?: string;
	createdAt?: Date;
}

export class User {
	readonly id: string;
	readonly name: string;
	readonly email: string;
	readonly password: string;
	readonly createdAt: Date;

	constructor({ name, email, password, id, createdAt }: ConstructorParams) {
		this.id = id ?? randomUUID();
		this.name = name;
		this.email = email;
		this.password = password;
		this.createdAt = createdAt ?? new Date();
	}
}
