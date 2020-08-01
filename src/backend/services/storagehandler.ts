import { TName, TBirth } from './validator';

type Result = {
	id: number;
	name: TName;
	birth: TBirth;
};

class StorageHandler {
	private static KEYNAME: string = 'result';
	private static MAX_NUMBER_SAVES: number = 10;

	private static validateKeyStored(k: string): boolean {
		const maxParts = this.MAX_NUMBER_SAVES.toString().split('');
		const rule =
			this.MAX_NUMBER_SAVES < 10
				? `^(${this.KEYNAME}_)([1-9])$`
				: `^(${this.KEYNAME}_)([1-9]|[1-${maxParts[0]}][0-${maxParts[1]}])$`;

		let regex = new RegExp(rule);
		return regex.test(k);
	}

	private static validateResultStored(result: any): result is Result {
		try {
			let isValid = false;
			if (
				(result as Result).id !== undefined &&
				(result as Result).name !== undefined &&
				(result as Result).birth !== undefined
			) {
				if (typeof (result as Result).id === 'number')
					if (Array.isArray((result as Result).name.firstName))
						if (Array.isArray((result as Result).name.lastName))
							if (typeof (result as Result).birth.birthYear === 'number')
								if (typeof (result as Result).birth.birthMonth === 'number')
									if (typeof (result as Result).birth.birthDay === 'number') isValid = true;
			}
			return isValid;
		} catch (error) {
			return false;
		}
	}

	public static isResultStored(name: TName, birth: TBirth): boolean {
		const results: Result[] = this.getAllResultsStored() as Result[];
		const matches: Result[] = results.filter(
			(r: Result) =>
				JSON.stringify(r.name) === JSON.stringify(name) && JSON.stringify(r.birth) === JSON.stringify(birth)
		);
		return matches.length > 0;
	}

	private static getKeysStored(): string[] {
		return Object.keys(localStorage).filter((k: string) => this.validateKeyStored(k));
	}

	public static getResultStored(key: string): Result | boolean {
		try {
			const result: Result = JSON.parse(window.localStorage.getItem(key) as string);
			if (this.validateResultStored(result)) return result;
			else return false;
		} catch (error) {
			return false;
		}
	}

	public static getAllResultsStored(): Result[] | boolean {
		try {
			let results: Result[] = [];
			const keys: string[] = this.getKeysStored();

			keys.forEach((k: string) => {
				let resultStored: Result | boolean = this.getResultStored(k);
				if (resultStored) results.push(this.getResultStored(k) as Result);
			});
			return results;
		} catch (error) {
			return false;
		}
	}

	public static saveResult(name: TName, birth: TBirth): boolean {
		try {
			const totalResults: number = this.getKeysStored().length;
			if (totalResults < this.MAX_NUMBER_SAVES && !this.isResultStored(name, birth)) {
				const newId: number = totalResults + 1;
				const newSearch: Result = {
					id: newId,
					name,
					birth
				};
				window.localStorage.setItem(`${this.KEYNAME}_${newSearch.id}`, JSON.stringify(newSearch));
				return true;
			}
			return false;
		} catch (error) {
			return false;
		}
	}

	public static deleteResult(key: string): boolean {
		try {
			window.localStorage.removeItem(key);
			return true;
		} catch (error) {
			return false;
		}
	}

	public static deleteInvalidKeyValues(): boolean {
		try {
			const keysInvalid = Object.keys(localStorage).filter((k: string) => !this.validateKeyStored(k));
			const keysValid = Object.keys(localStorage).filter((k: string) => this.validateKeyStored(k));
			keysInvalid.forEach((k: string) => this.deleteResult(k));
			keysValid.forEach((k: string) => {
				if (!this.getResultStored(k)) this.deleteResult(k);
			});
			return true;
		} catch (error) {
			return false;
		}
	}
}

export default StorageHandler;
