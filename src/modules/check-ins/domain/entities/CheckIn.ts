import { randomUUID } from 'node:crypto';

interface ConstructorParams {
	id?: string;
	userId: string;
	gymId: string;
	validatedAt?: Date;
	latitude: number;
	longitude: number;
	createdAt?: Date;
}

export class Checkin {
	readonly id: string;
	readonly userId: string;
	readonly gymId: string;
	readonly latitude: number;
	readonly longitude: number;
	readonly validatedAt?: Date;
	readonly createdAt?: Date;

	constructor(props: ConstructorParams) {
		this.id = props.id ?? randomUUID();
		this.userId = props.userId;
		this.gymId = props.gymId;
		this.latitude = props.latitude;
		this.longitude = props.longitude;
		this.validatedAt = props.validatedAt;
		this.createdAt = props.createdAt ?? new Date();
	}
}
