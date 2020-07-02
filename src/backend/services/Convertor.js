//SERVICE: executes the work (business logic and rules behind the program)
import numericKeys from '../data/name_keys.json';
import personalKeys from '../data/personal_keys.json';

class Convertor {
	static FormatNameToArray(name) {
		let nameParts = name
			//Delete whitespaces
			.replace(/\s/g, '')
			//Split string to parts
			.split('|');

		for (let i = 0; i < nameParts.length; i++) {
			const subname = nameParts[i];
			nameParts[i] = subname
				//Normalize string
				.normalize('NFD')
				//Replace special characters
				.replace(/[\u0300-\u036f]/g, '')
				//Select only alphabetical values
				.replace(/[^[a-zA-Z]/g, '')
				//Transform to upper case
				.toUpperCase();
		}

		return nameParts;
	}
	static FormatDateToArray(date) {
		//FORMAT: es_AR
		let dateValues = [ date.getDate(), date.getMonth() + 1, date.getFullYear() ];
		return dateValues;
	}

	static TakeNameLetters(nameParts) {
		let onlyLetters = [];
		for (let i = 0; i < nameParts.length; i++) {
			const subname = nameParts[i].match(/[a-zA-Z]/gi);
			onlyLetters.push(subname);
		}
		return onlyLetters;
	}
	static TakeNameVowels(nameParts) {
		let onlyVowels = [];
		for (let i = 0; i < nameParts.length; i++) {
			const subname = nameParts[i].match(/[aeiou]/gi);
			if (subname) onlyVowels.push(subname);
		}
		return onlyVowels;
	}
	static TakeNameConsonants(nameParts) {
		let onlyConsonants = [];
		for (let i = 0; i < nameParts.length; i++) {
			const subname = nameParts[i].match(/[^aeiou]/gi);
			if (subname) onlyConsonants.push(subname);
		}
		return onlyConsonants;
	}

	static MatchNumericKeys(nameParts) {
		//Match each alphabetic value received with the correspond numeric key
		const alphabet = numericKeys.alphabet;
		let nameNumbers = [];

		for (let subname of nameParts) {
			let subnameNumber = subname.map((letter) => this.GetNumerologyPosition(alphabet.indexOf(letter) + 1));
			nameNumbers.push(subnameNumber);
		}
		return nameNumbers;
	}
	static MatchPersonalKeys(birthParts) {
		//Match only the day of birth with the specific personal key month
		const monthKeys = personalKeys.month[birthParts[1] - 1];
		let matchValue = 0;
		for (var key in monthKeys) {
			matchValue = monthKeys[key][birthParts[0] - 1];
		}
		return matchValue;
	}
	static GetNumerologyPosition(alphabetPosition) {
		let position = alphabetPosition;
		if (alphabetPosition > 9 && alphabetPosition < 19) position = alphabetPosition - 9;
		if (alphabetPosition > 18) position = alphabetPosition - 18;

		return position;
	}

	static ReduceNestedArray(nestedArray) {
		let arrayReduced = [];
		for (let i = 0; i < nestedArray.length; i++) {
			arrayReduced.push(this.ReduceArray(nestedArray[i]));
		}
		return arrayReduced;
	}
	static ReduceArray(arrayReceived) {
		let arrayReduced = arrayReceived.reduce((p, c) => p + c);
		return arrayReduced;
	}
	static ReduceValueElements(arrayReceived, isRestricted) {
		let newArray = arrayReceived.map((element) => this.ReduceValue(element, isRestricted));
		return newArray;
	}
	static ReduceValue(valueReceived, isRestricted) {
		let value = valueReceived;

		while (this.CanReduce(value, isRestricted)) {
			value = value.toString().split('').map(Number).reduce((p, c) => p + c);
		}
		return value;
	}
	static CanReduce(value, isRestricted) {
		let flag = false;
		if (value > 9) {
			if (isRestricted) {
				if (value !== 11 && value !== 22) flag = true;
			} else flag = true;
		}

		return flag;
	}
}

export default Convertor;
