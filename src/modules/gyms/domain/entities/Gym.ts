import { randomUUID } from 'node:crypto';

interface ConstructorParams {
	id?: string;
	title: string;
	description?: string | null;
	phone?: string | null;
	latitude: number;
	longitude: number;
}

export class Gym {
	readonly id?: string;
	readonly title: string;
	readonly description?: string | null;
	readonly phone?: string | null;
	readonly latitude: number;
	readonly longitude: number;

	constructor(props: ConstructorParams) {
		this.id = props.id ?? randomUUID();
		this.title = props.title;
		this.description = props.description ?? null;
		this.phone = props.phone ?? null;
		this.latitude = props.latitude;
		this.longitude = props.longitude;
	}
}
