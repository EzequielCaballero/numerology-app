export type TName = {
	firstName: string[];
	lastName: string[];
};

export type TBirth = {
	birthYear: number;
	birthMonth: number;
	birthDay: number;
};

class Validator {
	public static ValidateName(name: TName): boolean {
		let validation = false;
		if (name.firstName[0] !== '' && name.lastName[0] !== '') validation = true;
		return validation;
	}

	public static ValidateDate(date: TBirth): boolean {
		let validation = false;
		if (
			date.birthDay !== 0 &&
			date.birthDay > 0 &&
			date.birthDay <= 31 &&
			date.birthMonth !== 0 &&
			date.birthMonth > 0 &&
			date.birthMonth <= 12 &&
			date.birthYear !== 0 &&
			date.birthYear >= 1000
		)
			validation = true;

		return validation;
	}
}

export default Validator;
