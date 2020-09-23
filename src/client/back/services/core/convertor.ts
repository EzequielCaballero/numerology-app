import alphabetKeys from '../../data/alphabet_keys.json';
import personalKeys from '../../data/personal_keys.json';
import { TName, TBirth } from '../../entity/iperson';

export class Convertor {
	public static cleanString(value: string): string {
		return (
			value
				//Remove empty spaces
				.replace(/\s/g, '')
				//Remove special characters
				.replace(/[^[A-Za-zÀ-ÖØ-öø-ÿ]/g, '')
		);
	}
	public static cleanStringDeeper(value: string): string {
		return (
			value
				//Normalize string
				.normalize('NFD')
				//Replace special characters
				.replace(/[\u0300-\u036f]/g, '')
				//Select only alphabetical values
				.replace(/[^[a-zA-Z]/g, '')
				//Transform to upper case
				.toUpperCase()
		);
	}
	public static cleanName(name: TName): TName {
		let nameCleaned: TName = JSON.parse(JSON.stringify(name));
		nameCleaned.firstName = name.firstName.map((subname) => this.cleanString(subname));
		nameCleaned.lastName = name.lastName.map((subname) => this.cleanString(subname));
		return nameCleaned;
	}
	public static formatNameToArray(name: TName): string[] {
		let _fullname = name.firstName.concat(name.lastName);

		for (let i = 0; i < _fullname.length; i++) {
			const subname = _fullname[i];
			_fullname[i] = this.cleanStringDeeper(subname);
		}

		return _fullname;
	}
	public static formatNameToString(name: TName): string {
		let fullname: string[] = name.firstName.concat(name.lastName);
		return fullname.map((name: string) => name.toLowerCase()).join(' ');
	}
	public static formatDateToArray(date: TBirth): number[] {
		let dateValues: number[] = [ date.year, date.month, date.day ];
		return dateValues;
	}
	public static formatDateToString(date: TBirth): string {
		const day = `0${date.day}`.slice(-2);
		const month = `0${date.month}`.slice(-2);
		return `${day}/${month}/${date.year}`;
	}

	public static takeNameLetters(nameParts: string[]): string[][] {
		let onlyLetters: string[][] = [];
		for (let i = 0; i < nameParts.length; i++) {
			const subname = nameParts[i].match(/[a-zA-Z]/gi);
			if (subname) onlyLetters.push(subname);
		}
		return onlyLetters;
	}
	public static takeNameVowels(nameParts: string[]): string[][] {
		let onlyVowels: string[][] = [];
		for (let i = 0; i < nameParts.length; i++) {
			const subname = nameParts[i].match(/[aeiou]/gi);
			if (subname) onlyVowels.push(subname);
		}
		return onlyVowels;
	}
	public static takeNameConsonants(nameParts: string[]): string[][] {
		let onlyConsonants: string[][] = [];
		for (let i = 0; i < nameParts.length; i++) {
			const subname = nameParts[i].match(/[^aeiou]/gi);
			if (subname) onlyConsonants.push(subname);
		}
		return onlyConsonants;
	}

	public static matchAlphabetKeys(nameChars: string[][]): number[][] {
		//Match each alphabetic value received with the correspond numeric key
		const alphabet = alphabetKeys.alphabet;
		let nameNumbers: number[][] = [];

		for (let subname of nameChars) {
			let subnameNumber: number[] = subname.map((letter: string) =>
				this.getNumerologyPosition(alphabet.indexOf(letter) + 1)
			);
			nameNumbers.push(subnameNumber);
		}
		return nameNumbers;
	}
	public static matchPersonalKeys(birthParts: number[]): number {
		//Match only the day of birth with the specific personal key month
		const indexMonth = birthParts[1] - 1;
		const indexDay = birthParts[2] - 1;
		let matchValue = personalKeys.month[indexMonth][indexDay];
		return matchValue;
	}
	public static getNumerologyPosition(alphabetPosition: number): number {
		let position: number = alphabetPosition;
		if (alphabetPosition > 9 && alphabetPosition < 19) position = alphabetPosition - 9;
		if (alphabetPosition > 18) position = alphabetPosition - 18;
		return position;
	}

	public static reduceNestedArray(nestedArray: number[][]): number[] {
		let reducedArray: number[] = [];
		for (let i = 0; i < nestedArray.length; i++) {
			reducedArray.push(this.reduceArray(nestedArray[i]));
		}
		return reducedArray;
	}
	public static reduceArray(arrayReceived: number[]): number {
		let reducedArray: number = arrayReceived.reduce((p, c) => p + c);
		return reducedArray;
	}
	public static reduceValueElements(arrayReceived: number[], isRestricted: boolean): number[] {
		let newArray: number[] = arrayReceived.map((element) => this.reduceValue(element, isRestricted));
		return newArray;
	}
	public static reduceValue(valueReceived: number, isRestricted: boolean): number {
		let value: number = valueReceived;

		while (this.canReduce(value, isRestricted)) {
			value = value.toString().split('').map(Number).reduce((p, c) => p + c);
		}
		return value;
	}
	public static canReduce(value: number, isRestricted: boolean): boolean {
		let flag: boolean = false;
		if (value > 9) {
			if (isRestricted) {
				if (value !== 11 && value !== 22) flag = true;
			} else flag = true;
		}
		return flag;
	}
}
