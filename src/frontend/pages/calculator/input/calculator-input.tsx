import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { RoutePath } from '../../../../backend/sitemap/routes';
import TestConfig from '../../../../tests/App.test.config.json';
import Header from '../../../components/header/header';
import ModalMessage, { TModal } from '../../../components/modal/modal';
import FormCalculator from '../../../components/form/form-calculator/form-calculator';
import Validator, { TName, TBirth } from '../../../../backend/services/validator';
import URLHandler from '../../../../backend/services/urlhandler';
import './calculator-input.css';

type TState = {
	name: TName;
	birth: TBirth;
	modal: TModal;
};
// type StateKeys = keyof TState;

class CalculatorInput extends React.Component<RouteComponentProps, TState> {
	private nameParam: TName;
	private birthParam: TBirth;

	constructor(props: RouteComponentProps) {
		super(props);
		URLHandler.setLocation(this.props.location.search);
		this.nameParam = URLHandler.getParamName();
		this.birthParam = URLHandler.getParamBirth();
		this.state = {
			name: this.nameParam,
			birth: this.birthParam,
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

	public componentDidMount() {
		if (TestConfig.active) this.loadTestData();
	}

	private loadTestData() {
		//TEST DATA
		const testName: TName = {
			firstName: [ TestConfig.data.name[0], TestConfig.data.name[1] ],
			lastName: [ TestConfig.data.name[2] ]
		};
		const testBirth: TBirth = {
			birthDay: TestConfig.data.birth[0],
			birthMonth: TestConfig.data.birth[1],
			birthYear: TestConfig.data.birth[2]
		};

		this.setState({
			name: testName,
			birth: testBirth
		});
	}

	private handleInputName = (e: React.ChangeEvent<HTMLInputElement>): void => {
		try {
			const { name, value } = e.target;
			const keyState: string = name.split('-')[0];
			const indexValue: number = Number(name.split('-')[1]);
			let newState: TName = this.state.name;
			newState[keyState as keyof TName][indexValue] = value
				.replace(/\s/g, '')
				.replace(/[^[A-Za-zÀ-ÖØ-öø-ÿ]/g, '');
			this.setState({ name: newState });
		} catch (error) {
			console.log(error);
		}
	};

	private handleInputDate = (e: React.ChangeEvent<HTMLInputElement>): void => {
		try {
			const { name, value } = e.target;
			const maxLength: number = name === 'birthYear' ? 4 : 2;
			let newState: TBirth = this.state.birth;
			newState[name as keyof TBirth] = value.length <= maxLength ? Number(value) : Number(value.slice(0, -1));
			this.setState({ birth: newState });
		} catch (error) {
			console.log(error);
		}
	};

	private handleAddName = (field: string): void => {
		if (this.state.name[field as keyof TName].length < 3) {
			let newState: TName = this.state.name;
			newState[field as keyof TName].push('');
			this.setState({ name: newState });
		}
	};

	private handleRemoveName = (field: string) => {
		if (this.state.name[field as keyof TName].length > 1) {
			let newState: TName = this.state.name;
			newState[field as keyof TName].pop();
			this.setState({ name: newState });
		}
	};

	private handleCleanInputs = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		event.preventDefault();
		let name: TName = {
			firstName: [ '' ],
			lastName: [ '' ]
		};
		let birth: TBirth = {
			birthDay: 0,
			birthMonth: 0,
			birthYear: 0
		};
		this.setState({ name, birth });
	};

	private handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		e.stopPropagation();
		if (Validator.ValidateName(this.state.name) && Validator.ValidateDate(this.state.birth)) this.goToResultView();
		else {
			let newMsg: string[] = [];
			newMsg.push('Por favor revisar los campos mandatorios');
			newMsg.push('Nombre | Apellido | Fecha de nacimiento');
			this.handleModalContent('Información incorrecta', newMsg);
			this.showModal(true);
		}
	};

	private handleModalContent = (title: string, msg: string[]): void => {
		let modal: TModal = this.state.modal;
		modal.text.title = title;
		modal.text.msg = msg;
		this.setState({ modal });
	};

	private showModal = (show: boolean): void => {
		let modal: TModal = this.state.modal;
		modal.properties.show = show;
		this.setState({ modal });
	};

	private goToResultView = (): void => {
		this.props.history.push({
			pathname: RoutePath.COutput,
			search: URLHandler.generateURLwithParams(this.state.name, this.state.birth)
		});
	};

	public render() {
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
					<FormCalculator
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
