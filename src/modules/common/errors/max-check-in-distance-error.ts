import { GlobalError } from './global.error';

export class MaxCheckinDistanceError extends GlobalError {
	constructor() {
		super('Max check-in distance exceeded', 403);
	}
}
