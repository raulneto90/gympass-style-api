import { GlobalError } from './GlobalError';

export class EntityAlreadyExistsEror extends GlobalError {
	constructor(message: string) {
		super(message, 409);
	}
}
