import { GlobalError } from './GlobalError';

export class NotFoundError extends GlobalError {
	constructor(message: string) {
		super(message, 404);
	}
}
