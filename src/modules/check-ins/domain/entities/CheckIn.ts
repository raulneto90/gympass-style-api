import { randomUUID } from 'node:crypto';

interface ConstructorParams {
	id?: string;
	userId: string;
	gymId: string;
	validatedAt?: Date | null;
	createdAt?: Date;
}

export class Checkin {
	readonly id: string;
	readonly userId: string;
	readonly gymId: string;
	readonly validatedAt?: Date | null;
	readonly createdAt?: Date;

	constructor(props: ConstructorParams) {
		this.id = props.id ?? randomUUID();
		this.userId = props.userId;
		this.gymId = props.gymId;
		this.validatedAt = props.validatedAt ?? null;
		this.createdAt = props.createdAt ?? new Date();
	}
}
