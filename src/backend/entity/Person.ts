import { TStage, TKarma, IPerson } from './iperson';
import Convertor from '../services/convertor';
import Calculator, { TRecord } from '../services/calculator';
import Validator, { TName, TBirth } from '../services/validator';

class Person implements IPerson {
	fullname: string[];
	birthdate: number[];
	age: number = 0;
	image: number = 0;
	essence: number = 0;
	mission: number = 0;
	natal_path: number = 0;
	potential_number: number = 0;
	personal_key: number = 0;
	karmas: TKarma = { essence: this.essence, mission: this.mission, path: this.natal_path };
	possible_karmas: number[] = [];
	stages: TStage[] = [];
	personal_year: number = 0;
	personal_month: number = 0;
	age_digit: number = 0;

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
				this.image = Calculator.CalculateImage(this.fullname);
				this.essence = Calculator.CalculateEssence(this.fullname);
				this.mission = Calculator.CalculateMission(this.fullname);
				this.natal_path = Calculator.CalculatePath(this.birthdate);
				this.personal_key = Calculator.CalculatePersonalKey(this.birthdate);
				this.potential_number = Calculator.CalculatePotential(this.mission, this.natal_path);
				this.karmas = Calculator.CalculateKarmas();
				this.possible_karmas = Calculator.CalculatePossibleKarmas();
				this.stages = Calculator.CalculateStages(this.birthdate, this.natal_path);
				this.personal_year = Calculator.CalculatePersonalYear(this.birthdate);
				this.personal_month = Calculator.CalculatePersonalMonth(this.personal_year);
				this.age_digit = Calculator.CalculateAgeDigit(this.age);
			}
		} catch (error) {
			console.error(`Error calculating person values. Detail: ${error}`);
		} finally {
			return Calculator._record;
		}
	}
}

export default Person;
