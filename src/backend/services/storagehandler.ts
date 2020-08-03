import { TName, TBirth } from './validator';

export type TResult = {
	id: number;
	key: string;
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

	private static validateResultStored(result: any): result is TResult {
		try {
			let isValid = false;
			if (
				(result as TResult).id !== undefined &&
				(result as TResult).key !== undefined &&
				(result as TResult).name !== undefined &&
				(result as TResult).birth !== undefined
			) {
				if (typeof (result as TResult).id === 'number')
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

	public static isResultStored(name: TName, birth: TBirth): boolean {
		const results: TResult[] = this.getAllResultsStored() as TResult[];
		const matches: TResult[] = results.filter(
			(r: TResult) =>
				JSON.stringify(r.name) === JSON.stringify(name) && JSON.stringify(r.birth) === JSON.stringify(birth)
		);
		return matches.length > 0;
	}

	private static getKeysStored(): string[] {
		return Object.keys(localStorage).filter((k: string) => this.validateKeyStored(k));
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

	public static getAllResultsStored(): TResult[] | boolean {
		try {
			let results: TResult[] = [];
			const keys: string[] = this.getKeysStored();

			keys.forEach((k: string) => {
				let resultStored: TResult | boolean = this.getResultStored(k);
				if (resultStored) results.push(this.getResultStored(k) as TResult);
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
				const newSearch: TResult = {
					id: newId,
					key: `${this.KEYNAME}_${newId}`,
					name,
					birth
				};
				window.localStorage.setItem(newSearch.key, JSON.stringify(newSearch));
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
