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
	nombre: string[];
	nacimiento: number[];
	edad: number;
	imagen: number;
	esencia: number;
	mision: number;
	sendero_natal: number;
	numero_potencial: number;
	clave_personal: number;
	karmas: TKarma;
	posibles_karmas: number[];
	etapas: TStage[];
	ano_personal: number;
	mes_personal: number;
	digito_edad: number;
}
