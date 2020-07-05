import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import TestConfig from '../../../../tests/App.test.config.json';
import Header from '../../../components/header/header';
import { IModal, ModalMessage } from '../../../components/modal/modal';
import { IName, IBirth, CalculatorForm } from '../../../components/calculator/calculator-form/calculator-form';
import './calculator-input.css';

type TState = {
	name: IName;
	birth: IBirth;
	modal: IModal;
};
// type StateKeys = keyof TState;

class CalculatorInput extends React.Component<RouteComponentProps, TState> {
	constructor(props: RouteComponentProps) {
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
			}
		};
	}

	componentDidMount() {
		if (TestConfig.active) this.loadTestData();
	}

	loadTestData() {
		//TEST DATA
		const testName: IName = {
			firstName: [ TestConfig.data.name[0], TestConfig.data.name[1] ],
			lastName: [ TestConfig.data.name[2] ]
		};
		const testBirth: IBirth = {
			birthDay: TestConfig.data.birth[0],
			birthMonth: TestConfig.data.birth[1],
			birthYear: TestConfig.data.birth[2]
		};

		this.setState({
			name: testName,
			birth: testBirth
		});
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

	handleCleanInputs = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
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

	handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		e.stopPropagation();
		if (this.validateForm()) this.goToResultView();
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
			if (subname !== '') fullname += `${subname}-`;
		}
		for (let subname of this.state.name.lastName) {
			if (subname !== '') fullname += `${subname}-`;
		}
		fullname = fullname.slice(0, -1);
		return fullname;
	};

	formatInput_birth = (): string => {
		return `${this.state.birth.birthYear}-${this.state.birth.birthMonth}-${this.state.birth.birthDay}`;
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

	goToResultView = (): void => {
		const params = `?name=${this.formatInput_name()}&birth=${this.formatInput_birth()}`;
		this.props.history.push({
			pathname: '/calculator/result',
			search: params
		});
	};

	render() {
		return (
			<div className="box">
				<div className="box-content">
					{/* MODAL */}
					<ModalMessage
						text={this.state.modal.text}
						properties={this.state.modal.properties}
						showModal={this.state.modal.showModal}
					/>
					{/* INTRO */}
					<Header title="CALCULADORA" />
					{/* CALCULATOR FORM */}
					<CalculatorForm
						name={this.state.name}
						birth={this.state.birth}
						handleInputName={this.handleInputName}
						handleInputDate={this.handleInputDate}
						handleAddName={this.handleAddName}
						handleRemoveName={this.handleRemoveName}
						handleCleanInputs={this.handleCleanInputs}
						handleSubmit={this.handleSubmit}
					/>
				</div>
			</div>
		);
	}
}

export default CalculatorInput;
