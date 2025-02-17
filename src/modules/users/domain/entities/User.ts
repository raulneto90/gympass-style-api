import { randomUUID } from 'node:crypto';

interface ConstructorParams {
	name: string;
	email: string;
	password: string;
	id?: string;
	createdAt?: Date;
	role?: string;
}

export class User {
	readonly id: string;
	readonly name: string;
	readonly email: string;
	readonly password: string;
	readonly role: string;
	readonly createdAt: Date;

	constructor({
		name,
		email,
		password,
		id,
		createdAt,
		role,
	}: ConstructorParams) {
		this.id = id ?? randomUUID();
		this.name = name;
		this.email = email;
		this.password = password;
		this.role = role ?? 'MEMBER';
		this.createdAt = createdAt ?? new Date();
	}
}
