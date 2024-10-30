interface ConstructorParams {
	id?: string;
	validatedAt?: Date;
	userId: string;
	gymId: string;
	createdAt?: Date;
}

export class Checkin {
	readonly id?: string;
	readonly validatedAt?: Date;
	readonly userId: string;
	readonly gymId: string;
	readonly createdAt?: Date;

	constructor(params: ConstructorParams) {
		this.id = params.id;
		this.validatedAt = params.validatedAt;
		this.userId = params.userId;
		this.gymId = params.gymId;
		this.createdAt = params.createdAt;
	}

	static create(params: ConstructorParams): Checkin {
		return new Checkin(params);
	}
}
