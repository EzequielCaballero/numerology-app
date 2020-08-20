import { TName, TBirth } from './validator';

export type TResult = {
	key: string;
	name: TName;
	birth: TBirth;
};

class StorageHandler {
	private static readonly KEYNAME: string = 'result';
	private static readonly MAX_NUMBER_SAVES: number = 6;

	public static getMaxNumberSaves(): number {
		return this.MAX_NUMBER_SAVES;
	}

	private static validateKeyStored(k: string): boolean {
		const rule = `^(${this.KEYNAME})_(\\d+)$`;
		let regex = new RegExp(rule);
		return regex.test(k);
	}

	private static validateResultStored(result: any): result is TResult {
		try {
			let isValid = false;
			if (
				(result as TResult).key !== undefined &&
				(result as TResult).name !== undefined &&
				(result as TResult).birth !== undefined
			) {
				if (typeof (result as TResult).key === 'string')
					if (Array.isArray((result as TResult).name.firstName))
						if (Array.isArray((result as TResult).name.lastName))
							if (typeof (result as TResult).birth.birthYear === 'number')
								if (typeof (result as TResult).birth.birthMonth === 'number')
									if (typeof (result as TResult).birth.birthDay === 'number') isValid = true;
			}
			return isValid;
		} catch (error) {
			return false;
		}
	}

	public static isKeyStored(idKey: number): boolean {
		const key: string = `${this.KEYNAME}_${idKey}`;
		return Object.keys(localStorage).filter((k: string) => k === key).length > 0;
	}

	public static isResultStored(name: TName, birth: TBirth): boolean {
		const results: TResult[] = this.getAllResultsStored() as TResult[];
		const matches: TResult[] = results.filter(
			(r: TResult) =>
				JSON.stringify(r.name) === JSON.stringify(name) && JSON.stringify(r.birth) === JSON.stringify(birth)
		);
		return matches.length > 0;
	}

	public static isSavingAllowed(): boolean {
		return this.getAllKeysStored().length < this.MAX_NUMBER_SAVES;
	}

	public static getResultStored(key: string): TResult | boolean {
		try {
			const result: TResult = JSON.parse(window.localStorage.getItem(key) as string);
			if (this.validateResultStored(result)) return result;
			else return false;
		} catch (error) {
			return false;
		}
	}

	private static getAllKeysStored(): string[] {
		let keys: string[] = Object.keys(localStorage).filter((k: string) => this.validateKeyStored(k));
		return keys.sort((a, b) => parseInt(b.split('_')[1]) - parseInt(a.split('_')[1]));
	}

	public static getAllResultsStored(): TResult[] | boolean {
		try {
			let results: TResult[] = [];
			const keys: string[] = this.getAllKeysStored();

			keys.forEach((k: string) => {
				let resultStored: TResult | boolean = this.getResultStored(k);
				if (resultStored) results.push(this.getResultStored(k) as TResult);
			});
			return results;
		} catch (error) {
			return false;
		}
	}

	public static saveResult(name: TName, birth: TBirth): void {
		try {
			let newId: number = Date.now();
			const newSearch: TResult = {
				key: `${this.KEYNAME}_${newId}`,
				name,
				birth
			};
			window.localStorage.setItem(newSearch.key, JSON.stringify(newSearch));
		} catch (error) {
			throw new Error(error);
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
