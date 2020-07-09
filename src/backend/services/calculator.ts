import Convertor from './convertor';
import { TStage, TKarma } from '../entity/iperson';

type TRecord = {
	name: string[];
	birth: number[];
	image: any[]; //dynamic multitype
	essence: any[]; //dynamic multitype
	mission: any[]; //dynamic multitype
	path: any[]; //dynamic multitype
};

class Calculator {
	//RECORD
	public static _record: TRecord = {
		name: [],
		birth: [],
		image: [],
		essence: [],
		mission: [],
		path: []
	};

	//METHODS
	public static FormatName(fullname: string): string[] {
		const newFormat = Convertor.FormatNameToArray(fullname);
		Calculator._record.name = newFormat;
		return newFormat;
	}
	public static FormatBirth(birth: string): number[] {
		const newFormat: number[] = Convertor.FormatDateToArray(birth);
		Calculator._record.birth = newFormat;
		return newFormat;
	}
	public static CalculateAge(birthDate: number[]): number {
		const today: Date = new Date();
		const month: number = today.getMonth() - (birthDate[1] - 1);
		let age: number = today.getFullYear() - birthDate[2];
		if (month < 0 || (month === 0 && today.getDate() < birthDate[0])) {
			age--;
		}
		return age;
	}
	public static CalculateImage(nameParts: string[]): number {
		let image: number = 0;
		const nameConsonants: string[][] = Convertor.TakeNameConsonants(nameParts);
		Calculator._record.image.push(nameConsonants);
		const canBeCalculated = nameConsonants.length !== 0 ? true : false;
		if (canBeCalculated) {
			const consonantNumbers: number[][] = Convertor.MatchAlphabetKeys(nameConsonants);
			const nestedArrayReduced: number[] = Convertor.ReduceNestedArray(consonantNumbers);
			const nestedValueReduced: number[] = Convertor.ReduceValueElements(nestedArrayReduced, true);
			const reducedArray: number = Convertor.ReduceArray(nestedValueReduced);
			image = Convertor.ReduceValue(reducedArray, true);

			//REGISTER ACTIONS
			Calculator._record.image.push(consonantNumbers);
			Calculator._record.image.push(nestedArrayReduced);
			if (JSON.stringify(nestedValueReduced) !== JSON.stringify(nestedArrayReduced))
				Calculator._record.image.push(nestedValueReduced);
			if (reducedArray !== image) Calculator._record.image.push(reducedArray);
		}
		Calculator._record.image.push(image);
		return image;
	}
	public static CalculateEssence(nameParts: string[]): number {
		let essence: number = 0;
		const nameVowels: string[][] = Convertor.TakeNameVowels(nameParts);
		Calculator._record.essence.push(nameVowels);
		const canBeCalculated: boolean = nameVowels.length !== 0 ? true : false;
		if (canBeCalculated) {
			const vowelNumbers: number[][] = Convertor.MatchAlphabetKeys(nameVowels);
			const nestedArrayReduced: number[] = Convertor.ReduceNestedArray(vowelNumbers);
			const nestedValueReduced: number[] = Convertor.ReduceValueElements(nestedArrayReduced, true);
			const reducedArray: number = Convertor.ReduceArray(nestedValueReduced);
			essence = Convertor.ReduceValue(reducedArray, true);

			//REGISTER ACTIONS
			Calculator._record.essence.push(vowelNumbers);
			Calculator._record.essence.push(nestedArrayReduced);
			if (JSON.stringify(nestedValueReduced) !== JSON.stringify(nestedArrayReduced))
				Calculator._record.essence.push(nestedValueReduced);
			if (reducedArray !== essence) Calculator._record.essence.push(reducedArray);
		}
		Calculator._record.essence.push(essence);
		return essence;
	}
	public static CalculateMission(nameParts: string[]): number {
		const nameLetters: string[][] = Convertor.TakeNameLetters(nameParts);
		const vowelNumbers: number[][] = Convertor.MatchAlphabetKeys(nameLetters);
		const nestedArrayReduced: number[] = Convertor.ReduceNestedArray(vowelNumbers);
		const nestedValueReduced: number[] = Convertor.ReduceValueElements(nestedArrayReduced, true);
		const reducedArray: number = Convertor.ReduceArray(nestedValueReduced);
		const mission: number = Convertor.ReduceValue(reducedArray, true);

		//REGISTER ACTIONS
		Calculator._record.mission.push(nameLetters);
		Calculator._record.mission.push(vowelNumbers);
		Calculator._record.mission.push(nestedArrayReduced);
		if (JSON.stringify(nestedValueReduced) !== JSON.stringify(nestedArrayReduced))
			Calculator._record.mission.push(nestedValueReduced);
		if (reducedArray !== mission) Calculator._record.mission.push(reducedArray);
		Calculator._record.mission.push(mission);

		return mission;
	}
	public static CalculatePath(birthParts: number[]): number {
		const birthNumbers: number[] = Convertor.ReduceValueElements(birthParts, true);
		const reducedArray: number = Convertor.ReduceArray(birthNumbers);
		const path: number = Convertor.ReduceValue(reducedArray, true);

		//REGISTER ACTIONS
		Calculator._record.path.push(birthNumbers);
		if (reducedArray !== path) Calculator._record.path.push(reducedArray);
		Calculator._record.path.push(path);

		return path;
	}
	public static CalculatePersonalKey(birthParts: number[]): number {
		const personalKey: number = Convertor.MatchMonthKeys(birthParts);
		return personalKey;
	}
	public static CalculatePotential(mission: number, path: number): number {
		const potentialNumber: number = Convertor.ReduceValue(mission + path, true);
		return potentialNumber;
	}
	public static CalculateKarmas(): TKarma {
		let karmas: number[] = [ 13, 14, 16, 19 ];
		let matchIndex: number = -1;
		let matchKarmas: TKarma = {
			essence: 0,
			mission: 0,
			path: 0
		};

		//Essence (before reduce)
		matchIndex = karmas.indexOf(Calculator._record.essence.slice(-2)[0]);
		if (matchIndex !== -1) matchKarmas.essence = karmas[matchIndex];
		//Mission (before reduce)
		matchIndex = karmas.indexOf(Calculator._record.mission.slice(-2)[0]);
		if (matchIndex !== -1) matchKarmas.mission = karmas[matchIndex];
		//Path (before reduce)
		matchIndex = karmas.indexOf(Calculator._record.path.slice(-2)[0]);
		if (matchIndex !== -1) matchKarmas.path = karmas[matchIndex];

		return matchKarmas;
	}
	public static CalculatePossibleKarmas(): number[] {
		let numbers: number[] = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ];
		let missingNumbers: number[] = [];
		//Takes values previously calculated (mission + path) into single sorted array
		let multiArray: number[][] = Calculator._record.mission[1].concat(Calculator._record.path[0]);
		//Alternative to multiArray.flat();
		let reducedArray: number[] = multiArray.reduce((acc: number[], val: number[]) => acc.concat(val), []);
		reducedArray = [ ...Array.from(new Set(reducedArray)) ];
		reducedArray.sort();
		//Find missing number
		missingNumbers = numbers.filter((num: number) => reducedArray.indexOf(num) === -1);

