import { Convertor } from './convertor';
import { IPerson, TStage, TKarma } from '../../entity/iperson';

export type TRecord = {
	name: string[];
	birth: number[];
	image: any[]; //dynamic multitype
	essence: any[]; //dynamic multitype
	mission: any[]; //dynamic multitype
	path: any[]; //dynamic multitype
};

export class Calculator {
	private static readonly _KARMAS = [ 13, 14, 16, 19 ];
	private static readonly _STAGE_BASE = 36; // 9*4
	private static readonly _STAGE_DURATION = 9;
	private static _record: TRecord = {
		name: [],
		birth: [],
		image: [],
		essence: [],
		mission: [],
		path: []
	};

	public static calculateValues(person: IPerson): IPerson {
		const fullname = Convertor.formatNameToArray(person.name);
		const birthdate = Convertor.formatDateToArray(person.birth);
		this.cleanRecord();
		this.initRecord(fullname, birthdate);
		person.age = Calculator.calculateAge(birthdate);
		person.numbers.image = Calculator.calculateImage(fullname);
		person.numbers.essence = Calculator.calculateEssence(fullname);
		person.numbers.mission = Calculator.calculateMission(fullname);
		person.numbers.natalPath = Calculator.calculatePath(birthdate);
		person.numbers.personalKey = Calculator.calculatePersonalKey(birthdate);
		person.numbers.potentialNumber = Calculator.calculatePotential(
			person.numbers.mission,
			person.numbers.natalPath
		);
		person.numbers.personalYear = Calculator.calculatePersonalYear(birthdate);
		person.numbers.personalMonth = Calculator.calculatePersonalMonth(person.numbers.personalYear);
		person.numbers.ageDigit = Calculator.calculateAgeDigit(person.age);
		person.karmas = Calculator.calculateKarmas();
		person.karmas.possible = Calculator.calculatePossibleKarmas();
		person.stages = Calculator.calculateStages(birthdate, person.numbers.natalPath);
		return person;
	}
	public static getRecord(): TRecord {
		return this._record;
	}

