//CONTROLLER: managers/orchestrates the work using the service
import Convertor from '../services/Convertor';
import Stage from '../entity/Stage';

class Calculator {
	//RECORD
	static _record = {
		name: [],
		birth: [],
		image: [],
		essence: [],
		mission: [],
		path: []
	};

	//METHODS
	static FormatName(fullname) {
		const newFormat = Convertor.FormatNameToArray(fullname);
		Calculator._record.name = newFormat;
		return newFormat;
	}
	static FormatBirth(birth) {
		const newFormat = Convertor.FormatDateToArray(birth);
		Calculator._record.birth = newFormat;
		return newFormat;
	}
	static CalculateAge(birthDate) {
		var today = new Date();
		var age = today.getFullYear() - birthDate[2];
		var month = today.getMonth() - (birthDate[1] - 1);
		if (month < 0 || (month === 0 && today.getDate() < birthDate[0])) {
			age--;
		}
		return age;
	}
	static CalculateImage(nameParts) {
		let image = 0;
		const nameConsonants = Convertor.TakeNameConsonants(nameParts);
		Calculator._record.image.push(nameConsonants);
		const canBeCalculated = nameConsonants.length !== 0 ? true : false;
		if (canBeCalculated) {
			const consonantNumbers = Convertor.MatchNumericKeys(nameConsonants);
			const nestedArrayReduced = Convertor.ReduceNestedArray(consonantNumbers);
			const nestedValueReduced = Convertor.ReduceValueElements(nestedArrayReduced, true);
			const arrayReduced = Convertor.ReduceArray(nestedValueReduced);
			image = Convertor.ReduceValue(arrayReduced, true);

			//REGISTER ACTIONS
			Calculator._record.image.push(consonantNumbers);
			Calculator._record.image.push(nestedArrayReduced);
			if (JSON.stringify(nestedValueReduced) !== JSON.stringify(nestedArrayReduced))
				Calculator._record.image.push(nestedValueReduced);
			if (arrayReduced !== image) Calculator._record.image.push(arrayReduced);
		}
		Calculator._record.image.push(image);
		return image;
	}
	static CalculateEssence(nameParts) {
		let essence = 0;
		const nameVowels = Convertor.TakeNameVowels(nameParts);
		Calculator._record.essence.push(nameVowels);
		const canBeCalculated = nameVowels.length !== 0 ? true : false;
		if (canBeCalculated) {
			const vowelNumbers = Convertor.MatchNumericKeys(nameVowels);
			const nestedArrayReduced = Convertor.ReduceNestedArray(vowelNumbers);
			const nestedValueReduced = Convertor.ReduceValueElements(nestedArrayReduced, true);
			const arrayReduced = Convertor.ReduceArray(nestedValueReduced);
			essence = Convertor.ReduceValue(arrayReduced, true);

			//REGISTER ACTIONS

			Calculator._record.essence.push(vowelNumbers);
			Calculator._record.essence.push(nestedArrayReduced);
			if (JSON.stringify(nestedValueReduced) !== JSON.stringify(nestedArrayReduced))
				Calculator._record.essence.push(nestedValueReduced);
			if (arrayReduced !== essence) Calculator._record.essence.push(arrayReduced);
		}
		Calculator._record.essence.push(essence);
		return essence;
	}
	static CalculateMission(nameParts) {
		const nameLetters = Convertor.TakeNameLetters(nameParts);
		const vowelNumbers = Convertor.MatchNumericKeys(nameLetters);
		const nestedArrayReduced = Convertor.ReduceNestedArray(vowelNumbers);
		const nestedValueReduced = Convertor.ReduceValueElements(nestedArrayReduced, true);
		const arrayReduced = Convertor.ReduceArray(nestedValueReduced);
		const mission = Convertor.ReduceValue(arrayReduced, true);

		//REGISTER ACTIONS
		Calculator._record.mission.push(nameLetters);
		Calculator._record.mission.push(vowelNumbers);
		Calculator._record.mission.push(nestedArrayReduced);
		if (JSON.stringify(nestedValueReduced) !== JSON.stringify(nestedArrayReduced))
			Calculator._record.mission.push(nestedValueReduced);
		if (arrayReduced !== mission) Calculator._record.mission.push(arrayReduced);
		Calculator._record.mission.push(mission);

		return mission;
	}
	static CalculatePath(birthParts) {
		const birthNumbers = Convertor.ReduceValueElements(birthParts, true);
		const arrayReduced = Convertor.ReduceArray(birthNumbers);
		const path = Convertor.ReduceValue(arrayReduced, true);

		//REGISTER ACTIONS
		Calculator._record.path.push(birthNumbers);
		if (arrayReduced !== path) Calculator._record.path.push(arrayReduced);
		Calculator._record.path.push(path);

		return path;
	}
	static CalculatePersonalKey(birthParts) {
		const personalKey = Convertor.MatchPersonalKeys(birthParts);
		return personalKey;
	}
	static CalculatePotential(mission, path) {
		const potentialNumber = Convertor.ReduceValue(mission + path, true);
		return potentialNumber;
	}
	static CalculateKarmas() {
		let karmas = [ 13, 14, 16, 19 ];
		let matchIndex = -1;
		let matchKarmas = {
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
	static CalculatePossibleKarmas() {
		let numbers = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ];
		let missingNumbers = [];
		//Takes values previously calculated (mission + path) into single sorted array
		let uniqueArray = Calculator._record.mission[1].concat(Calculator._record.path[0]);
		//uniqueArray = uniqueArray.flat();
		uniqueArray = uniqueArray.reduce((acc, val) => acc.concat(val), []);
		uniqueArray = [ ...new Set(uniqueArray) ];
		uniqueArray.sort();
		//Find missing number
		missingNumbers = numbers.filter((num) => uniqueArray.indexOf(num) === -1);

		if (missingNumbers.length === 0) missingNumbers = [ 0 ];

		return missingNumbers;
	}
	static CalculateStages(birthParts, path) {
		const base_number = 36;
		const default_duration = 9;
		const birthReduced = Convertor.ReduceValueElements(birthParts, true);
		let stages = [];
		//STAGE 1
		const stage_1 = new Stage();
		stage_1.num = 1;
		stage_1.from = 0;
		stage_1.to = base_number - path;
		stage_1.value = Convertor.ReduceValue(birthReduced[1] + birthReduced[0], true);
		stages.push(stage_1);
		//STAGE 2
		const stage_2 = new Stage();
		stage_2.num = 2;
		stage_2.from = stages[0].to + 1;
		stage_2.to = stage_2.from + default_duration;
		stage_2.value = Convertor.ReduceValue(birthReduced[0] + birthReduced[2], true);
		stages.push(stage_2);
		//STAGE 3
		const stage_3 = new Stage();
		stage_3.num = 3;
		stage_3.from = stages[1].to + 1;
		stage_3.to = stage_3.from + default_duration;
		stage_3.value = Convertor.ReduceValue(stages[0].value + stages[1].value, true);
		stages.push(stage_3);
		//STAGE 4
		const stage_4 = new Stage();
		stage_4.num = 4;
		stage_4.from = stages[2].to + 1;
		stage_4.to = '∞';
		stage_4.value = Convertor.ReduceValue(birthReduced[1] + birthReduced[2], true);
		stages.push(stage_4);

		return stages;
	}
	static CalculatePersonalYear(birthParts) {
		const actualYear = new Date().getFullYear();
		const values = [ birthParts[0], birthParts[1], actualYear ];
		const valuesReduced = Convertor.ReduceValueElements(values, true);
		const uniqueValue = Convertor.ReduceArray(valuesReduced);
		const finalValue = Convertor.ReduceValue(uniqueValue, true);
		return finalValue;
	}
	static CalculatePersonalMonth(personalYear) {
		const actualMonth = new Date().getMonth() + 1;
		const finalValue = Convertor.ReduceValue(personalYear + actualMonth, true);
		return finalValue;
	}
	static CalculateAgeDigit(age) {
		let values = [ age, age + 1 ];
		const valuesReduced = Convertor.ReduceValueElements(values, true);
		const uniqueValue = Convertor.ReduceArray(valuesReduced);
		const finalValue = Convertor.ReduceValue(uniqueValue, true);
		return finalValue;
	}
	static CleanRecord() {
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
