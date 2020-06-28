import React from 'react';
//LOGIC
import Person from '../../../backend/entity/Person';
import Calculator from '../../../backend/controllers/Calculator';
import TestConfig from '../../../tests/App.test.config.json';
//COMPONENTS
import { IModal, ModalMessage } from '../../components/modal/modal';
import CalculatorForm from '../../components/calculator/calculator-form/calculator-form';
import CalculatorResult from '../../components/calculator/calculator-result/calculator-result';
//ASSERTS
import logo from '../../assets/logo-1.png';
import './calculator.css';

interface IName {
	firstName: string[];
	lastName: string[];
}

interface IBirth {
	birthDay: number;
	birthMonth: number;
	birthYear: number;
}

interface IState {
	name: IName;
	birth: IBirth;
	modal: IModal;
	showResults: boolean;
}
// type StateKeys = keyof IState;

class CalculatorView extends React.Component<{}, IState> {
	private calculator: Calculator = new Calculator();
	private person: Person = new Person();
	constructor(props: {}) {
		super(props);
		this.state = {
			name: {
				firstName: [ '' ],
				lastName: [ '' ]
			},
			birth: {
				birthDay: 0,
				birthMonth: 0,
				birthYear: 0
			},
			modal: {
				text: {
					title: '',
					msg: [ '' ]
				},
				properties: {
					show: false
				},
				showModal: this.showModal
			},
			showResults: false
		};
	}

	componentDidMount() {
		this.loadTestData();
	}

	loadTestData() {
		//TEST DATA
		const testName: IName = {
			firstName: TestConfig.data.firstName,
			lastName: TestConfig.data.lastName
		};
		const testBirth: IBirth = {
			birthDay: TestConfig.data.birthDay,
			birthMonth: TestConfig.data.birthMonth,
			birthYear: TestConfig.data.birthYear
		};
		if (TestConfig.active) {
			this.setState({
				name: testName,
				birth: testBirth
			});
		}
	}

