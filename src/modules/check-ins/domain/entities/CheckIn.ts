import { randomUUID } from 'node:crypto';

interface ConstructorParams {
	id?: string;
	userId: string;
	gymId: string;
	validatedAt?: Date;
	createdAt?: Date;
}

export class Checkin {
	readonly id: string;
	readonly userId: string;
	readonly gymId: string;
	readonly validatedAt?: Date;
	readonly createdAt?: Date;

	constructor(props: ConstructorParams) {
		this.id = props.id ?? randomUUID();
		this.userId = props.userId;
		this.gymId = props.gymId;
		this.validatedAt = props.validatedAt;
		this.createdAt = props.createdAt ?? new Date();
	}
}
