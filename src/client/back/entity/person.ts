import { IPerson, TName, TBirth, TNumbers, TKarma, TStage } from './iperson';

export class Person implements IPerson {
	name: TName;
	birth: TBirth;
	age: number = 0;
	numbers: TNumbers = {
		image: 0,
		essence: 0,
		mission: 0,
		natalPath: 0,
		potentialNumber: 0,
		personalKey: 0,
		personalYear: 0,
		personalMonth: 0,
		ageDigit: 0
	};
	stages: TStage[] = [];
	karmas: TKarma = { essence: 0, mission: 0, path: 0, potential: [] };

	constructor(name: TName, birth: TBirth) {
		this.name = name;
		this.birth = birth;
	}
}
