import { GlobalError } from './GlobalError';

export class InvalidCredentialsError extends GlobalError {
	constructor() {
		super('Invalid credentials', 401);
	}
}
