import { GlobalError } from './global.error';

export class EntityAlreadyExistsError extends GlobalError {
	constructor(message: string) {
		super(message, 409);
	}
}
