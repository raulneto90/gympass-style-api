export interface DateService {
	getStartOfDay(date: Date): Date;
	getEndOfDay(date: Date): Date;
	isOnSameDay(now: Date, date: Date): boolean;
}
