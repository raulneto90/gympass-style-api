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
	readonly id?: string;
	readonly title: string;
	readonly description: string;
	readonly phone: string;
	readonly latitude: number;
	readonly longitude: number;

	constructor(props: ConstructorParams) {
		this.id = props.id ?? randomUUID();
		this.title = props.title;
		this.description = props.description;
		this.phone = props.phone;
		this.latitude = props.latitude;
		this.longitude = props.longitude;
	}
}
