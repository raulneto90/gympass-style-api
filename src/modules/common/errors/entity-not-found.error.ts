import { GlobalError } from './global.error';

export class EntityNotFoundError extends GlobalError {
	constructor(message: string) {
		super(message, 404);
	}
}