		if (missingNumbers.length === 0) missingNumbers = [ 0 ];

		return missingNumbers;
	}
	public static CalculateStages(birthParts: number[], path: number): TStage[] {
		const base_number: number = 36;
		const default_duration: number = 9;
		const birthReduced: number[] = Convertor.ReduceValueElements(birthParts, true);
		let stages: TStage[] = [];
		//STAGE 1
		const stage_1: TStage = {
			num: 1,
			from: 0,
			to: base_number - path,
			value: Convertor.ReduceValue(birthReduced[1] + birthReduced[0], true)
		};
		stages.push(stage_1);
		//STAGE 2
		const stage_2: TStage = {
			num: 2,
			from: stages[0].to + 1,
			to: stages[0].to + 1 + default_duration,
			value: Convertor.ReduceValue(birthReduced[0] + birthReduced[2], true)
		};
		stages.push(stage_2);
		//STAGE 3
		const stage_3: TStage = {
			num: 3,
			from: stages[1].to + 1,
			to: stages[1].to + 1 + default_duration,
			value: Convertor.ReduceValue(stages[0].value + stages[1].value, true)
		};
		stages.push(stage_3);
		//STAGE 4
		const stage_4: TStage = {
			num: 4,
			from: stages[2].to + 1,
			to: 0,
			value: Convertor.ReduceValue(birthReduced[1] + birthReduced[2], true)
		};
		stages.push(stage_4);

		return stages;
	}
	public static CalculatePersonalYear(birthParts: number[]): number {
		const actualYear: number = new Date().getFullYear();
		const values: number[] = [ birthParts[0], birthParts[1], actualYear ];
		const valuesReduced: number[] = Convertor.ReduceValueElements(values, true);
		const uniqueValue: number = Convertor.ReduceArray(valuesReduced);
		const finalValue: number = Convertor.ReduceValue(uniqueValue, true);
		return finalValue;
	}
	public static CalculatePersonalMonth(personalYear: number): number {
		const actualMonth: number = new Date().getMonth() + 1;
		const finalValue: number = Convertor.ReduceValue(personalYear + actualMonth, true);
		return finalValue;
	}
	public static CalculateAgeDigit(age: number): number {
		let values: number[] = [ age, age + 1 ];
		const valuesReduced: number[] = Convertor.ReduceValueElements(values, true);
		const uniqueValue: number = Convertor.ReduceArray(valuesReduced);
		const finalValue: number = Convertor.ReduceValue(uniqueValue, true);
		return finalValue;
	}
	public static CleanRecord(): void {
		Calculator._record = {
			name: [],
			birth: [],
			image: [],
			essence: [],
			mission: [],
			path: []
		};
	}
}

export default Calculator;
