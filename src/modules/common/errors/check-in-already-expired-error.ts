import { GlobalError } from './global.error';

export class CheckInAlreadyExpiredError extends GlobalError {
	constructor() {
		super('CheckIn already expired', 403);
	}
}
