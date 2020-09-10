import { TName, TBirth } from '../../entity/iperson';

export class Validator {
	public static validateName(name: TName): boolean {
		try {
			let validation = false;
			if (name.firstName[0] !== '' && name.lastName[0] !== '') validation = true;
			return validation;
		} catch (error) {
			console.error(`Error validating fullname input. Detail: ${error}`);
			return false;
		}
	}

	public static validateNameParts(name: TName): boolean[] {
		let validation = [ false, false ];
		try {
			if (name.firstName[0] !== '') {
				validation[0] = true;
			}
			if (name.lastName[0] !== '') {
				validation[1] = true;
			}
			return validation;
		} catch (error) {
			console.error(`Error validating fullname input. Detail: ${error}`);
			return validation;
		}
	}

	public static validateDate(date: TBirth): boolean {
		try {
			let validation = false;
			const formatDate = new Date(`${date.year}/${date.month}/${date.day}`);
			if (date.day === formatDate.getDate()) {
				if (date.month === formatDate.getMonth() + 1) {
					if (date.year === formatDate.getFullYear() && date.year >= 1000) validation = true;
				}
			}
			return validation;
		} catch (error) {
			console.error(`Error validating birthdate input. Detail: ${error}`);
			return false;
		}
	}
}
