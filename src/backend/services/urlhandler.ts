import { TName, TBirth } from './validator';
import Convertor from './convertor';

enum URLparams {
	firstname = 'firstname',
	lastname = 'lastname',
	birth = 'birth'
}

class URLHandler {
	private static search: URLSearchParams;

	public static setLocation = (location: string): void => {
		URLHandler.search = new URLSearchParams(location);
	};

	public static getParamName = (): TName => {
		let param: TName = { firstName: [ '' ], lastName: [ '' ] };
		const _firstname: string = URLHandler.search.get(URLparams.firstname)
			? URLHandler.search.get(URLparams.firstname) as string
			: '';
		const _lastname: string = URLHandler.search.get(URLparams.lastname)
			? URLHandler.search.get(URLparams.lastname) as string
			: '';

		if (_firstname !== '' && _lastname !== '') {
			param = {
				firstName: _firstname.split('-'),
				lastName: _lastname.split('-')
			};
		}

		return Convertor.CleanName(param);
	};

	public static getParamBirth = (): TBirth => {
		let param: TBirth = { birthYear: 0, birthMonth: 0, birthDay: 0 };
		const _birth: string = URLHandler.search.get(URLparams.birth)
			? URLHandler.search.get(URLparams.birth) as string
			: '';

		if (_birth !== '') {
			let _birthParts: number[] = _birth.split('-').map(Number);
			param = {
				birthYear: _birthParts[0],
				birthMonth: _birthParts[1],
				birthDay: _birthParts[2]
			};
		}

		return param;
	};

	public static generateURLwithParams(name: TName, birth: TBirth): string {
		const _firstname = name.firstName.join('-').toLowerCase();
		const _lastname = name.lastName.join('-').toLowerCase();
		const _birth = `${birth.birthYear}-${birth.birthMonth}-${birth.birthDay}`;
		return `?firstname=${_firstname}&lastname=${_lastname}&birth=${_birth}`;
	}
}

export default URLHandler;
