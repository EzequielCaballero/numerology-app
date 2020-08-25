import { IPerson, TNumbers, TKarma, TStage } from './iperson';
import Convertor from '../services/convertor';
import Calculator, { TRecord } from '../services/calculator';
import Validator, { TName, TBirth } from '../services/validator';

class Person implements IPerson {
	fullname: string[];
	birthdate: number[];
	age: number = 0;
	numbers: TNumbers = {
		image: 0,
		essence: 0,
		mission: 0,
		natal_path: 0,
		potential_number: 0,
		personal_key: 0,
		personal_year: 0,
		personal_month: 0,
		age_digit: 0
	};
	stages: TStage[] = [];
	karmas: TKarma = { essence: 0, mission: 0, path: 0, possible_karmas: [] };

	constructor(name: TName, birth: TBirth) {
		if (Validator.ValidateName(name) && Validator.ValidateDate(birth)) {
			this.fullname = Convertor.FormatNameToArray(name);
			this.birthdate = Convertor.FormatDateToArray(birth);
		} else {
			this.fullname = [];
			this.birthdate = [];
		}
	}

	public calculateValues(): TRecord {
		try {
			Calculator.CleanRecord();
			if (this.fullname.length !== 0 && this.birthdate.length !== 0) {
				Calculator.InitRecord(this.fullname, this.birthdate);
				this.age = Calculator.CalculateAge(this.birthdate);
				this.numbers.image = Calculator.CalculateImage(this.fullname);
				this.numbers.essence = Calculator.CalculateEssence(this.fullname);
				this.numbers.mission = Calculator.CalculateMission(this.fullname);
				this.numbers.natal_path = Calculator.CalculatePath(this.birthdate);
				this.numbers.personal_key = Calculator.CalculatePersonalKey(this.birthdate);
				this.numbers.potential_number = Calculator.CalculatePotential(
					this.numbers.mission,
					this.numbers.natal_path
				);
				this.numbers.personal_year = Calculator.CalculatePersonalYear(this.birthdate);
				this.numbers.personal_month = Calculator.CalculatePersonalMonth(this.numbers.personal_year);
				this.numbers.age_digit = Calculator.CalculateAgeDigit(this.age);
				this.karmas = Calculator.CalculateKarmas();
				this.karmas.possible_karmas = Calculator.CalculatePossibleKarmas();
				this.stages = Calculator.CalculateStages(this.birthdate, this.numbers.natal_path);
			}
		} catch (error) {
			console.error(`Error calculating person values. Detail: ${error}`);
		} finally {
			return Calculator._record;
		}
	}
}

export default Person;
