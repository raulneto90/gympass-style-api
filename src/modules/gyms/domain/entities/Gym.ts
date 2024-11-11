import { randomUUID } from 'node:crypto';

interface ConstructorParams {
	id?: string;
	title: string;
	description: string;
	phone: string;
	latitude: number;
	longitude: number;
}

export class Gym {
	id?: string;
	title: string;
	description: string;
	phone: string;
	latitude: number;
	longitude: number;

	constructor(params: ConstructorParams) {
		this.id = params.id;
		this.title = params.title;
		this.description = params.description;
		this.phone = params.phone;
		this.latitude = params.latitude;
		this.longitude = params.longitude;
	}

	static create(params: ConstructorParams): Gym {
		return new Gym({
			...params,
			id: params.id ?? randomUUID(),
		});
	}
}
