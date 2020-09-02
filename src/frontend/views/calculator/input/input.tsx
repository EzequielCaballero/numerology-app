import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { RoutePath } from '../../../../backend/sitemap/routes';
import { TName, TBirth } from '../../../../backend/entity/iperson';
import { Validator } from '../../../../backend/services/core/validator';
import { URLParams } from '../../../../backend/services/handler/urlparams';
import { Headline } from '../../../components/headline/headline';
import { ModalDialog, TModal } from '../../../components/modal/modal';
import { CalculatorInputForm } from '../../../components/calculator/input/form/form';
import TestConfig from '../../../../tests/App.test.config.json';
import './input.css';

type TState = {
	name: TName;
	birth: TBirth;
	modal: TModal;
};
// type StateKeys = keyof TState;

export class CalculatorInput extends React.Component<RouteComponentProps, TState> {
	private nameParam: TName;
	private birthParam: TBirth;

	constructor(props: RouteComponentProps) {
		super(props);
		URLParams.setLocation(this.props.location.search);
		this.nameParam = URLParams.getParamName();
		this.birthParam = URLParams.getParamBirth();
		this.state = {
			name: this.nameParam,
			birth: this.birthParam,
			modal: {
				text: {
					title: '',
					msg: [ '' ]
				},
				properties: {
					isActive: false,
					isInteractive: false
				},
				action: this.handleModalResponse
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
			year: TestConfig.data.birth[0],
			month: TestConfig.data.birth[1],
			day: TestConfig.data.birth[2]
		};

		this.setState({
			name: testName,
			birth: testBirth
		});
	}

	private handleInputName = (e: React.ChangeEvent<HTMLInputElement>): void => {
		try {
			e.preventDefault();
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
			e.preventDefault();
			const { name, value } = e.target;
			const maxLength: number = name === 'year' ? 4 : 2;
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

	private handleCleanInputs = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();
		let name: TName = {
			firstName: [ '' ],
			lastName: [ '' ]
		};
		let birth: TBirth = {
			day: 0,
			month: 0,
			year: 0
		};
		this.setState({ name, birth });
	};

	private handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		e.stopPropagation();
		if (Validator.validateName(this.state.name) && Validator.validateDate(this.state.birth)) this.goToResultView();
		else {
			let newMsg: string[] = [];
			newMsg.push('Por favor revisar los campos mandatorios');
			newMsg.push('Nombre | Apellido | Fecha de nacimiento');
			this.setModalContent('Información incorrecta', newMsg);
			this.setModalProperties(false);
			this.showModal(true);
		}
	};

	private setModalContent = (title: string, msg: string[]): void => {
		let modal: TModal = this.state.modal;
		modal.text.title = title;
		modal.text.msg = msg;
		this.setState({ modal });
	};

	private setModalProperties = (isInteractive: boolean, identifier?: string): void => {
		let modal: TModal = this.state.modal;
		modal.properties.isInteractive = isInteractive;
		if (identifier) modal.properties.actionIdentifier = identifier;
		this.setState({ modal });
	};

	private showModal = (show: boolean): void => {
		let modal: TModal = this.state.modal;
		modal.properties.isActive = show;
		this.setState({ modal });
	};

	private handleModalResponse = (response: boolean): void => {
		this.showModal(false);
	};

	private goToResultView = (): void => {
		this.props.history.push({
			state: RoutePath.CInput,
			pathname: RoutePath.COutput,
			search: URLParams.generateURLwithParams(this.state.name, this.state.birth)
		});
	};

	public render(): React.ReactNode {
		return (
			<div className="box">
				<div className="box-content">
					{/* MODAL */}
					<ModalDialog
						text={this.state.modal.text}
						properties={this.state.modal.properties}
						action={this.state.modal.action}
					/>

					{/* HEADLINE */}
					<Headline title="CALCULADORA" />

					{/* CALCULATOR FORM */}
					<CalculatorInputForm
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
