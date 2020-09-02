export type TName = {
	firstName: string[];
	lastName: string[];
};

export type TBirth = {
	year: number;
	month: number;
	day: number;
};

export type TNumbers = {
	image: number;
	essence: number;
	mission: number;
	natalPath: number;
	potentialNumber: number;
	personalKey: number;
	personalYear: number;
	personalMonth: number;
	ageDigit: number;
};

export type TStage = {
	num: number;
	from: number;
	to: number;
	value: number;
};

export type TKarma = {
	essence: number;
	mission: number;
	path: number;
	possible: number[];
};

export interface IPerson {
	name: TName;
	birth: TBirth;
	age: number;
	numbers: TNumbers;
	stages: TStage[];
	karmas: TKarma;
}
