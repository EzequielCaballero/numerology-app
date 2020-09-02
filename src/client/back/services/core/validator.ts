import { TName, TBirth } from '../../entity/iperson';

export class Validator {
	public static validateName(name: TName): boolean {
		let validation = false;
		if (name.firstName[0] !== '' && name.lastName[0] !== '') validation = true;
		return validation;
	}

	public static validateDate(date: TBirth): boolean {
		let validation = false;
		if (
			date.day !== 0 &&
			date.day > 0 &&
			date.day <= 31 &&
			date.month !== 0 &&
			date.month > 0 &&
			date.month <= 12 &&
			date.year !== 0 &&
			date.year >= 1000
		)
			validation = true;

		return validation;
	}
}
