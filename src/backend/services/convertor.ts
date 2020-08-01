import { TName, TBirth } from './validator';
import alphabetKeys from '../data/alphabet_keys.json';
import monthKeys from '../data/month_keys.json';

class Convertor {
	public static CleanString(value: string): string {
		return (
			value
				//Remove empty spaces
				.replace(/\s/g, '')
				//Remove special characters
				.replace(/[^[A-Za-zÀ-ÖØ-öø-ÿ]/g, '')
		);
	}
	public static CleanStringDeeper(value: string): string {
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
	public static FormatName(name: TName): TName {
		let nameCleaned: TName = JSON.parse(JSON.stringify(name));
		nameCleaned.firstName = name.firstName.map((subname) => Convertor.CleanString(subname));
		nameCleaned.lastName = name.lastName.map((subname) => Convertor.CleanString(subname));
		return nameCleaned;
	}
	public static FormatNameToArray(name: TName): string[] {
		let _fullname = name.firstName.concat(name.lastName);

		for (let i = 0; i < _fullname.length; i++) {
			const subname = _fullname[i];
			_fullname[i] = Convertor.CleanStringDeeper(subname);
		}

		return _fullname;
	}
	public static FormatDateToArray(date: TBirth): number[] {
		const birth = new Date(`${date.birthYear}-${date.birthMonth}-${date.birthDay}`);
		//FORMAT: YMD
		let dateValues: number[] = [ birth.getFullYear(), birth.getMonth() + 1, birth.getDate() ];
		return dateValues;
	}

	public static TakeNameLetters(nameParts: string[]): string[][] {
		let onlyLetters: string[][] = [];
		for (let i = 0; i < nameParts.length; i++) {
			const subname = nameParts[i].match(/[a-zA-Z]/gi);
			if (subname) onlyLetters.push(subname);
		}
		return onlyLetters;
	}
	public static TakeNameVowels(nameParts: string[]): string[][] {
		let onlyVowels: string[][] = [];
		for (let i = 0; i < nameParts.length; i++) {
			const subname = nameParts[i].match(/[aeiou]/gi);
			if (subname) onlyVowels.push(subname);
		}
		return onlyVowels;
	}
	public static TakeNameConsonants(nameParts: string[]): string[][] {
		let onlyConsonants: string[][] = [];
		for (let i = 0; i < nameParts.length; i++) {
			const subname = nameParts[i].match(/[^aeiou]/gi);
			if (subname) onlyConsonants.push(subname);
		}
		return onlyConsonants;
	}

	public static MatchAlphabetKeys(nameChars: string[][]): number[][] {
		//Match each alphabetic value received with the correspond numeric key
		const alphabet = alphabetKeys.alphabet;
		let nameNumbers: number[][] = [];

		for (let subname of nameChars) {
			let subnameNumber: number[] = subname.map((letter: string) =>
				this.GetNumerologyPosition(alphabet.indexOf(letter) + 1)
			);
			nameNumbers.push(subnameNumber);
		}
		return nameNumbers;
	}
	public static MatchMonthKeys(birthParts: number[]): number {
		//Match only the day of birth with the specific personal key month
		let matchValue = monthKeys.month[birthParts[1] - 1][birthParts[2] - 1];
		return matchValue;
	}
	public static GetNumerologyPosition(alphabetPosition: number): number {
		let position: number = alphabetPosition;
		if (alphabetPosition > 9 && alphabetPosition < 19) position = alphabetPosition - 9;
		if (alphabetPosition > 18) position = alphabetPosition - 18;
		return position;
	}

	public static ReduceNestedArray(nestedArray: number[][]): number[] {
		let reducedArray: number[] = [];
		for (let i = 0; i < nestedArray.length; i++) {
			reducedArray.push(this.ReduceArray(nestedArray[i]));
		}
		return reducedArray;
	}
	public static ReduceArray(arrayReceived: number[]): number {
		let reducedArray: number = arrayReceived.reduce((p, c) => p + c);
		return reducedArray;
	}
	public static ReduceValueElements(arrayReceived: number[], isRestricted: boolean): number[] {
		let newArray: number[] = arrayReceived.map((element) => this.ReduceValue(element, isRestricted));
		return newArray;
	}
	public static ReduceValue(valueReceived: number, isRestricted: boolean): number {
		let value: number = valueReceived;

		while (this.CanReduce(value, isRestricted)) {
			value = value.toString().split('').map(Number).reduce((p, c) => p + c);
		}
		return value;
	}
	public static CanReduce(value: number, isRestricted: boolean): boolean {
		let flag: boolean = false;
		if (value > 9) {
			if (isRestricted) {
				if (value !== 11 && value !== 22) flag = true;
			} else flag = true;
		}
		return flag;
	}
}

export default Convertor;