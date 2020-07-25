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
};

export interface IPerson {
	fullname: string[];
	birthdate: number[];
	age: number;
	image: number;
	essence: number;
	mission: number;
	natal_path: number;
	potential_number: number;
	personal_key: number;
	karmas: TKarma;
	possible_karmas: number[];
	stages: TStage[];
	personal_year: number;
	personal_month: number;
	age_digit: number;
}
