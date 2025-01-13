import { GlobalError } from './global.error';

export class InvalidCredentialsError extends GlobalError {
	constructor() {
		super('Invalid credentials', 401);
	}
}