	private static initRecord(name: string[], birth: number[]): void {
		this._record.name = name;
		this._record.birth = birth;
	}
	private static cleanRecord(): void {
		this._record = {
			name: [],
			birth: [],
			image: [],
			essence: [],
			mission: [],
			path: []
		};
	}
	private static calculateAge(birth: number[]): number {
		const today: Date = new Date();
		const month: number = today.getMonth() - (birth[1] - 1);
		let age: number = today.getFullYear() - birth[0];
		if (month < 0 || (month === 0 && today.getDate() < birth[2])) {
			age--;
		}
		return age;
	}
	private static calculateImage(nameParts: string[]): number {
		let image: number = 0;
		const nameConsonants: string[][] = Convertor.takeNameConsonants(nameParts);
		this._record.image.push(nameConsonants);
		const canBeCalculated = nameConsonants.length !== 0 ? true : false;
		if (canBeCalculated) {
			const consonantNumbers: number[][] = Convertor.matchAlphabetKeys(nameConsonants);
			const nestedArrayReduced: number[] = Convertor.reduceNestedArray(consonantNumbers);
			const nestedValueReduced: number[] = Convertor.reduceValueElements(nestedArrayReduced, true);
			const reducedArray: number = Convertor.reduceArray(nestedValueReduced);
			image = Convertor.reduceValue(reducedArray, true);

			//REGISTER ACTIONS
			this._record.image.push(consonantNumbers);
			this._record.image.push(nestedArrayReduced);
			if (JSON.stringify(nestedValueReduced) !== JSON.stringify(nestedArrayReduced))
				this._record.image.push(nestedValueReduced);
			if (reducedArray !== image) this._record.image.push(reducedArray);
		}
		this._record.image.push(image);
		return image;
	}
	private static calculateEssence(nameParts: string[]): number {
		let essence: number = 0;
		const nameVowels: string[][] = Convertor.takeNameVowels(nameParts);
		this._record.essence.push(nameVowels);
		const canBeCalculated: boolean = nameVowels.length !== 0 ? true : false;
		if (canBeCalculated) {
			const vowelNumbers: number[][] = Convertor.matchAlphabetKeys(nameVowels);
			const nestedArrayReduced: number[] = Convertor.reduceNestedArray(vowelNumbers);
			const nestedValueReduced: number[] = Convertor.reduceValueElements(nestedArrayReduced, true);
			const reducedArray: number = Convertor.reduceArray(nestedValueReduced);
			essence = Convertor.reduceValue(reducedArray, true);

			//REGISTER ACTIONS
			this._record.essence.push(vowelNumbers);
			this._record.essence.push(nestedArrayReduced);
			if (JSON.stringify(nestedValueReduced) !== JSON.stringify(nestedArrayReduced))
				this._record.essence.push(nestedValueReduced);
			if (reducedArray !== essence) this._record.essence.push(reducedArray);
		}
		this._record.essence.push(essence);
		return essence;
	}
	private static calculateMission(nameParts: string[]): number {
		const nameLetters: string[][] = Convertor.takeNameLetters(nameParts);
		const vowelNumbers: number[][] = Convertor.matchAlphabetKeys(nameLetters);
		const nestedArrayReduced: number[] = Convertor.reduceNestedArray(vowelNumbers);
		const nestedValueReduced: number[] = Convertor.reduceValueElements(nestedArrayReduced, true);
		const reducedArray: number = Convertor.reduceArray(nestedValueReduced);
		const mission: number = Convertor.reduceValue(reducedArray, true);

		//REGISTER ACTIONS
		this._record.mission.push(nameLetters);
		this._record.mission.push(vowelNumbers);
		this._record.mission.push(nestedArrayReduced);
		if (JSON.stringify(nestedValueReduced) !== JSON.stringify(nestedArrayReduced))
			this._record.mission.push(nestedValueReduced);
		if (reducedArray !== mission) this._record.mission.push(reducedArray);
		this._record.mission.push(mission);

		return mission;
	}
	private static calculatePath(birthParts: number[]): number {
		const birthNumbers: number[] = Convertor.reduceValueElements(birthParts, true);
		const reducedArray: number = Convertor.reduceArray(birthNumbers);
		const path: number = Convertor.reduceValue(reducedArray, true);

		//REGISTER ACTIONS
		this._record.path.push(birthNumbers);
		if (reducedArray !== path) this._record.path.push(reducedArray);
		this._record.path.push(path);

		return path;
	}
	private static calculatePersonalKey(birthParts: number[]): number {
		const personalKey: number = Convertor.matchMonthKeys(birthParts);
		return personalKey;
	}
	private static calculatePotential(mission: number, path: number): number {
		const potentialNumber: number = Convertor.reduceValue(mission + path, true);
		return potentialNumber;
	}
	private static calculatePersonalYear(birthParts: number[]): number {
		const actualYear: number = new Date().getFullYear();
		const values: number[] = [ actualYear, birthParts[1], birthParts[2] ];
		const valuesReduced: number[] = Convertor.reduceValueElements(values, true);
		const uniqueValue: number = Convertor.reduceArray(valuesReduced);
		const finalValue: number = Convertor.reduceValue(uniqueValue, true);
		return finalValue;
	}
	private static calculatePersonalMonth(personalYear: number): number {
		const actualMonth: number = new Date().getMonth() + 1;
		const finalValue: number = Convertor.reduceValue(personalYear + actualMonth, true);
		return finalValue;
	}
	private static calculateAgeDigit(age: number): number {
		let values: number[] = [ age, age + 1 ];
		const valuesReduced: number[] = Convertor.reduceValueElements(values, true);
		const uniqueValue: number = Convertor.reduceArray(valuesReduced);
		const finalValue: number = Convertor.reduceValue(uniqueValue, true);
		return finalValue;
	}
	private static calculateStages(birthParts: number[], path: number): TStage[] {
		const birthReduced: number[] = Convertor.reduceValueElements(birthParts, true);
		let stages: TStage[] = [];
		//STAGE 1
		const stage_1: TStage = {
			num: 1,
			from: 0,
			to: this._STAGE_BASE - path,
			value: Convertor.reduceValue(birthReduced[1] + birthReduced[2], true)
		};
		stages.push(stage_1);
		//STAGE 2
		const stage_2: TStage = {
			num: 2,
			from: stages[0].to + 1,
			to: stages[0].to + 1 + this._STAGE_DURATION,
			value: Convertor.reduceValue(birthReduced[2] + birthReduced[0], true)
		};
		stages.push(stage_2);
		//STAGE 3
		const stage_3: TStage = {
			num: 3,
			from: stages[1].to + 1,
			to: stages[1].to + 1 + this._STAGE_DURATION,
			value: Convertor.reduceValue(stages[0].value + stages[1].value, true)
		};
		stages.push(stage_3);
		//STAGE 4
		const stage_4: TStage = {
			num: 4,
			from: stages[2].to + 1,
			to: 0,
			value: Convertor.reduceValue(birthReduced[1] + birthReduced[0], true)
		};
		stages.push(stage_4);

		return stages;
	}
	private static calculateKarmas(): TKarma {
		let karmas: number[] = this._KARMAS;
		let matchIndex: number = -1;
		let matchKarmas: TKarma = {
			essence: 0,
			mission: 0,
			path: 0,
			possible: []
		};

		//Essence (before reduce)
		matchIndex = karmas.indexOf(this._record.essence.slice(-2)[0]);
		if (matchIndex !== -1) matchKarmas.essence = karmas[matchIndex];
		//Mission (before reduce)
		matchIndex = karmas.indexOf(this._record.mission.slice(-2)[0]);
		if (matchIndex !== -1) matchKarmas.mission = karmas[matchIndex];
		//Path (before reduce)
		matchIndex = karmas.indexOf(this._record.path.slice(-2)[0]);
		if (matchIndex !== -1) matchKarmas.path = karmas[matchIndex];

		return matchKarmas;
	}
	private static calculatePossibleKarmas(): number[] {
		let numbers: number[] = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ];
		let missingNumbers: number[] = [];
		//Takes values previously calculated (mission + path) into single sorted array
		let multiArray: number[][] = this._record.mission[1].concat(this._record.path[0]);
		//Alternative to multiArray.flat();
		let reducedArray: number[] = multiArray.reduce((acc: number[], val: number[]) => acc.concat(val), []);
		reducedArray = [ ...Array.from(new Set(reducedArray)) ];
		reducedArray.sort();
		//Find missing number
		missingNumbers = numbers.filter((num: number) => reducedArray.indexOf(num) === -1);

		if (missingNumbers.length === 0) missingNumbers = [ 0 ];

		return missingNumbers;
	}
}