	handleInputName = (e: React.ChangeEvent<HTMLInputElement>): void => {
		try {
			const { name, value } = e.target;
			const keyState: string = name.split('-')[0];
			const indexValue: number = Number(name.split('-')[1]);
			let newState: IName = this.state.name;
			newState[keyState as keyof IName][indexValue] = value
				.replace(/\s/g, '')
				.replace(/[^[A-Za-zÀ-ÖØ-öø-ÿ]/g, '');
			this.setState({ name: newState });
		} catch (error) {
			console.log(error);
		}
	};

	handleInputDate = (e: React.ChangeEvent<HTMLInputElement>): void => {
		try {
			const { name, value } = e.target;
			const maxLength: number = name === 'birthYear' ? 4 : 2;
			let newState: IBirth = this.state.birth;
			newState[name as keyof IBirth] = value.length <= maxLength ? Number(value) : Number(value.slice(0, -1));
			this.setState({ birth: newState });
		} catch (error) {
			console.log(error);
		}
	};

	handleAddName = (field: string): void => {
		if (this.state.name[field as keyof IName].length < 3) {
			let newState: IName = this.state.name;
			newState[field as keyof IName].push('');
			this.setState({ name: newState });
		}
	};

	handleRemoveName = (field: string) => {
		if (this.state.name[field as keyof IName].length > 1) {
			let newState: IName = this.state.name;
			newState[field as keyof IName].pop();
			this.setState({ name: newState });
		}
	};

	handleCleanInputs = (event: React.ChangeEvent<HTMLButtonElement>) => {
		event.preventDefault();
		let name: IName = {
			firstName: [ '' ],
			lastName: [ '' ]
		};
		let birth: IBirth = {
			birthDay: 0,
			birthMonth: 0,
			birthYear: 0
		};
		this.setState({ name, birth });
	};

	handleSubmit = (e: Event) => {
		e.preventDefault();
		e.stopPropagation();
		if (this.validateForm()) this.calculateValues();
		else {
			let newMsg: string[] = [];
			newMsg.push('Por favor revisar los campos mandatorios');
			newMsg.push('Nombre | Apellido | Fecha de nacimiento');
			this.handleModalContent('Información incorrecta', newMsg);
			this.showModal(true);
		}
	};

	validateForm = (): boolean => {
		if (this.validateNameInput() && this.validateDateInput()) return true;
		return false;
	};

	validateNameInput = (): boolean => {
		if (this.state.name.firstName[0] !== '' && this.state.name.lastName[0] !== '') return true;
		return false;
	};

	validateDateInput = (): boolean => {
		if (
			this.state.birth.birthDay !== 0 &&
			this.state.birth.birthDay > 0 &&
			this.state.birth.birthDay <= 31 &&
			this.state.birth.birthMonth !== 0 &&
			this.state.birth.birthMonth > 0 &&
			this.state.birth.birthMonth <= 12 &&
			this.state.birth.birthYear !== 0 &&
			this.state.birth.birthYear >= 1000
		)
			return true;

		return false;
	};

	formatInput_name = (): string => {
		let fullname: string = '';
		for (let subname of this.state.name.firstName) {
			if (subname !== '') fullname += `${subname}|`;
		}
		for (let subname of this.state.name.lastName) {
			if (subname !== '') fullname += `${subname}|`;
		}
		fullname = fullname.slice(0, -1);
		return fullname;
	};

	formatInput_birth = (): Date => {
		const birth: Date = new Date(
			`${this.state.birth.birthYear}/${this.state.birth.birthMonth}/${this.state.birth.birthDay}`
		);
		return birth;
	};

	calculateValues = (): void => {
		//NORMALIZE
		this.person.nombre_input = this.formatInput_name();
		this.person.nombre = this.calculator.FormatName(this.formatInput_name());
		this.person.nacimiento = this.calculator.FormatBirth(this.formatInput_birth());
		this.person.edad = this.calculator.CalculateAge(this.formatInput_birth());
		//CALCULATE
		this.person.imagen = this.calculator.CalculateImage(this.person.nombre);
		this.person.esencia = this.calculator.CalculateEssence(this.person.nombre);
		this.person.mision = this.calculator.CalculateMission(this.person.nombre);
		this.person.sendero_natal = this.calculator.CalculatePath(this.person.nacimiento);
		this.person.clave_personal = this.calculator.CalculatePersonalKey(this.person.nacimiento);
		this.person.numero_potencial = this.calculator.CalculatePotential(
			this.person.mision,
			this.person.sendero_natal
		);
		this.person.karmas = this.calculator.CalculateKarmas();
		this.person.posibles_karmas = this.calculator.CalculatePossibleKarmas();
		this.person.etapas = this.calculator.CalculateStages(this.person.nacimiento, this.person.sendero_natal);
		this.person.ano_personal = this.calculator.CalculatePersonalYear(this.person.nacimiento);
		this.person.mes_personal = this.calculator.CalculatePersonalMonth(this.person.ano_personal);
		this.person.digito_edad = this.calculator.CalculateAgeDigit(this.person.edad);
		//console.info(JSON.stringify(this.person));
		this.showResultsView(true);
	};

	showResultsView = (show: boolean): void => {
		if (!show) {
			this.calculator = new Calculator();
			this.person = new Person();
		}
		this.setState({ showResults: show });
	};

	showOperations = (type: string): void => {
		let newMsg: string[] = [ '' ];
		//console.log(JSON.stringify(this.calculator._record));
		switch (type) {
			case 'image':
				newMsg.push(JSON.stringify(this.calculator._record.name));
				for (let i = 0; i < this.calculator._record.image.length; i++) {
					newMsg.push(JSON.stringify(this.calculator._record.image[i]));
				}
				this.handleModalContent('Cálculo de imagen...', newMsg);
				break;
			case 'essence':
				newMsg.push(JSON.stringify(this.calculator._record.name));
				for (let i = 0; i < this.calculator._record.essence.length; i++) {
					newMsg.push(JSON.stringify(this.calculator._record.essence[i]));
				}
				this.handleModalContent('Cálculo de esencia...', newMsg);
				break;
			case 'mission':
				newMsg.push(JSON.stringify(this.calculator._record.name));
				for (let i = 0; i < this.calculator._record.mission.length; i++) {
					newMsg.push(JSON.stringify(this.calculator._record.mission[i]));
				}
				this.handleModalContent('Cálculo de misión...', newMsg);
				break;
			case 'path':
				newMsg.push(JSON.stringify(this.calculator._record.birth));
				for (let i = 0; i < this.calculator._record.path.length; i++) {
					newMsg.push(JSON.stringify(this.calculator._record.path[i]));
				}
				this.handleModalContent('Cálculo de sendero...', newMsg);
				break;
			case 'personalKey':
				newMsg.push(`${this.person.nacimiento[0]} -> ${this.person.clave_personal}`);
				this.handleModalContent('Detalle de clave personal...', newMsg);
				break;
			case 'potentialNumber':
				newMsg.push(`${this.person.mision} + ${this.person.sendero_natal} = ${this.person.numero_potencial}`);
				this.handleModalContent('Detalle del número potencial...', newMsg);
				break;
			case 'karmas':
				newMsg.push(`Esencia: ${this.person.karmas.essence}`);
				newMsg.push(`Misión: ${this.person.karmas.mission}`);
				newMsg.push(`Sendero: ${this.person.karmas.path}`);
				newMsg.push('---');
				newMsg.push(`Números faltantes: ${this.person.posibles_karmas}`);
				this.handleModalContent('Detalle de karmas...', newMsg);
				break;
			case 'stages':
				for (let stage of this.person.etapas) {
					newMsg.push(`${stage.num}° | ${stage.from} -> ${stage.to} = ${stage.value}`);
				}
				this.handleModalContent('Detalle de etapas...', newMsg);
				break;
			case 'personalYear':
				newMsg.push(
					`${this.person.nacimiento[0]} + ${this.person.nacimiento[1]} + ${new Date().getFullYear()} = ${this
						.person.ano_personal}`
				);
				this.handleModalContent('Detalle del año personal...', newMsg);
				break;
			case 'personalMonth':
				newMsg.push(`${this.person.ano_personal} + ${new Date().getMonth() + 1} = ${this.person.mes_personal}`);
				newMsg.push('(año personal + mes actual)');
				this.handleModalContent('Detalle del mes personal...', newMsg);
				break;
			case 'ageDigit':
				newMsg.push(`${this.person.edad} + ${this.person.edad + 1} = ${this.person.digito_edad}`);
				newMsg.push('(edad actual + edad próxima)');
				this.handleModalContent('Detalle de digito de edad...', newMsg);
				break;
			default:
				break;
		}
		this.showModal(true);
	};

	handleModalContent = (title: string, msg: string[]): void => {
		let modal: IModal = this.state.modal;
		modal.text.title = title;
		modal.text.msg = msg;
		this.setState({ modal });
	};

	showModal = (show: boolean): void => {
		let modal: IModal = this.state.modal;
		modal.properties.show = show;
		this.setState({ modal });
	};

	render() {
		return (
			<div className="box">
				<div className="box-content">
					{/* INTRO */}
					<div className="calculator-intro">
						<img src={logo} className="calculator-intro-logo" alt="logo" />
						<div className="calculator-intro-text">
							<p>Numerología pitagórica</p>
							<p>
								<strong>{this.state.showResults ? 'RESULTADOS' : 'CALCULADORA'}</strong>
							</p>
						</div>
					</div>
					{/* MODAL */}
					<ModalMessage
						text={this.state.modal.text}
						properties={this.state.modal.properties}
						showModal={this.state.modal.showModal}
					/>

					{!this.state.showResults ? (
						<CalculatorForm
							valueName={this.state.name}
							valueBirth={this.state.birth}
							handleInputName={this.handleInputName}
							handleInputDate={this.handleInputDate}
							handleAddName={this.handleAddName}
							handleRemoveName={this.handleRemoveName}
							handleCleanInputs={this.handleCleanInputs}
							handleSubmit={this.handleSubmit}
						/>
					) : (
						<CalculatorResult
							person={this.person}
							showOperations={this.showOperations}
							showResultsView={this.showResultsView}
						/>
					)}
				</div>
			</div>
		);
	}
}

export default CalculatorView;
