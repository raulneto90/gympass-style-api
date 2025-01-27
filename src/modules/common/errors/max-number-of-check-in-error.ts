import { GlobalError } from './global.error';

export class MaxNumberOfCheckinError extends GlobalError {
	constructor() {
		super('Max number of check-ins reached', 403);
	}
}
