export class GlobalError {
	constructor(
		public readonly message: string,
		public readonly statusCode: number = 500,
	) {}
}
