export type TNumbers = {
	image: number;
	essence: number;
	mission: number;
	natal_path: number;
	potential_number: number;
	personal_key: number;
	personal_year: number;
	personal_month: number;
	age_digit: number;
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
	possible_karmas: number[];
};

export interface IPerson {
	fullname: string[];
	birthdate: number[];
	age: number;
	numbers: TNumbers;
	stages: TStage[];
	karmas: TKarma;
}
