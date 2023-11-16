/* eslint-disable no-undef */
import {
	calculateAge,
	getYearMonthDay,
	getHourMinuteSecond,
} from '../Helpers/DateHelper';

const RealDate = Date.now;

beforeAll(() => {
	global.Date.now = jest.fn(() => new Date('2023-10-30T10:20:30Z').getTime());
});

afterAll(() => {
	global.Date.now = RealDate;
});

test('calculateAge calculates the age correctly', () => {
	// Prueba con valores de ejemplo
	expect(calculateAge('1990-01-01', Date.now())).toBe(33);
	expect(calculateAge('2001-10-10', Date.now())).toBe(22);
});

test('getYearMonthDay formats the date correctly', () => {
	// Prueba con valores de ejemplo
	const date = Date.now();
	expect(getYearMonthDay(date)).toBe('2023-10-30');
});

test('getHourMinuteSecond formats the time correctly', () => {
	// Prueba con valores de ejemplo
	const time = new Date('2023-10-24T15:30:45');
	expect(getHourMinuteSecond(time)).toBe('15:30:45');

	const time2 = new Date('2023-10-30T21:25:30');
	expect(getHourMinuteSecond(time2)).toBe('21:25:30');

	const time3 = new Date('2023-10-24T15:30:45');
	expect(getHourMinuteSecond(time3)).toBe('15:30:45');

	const time4 = new Date('2023-10-29T10:30:00');
	expect(getHourMinuteSecond(time4)).toBe('10:30:00');
});
