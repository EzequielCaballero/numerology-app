import { TName, TBirth } from '../../entity/iperson';

export type TResult = {
	key: string;
	name: TName;
	birth: TBirth;
};

export class LocalStorage {
	private static readonly KEY_RESULT: string = 'result';
	private static readonly KEY_THEME: string = 'theme';
	private static readonly MAX_NUMBER_RESULTS: number = 15;

	//#region RESULT
	public static getMaxNumberSaves(): number {
		return this.MAX_NUMBER_RESULTS;
	}

	private static validateKeyResultStored(k: string): boolean {
		const resultRule = `^(${this.KEY_RESULT})_(\\d+)$`;
		let regex = new RegExp(resultRule);
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
							if (typeof (result as TResult).birth.year === 'number')
								if (typeof (result as TResult).birth.month === 'number')
									if (typeof (result as TResult).birth.day === 'number') isValid = true;
			}
			return isValid;
		} catch (error) {
			return false;
		}
	}

	public static isKeyResultStored(idKey: number): boolean {
		const key: string = `${this.KEY_RESULT}_${idKey}`;
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

	public static isResultSavingAllowed(): boolean {
		return this.getAllKeyResultStored().length < this.MAX_NUMBER_RESULTS;
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

	private static getAllKeyResultStored(): string[] {
		let keys: string[] = Object.keys(localStorage).filter((k: string) => this.validateKeyResultStored(k));
		return keys.sort((a, b) => parseInt(b.split('_')[1]) - parseInt(a.split('_')[1]));
	}

	public static getAllResultsStored(): TResult[] | boolean {
		try {
			let results: TResult[] = [];
			const keys: string[] = this.getAllKeyResultStored();

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
				key: `${this.KEY_RESULT}_${newId}`,
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

	public static deleteInvalidResults(): boolean {
		try {
			const keysInvalid = Object.keys(localStorage).filter((k: string) => !this.validateKeyResultStored(k));
			const keysValid = Object.keys(localStorage).filter((k: string) => this.validateKeyResultStored(k));
			keysInvalid.forEach((k: string) => {
				if (k !== this.KEY_THEME) this.deleteResult(k);
			});
			keysValid.forEach((k: string) => {
				if (!this.getResultStored(k)) this.deleteResult(k);
			});
			return true;
		} catch (error) {
			return false;
		}
	}

	//#endregion

	//#region THEME

	public static getTheme(): string | null {
		let theme = window.localStorage.getItem(this.KEY_THEME);
		if (theme === 'dark' || theme === 'light') return theme;
		return null;
	}

	public static saveTheme(theme: string): void {
		try {
			window.localStorage.setItem(this.KEY_THEME, theme);
		} catch (error) {
			throw new Error(error);
		}
	}

	//#endregion
}
