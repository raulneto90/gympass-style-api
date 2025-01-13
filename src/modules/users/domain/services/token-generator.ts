export interface TokenGeneratorService {
	sign(payload: any): string;
	verify(token: string): any;
}
