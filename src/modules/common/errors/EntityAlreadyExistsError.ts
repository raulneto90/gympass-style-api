import { GlobalError } from './GlobalError';

export class EntityAlreadyExistsError extends GlobalError {
	constructor(message: string) {
		super(message, 409);
	}
}
