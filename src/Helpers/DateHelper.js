import { format } from 'date-fns';
import esLocalee from 'date-fns/locale/es';

export function calculateAge(dateOfBirth, todayDate) {
	const today = new Date(todayDate);
	const birthDate = new Date(dateOfBirth);
	let age = today.getFullYear() - birthDate.getFullYear();

	const monthDiff = today.getMonth() - birthDate.getMonth();
	if (
		monthDiff < 0 ||
		(monthDiff === 0 && today.getDate() < birthDate.getDate())
	) {
		age--;
	}

	return age;
}

export function getYearMonthDay(date) {
	const formattedDate = format(date, 'yyyy-MM-dd');
	return formattedDate;
}

export function getHourMinuteSecond(date) {
	const formattedDate = format(date, 'HH:mm:ss');
	return formattedDate;
}

export function isDatePast(dateString) {
	const currentDate = new Date();
	const appointmentDate = new Date(dateString);

	return appointmentDate < currentDate;
}

export function getCurrentDateFormatted() {
	const currentDate = new Date();
	const formattedDate = format(currentDate, "EEEE dd 'de' MMMM 'de' yyyy", {
		locale: esLocalee,
	});
	return formattedDate;
}
