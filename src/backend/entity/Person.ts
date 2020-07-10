import { TStage, TKarma, IPerson } from './iperson';
import Convertor from '../services/convertor';
import Calculator, { TRecord } from '../services/calculator';
import Validator, { TName, TBirth } from '../services/validator';

class Person implements IPerson {
	nombre: string[];
	nacimiento: number[];
	edad: number = 0;
	imagen: number = 0;
	esencia: number = 0;
	mision: number = 0;
	sendero_natal: number = 0;
	numero_potencial: number = 0;
	clave_personal: number = 0;
	karmas: TKarma = { essence: this.esencia, mission: this.mision, path: this.sendero_natal };
	posibles_karmas: number[] = [];
	etapas: TStage[] = [];
	ano_personal: number = 0;
	mes_personal: number = 0;
	digito_edad: number = 0;

	constructor(name: TName, birth: TBirth) {
		if (Validator.ValidateName(name) && Validator.ValidateDate(birth)) {
			this.nombre = Convertor.FormatNameToArray(name);
			this.nacimiento = Convertor.FormatDateToArray(birth);
		} else {
			this.nombre = [];
			this.nacimiento = [];
		}
	}

	public calculateValues(): TRecord {
		try {
			Calculator.CleanRecord();
			if (this.nombre.length !== 0 && this.nacimiento.length !== 0) {
				Calculator.InitRecord(this.nombre, this.nacimiento);
				this.edad = Calculator.CalculateAge(this.nacimiento);
				this.imagen = Calculator.CalculateImage(this.nombre);
				this.esencia = Calculator.CalculateEssence(this.nombre);
				this.mision = Calculator.CalculateMission(this.nombre);
				this.sendero_natal = Calculator.CalculatePath(this.nacimiento);
				this.clave_personal = Calculator.CalculatePersonalKey(this.nacimiento);
				this.numero_potencial = Calculator.CalculatePotential(this.mision, this.sendero_natal);
				this.karmas = Calculator.CalculateKarmas();
				this.posibles_karmas = Calculator.CalculatePossibleKarmas();
				this.etapas = Calculator.CalculateStages(this.nacimiento, this.sendero_natal);
				this.ano_personal = Calculator.CalculatePersonalYear(this.nacimiento);
				this.mes_personal = Calculator.CalculatePersonalMonth(this.ano_personal);
				this.digito_edad = Calculator.CalculateAgeDigit(this.edad);
			}
		} catch (error) {
			console.error(`Error calculating person values. Detail: ${error}`);
		} finally {
			return Calculator._record;
		}
	}
}

export default Person;
