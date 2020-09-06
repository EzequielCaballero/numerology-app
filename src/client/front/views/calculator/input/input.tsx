import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { RoutePath } from '../../../../back/sitemap/routes';
import { TName, TBirth } from '../../../../back/entity/iperson';
import { Validator } from '../../../../back/services/core/validator';
import { URLParams } from '../../../../back/services/handler/urlparams';
import { ConsumerSetup } from '../../../context/setup';
import { Headline } from '../../../components/headline/headline';
import { ModalDialog, TModal } from '../../../components/modal/modal';
import { CalculatorInputForm } from './form/form';
import TestConfig from '../../../../../tests/App.test.config.json';
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
				properties: {
					type: 'alert',
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
			this.setModalProperties(false);
			this.showModal(true);
		}
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
		this.showModal(response);
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
				<ConsumerSetup>
					{({ translate }) => (
						<div className="box-content">
							{/* MODAL */}
							<ModalDialog properties={this.state.modal.properties} action={this.state.modal.action}>
								<p>{translate.t('cinput.modal.alert.title')}</p>
								<p>
									<span>{translate.t('cinput.modal.alert.msg.0')}:</span>
									<br />
									<i>{translate.t('cinput.modal.alert.msg.1')}</i>
								</p>
							</ModalDialog>

							{/* HEADLINE */}
							<Headline
								title={translate.t('cross.head.title')}
								subtitle={translate.t('cinput.headline.subtitle')}
							/>

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
					)}
				</ConsumerSetup>
			</div>
		);
	}
}
