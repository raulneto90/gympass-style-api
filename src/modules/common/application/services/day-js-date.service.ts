import dayjs from 'dayjs';
import { DateService } from '../../domain/services/date.service';

export class DayJsDateService implements DateService {
	getStartOfDay(date: Date) {
		return dayjs(date).startOf('date').toDate();
	}

	getEndOfDay(date: Date) {
		return dayjs(date).endOf('date').toDate();
	}

	isOnSameDay(now: Date, date: Date): boolean {
		const startOfDay = this.getStartOfDay(now);
		const endOfDay = this.getEndOfDay(now);

		return (
			dayjs(date).isBefore(endOfDay) && dayjs(date).isAfter(dayjs(startOfDay))
		);
	}
}
