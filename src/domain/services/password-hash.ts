export interface PasswordHash {
	hash(password: string): string;
	compare(password: string, hash: string): boolean;
}
