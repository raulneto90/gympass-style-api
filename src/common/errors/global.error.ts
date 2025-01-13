export class GlobalError extends Error {
	readonly statusCode: number;
	readonly message: string;

	constructor(message: string, statusCode: number) {
		super(message);
		this.message = message;
		this.statusCode = statusCode;
	}
}
