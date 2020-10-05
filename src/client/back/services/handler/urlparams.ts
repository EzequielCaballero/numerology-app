import { TName, TBirth } from '../../entity/iperson';
import { Convertor } from '../core/convertor';

enum Params {
	firstname = 'firstname',
	lastname = 'lastname',
	birth = 'birth'
}

export class URLParams {
	private static search: URLSearchParams;

	public static setLocation = (location: string): void => {
		URLParams.search = new URLSearchParams(location);
	};

	public static getParamName = (): TName => {
		let param: TName = { firstName: [ '', '' ], lastName: [ '' ] };
		const _firstname: string = URLParams.search.get(Params.firstname)
			? URLParams.search.get(Params.firstname) as string
			: '';
		const _lastname: string = URLParams.search.get(Params.lastname)
			? URLParams.search.get(Params.lastname) as string
			: '';

		if (
			_firstname !== '' &&
			_lastname !== '' &&
			_firstname.split('-').length <= 3 &&
			_lastname.split('-').length <= 3
		) {
			param = {
				firstName: _firstname.split('-'),
				lastName: _lastname.split('-')
			};
		}

		return Convertor.cleanName(param);
	};

	public static getParamBirth = (): TBirth => {
		let param: TBirth = { year: 0, month: 0, day: 0 };
		const _birth: string = URLParams.search.get(Params.birth) ? URLParams.search.get(Params.birth) as string : '';

		if (_birth !== '' && _birth.split('-').length === 3) {
			let _birthParts: number[] = _birth.split('-').map(Number);
			param = {
				year: _birthParts[0],
				month: _birthParts[1],
				day: _birthParts[2]
			};
		}

		return param;
	};

	public static generateURLwithParams(name: TName, birth: TBirth): string {
		const _firstname = name.firstName.join('-').toLowerCase();
		const _lastname = name.lastName.join('-').toLowerCase();
		const _birth = `${birth.year}-${birth.month}-${birth.day}`;
		return `?firstname=${_firstname}&lastname=${_lastname}&birth=${_birth}`;
	}
}
