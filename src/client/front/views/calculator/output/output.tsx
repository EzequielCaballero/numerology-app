import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { RoutePath } from '../../../../back/sitemap/routes';
import { Person } from '../../../../back/entity/person';
import { TName, TBirth } from '../../../../back/entity/iperson';
import { Calculator, TRecord } from '../../../../back/services/core/calculator';
import { Validator } from '../../../../back/services/core/validator';
import { URLParams } from '../../../../back/services/handler/urlparams';
import { LocalStorage } from '../../../../back/services/handler/localstorage';
import { ConsumerSetup } from '../../../context/setup';
import { Headline } from '../../../components/headline/headline';
import { ModalDialog, TModal } from '../../../components/modal/modal';
import { CalculatorOutputPanel } from './panel/panel';
import { CalculatorOutputRecord } from './record/record';
import { CalculatorOutputReport } from './report/report';
import './output.css';

type TState = {
	isInputOk: boolean;
	isSaveActive: boolean;
	showReport: boolean;
	modal: TModal;
};

export class CalculatorOutput extends React.Component<RouteComponentProps, TState> {
	private nameParam: TName;
	private birthParam: TBirth;
	private person: Person;
	private record: TRecord;

	constructor(props: RouteComponentProps) {
		super(props);
		URLParams.setLocation(this.props.location.search);
		this.nameParam = URLParams.getParamName();
		this.birthParam = URLParams.getParamBirth();
		this.person = new Person(this.nameParam, this.birthParam);
		this.record = Calculator.getRecord();
		this.state = {
			isInputOk: false,
			isSaveActive: true,
			showReport: false,
			modal: {
				properties: {
					type: 'save',
					isActive: false,
					isInteractive: false
				},
				action: this.handleModalResponse
			}
		};
	}

	public componentDidMount() {
		LocalStorage.deleteInvalidResults();
		if (LocalStorage.isResultStored(this.nameParam, this.birthParam)) this.setState({ isSaveActive: false });

		if (Validator.validateName(this.nameParam) && Validator.validateDate(this.birthParam)) {
			this.person = Calculator.calculateValues(this.person);
			this.record = Calculator.getRecord();
			this.setState({ isInputOk: true });
		} else {
			this.props.history.push({
				pathname: RoutePath.CInput,
				search: ''
			});
		}
	}

	private switchOutput = (): void => {
		let prevState = this.state.showReport;
		this.setState({ showReport: !prevState });
	};

	private setModalProperties = (type: string, isInteractive: boolean, identifier?: string): void => {
		let modal: TModal = this.state.modal;
		modal.properties.type = type;
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
		if (response) {
			this.saveResult();
		}
	};

	private handleSaveResult = (): void => {
		if (LocalStorage.isResultSavingAllowed()) {
			this.setModalProperties('save', true);
			this.showModal(true);
		} else {
			this.setModalProperties('error', false);
			this.showModal(true);
		}
	};

	private saveResult = (): void => {
		try {
			LocalStorage.saveResult(this.nameParam, this.birthParam);
			this.setState({ isSaveActive: false });
		} catch (error) {
			console.error(`Error saving result in localstorage. Detail: ${error}`);
		}
	};

	private goToCalculatorInput = (): void => {
		this.props.history.push({
			pathname: RoutePath.CInput,
			search: URLParams.generateURLwithParams(this.nameParam, this.birthParam)
		});
	};

	private goToHistory = (): void => {
		this.props.history.push({
			pathname: RoutePath.History,
			search: ''
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
								<p>{translate.t(`coutput.modal.${this.state.modal.properties.type}.title`)}</p>
								<p>{translate.t(`coutput.modal.${this.state.modal.properties.type}.msg`)}</p>
							</ModalDialog>
							{/* HEADLINE */}
							<Headline
								title={translate.t('cross.head.title')}
								subtitle={translate.t('coutput.headline.subtitle')}
							/>
							{/* CALCULATOR OUTPUT */}
							<div className="calculator-output">
								<CalculatorOutputPanel
									name={this.nameParam}
									birth={this.birthParam}
									showReport={this.state.showReport}
									isSaveActive={this.state.isSaveActive}
									switchOutput={this.switchOutput}
									handleSaveResult={this.handleSaveResult}
									goToCalculatorInput={this.goToCalculatorInput}
									goToHistory={this.goToHistory}
								/>
								{!this.state.showReport ? (
									<CalculatorOutputRecord person={this.person} record={this.record} />
								) : (
									<CalculatorOutputReport person={this.person} />
								)}
							</div>
						</div>
					)}
				</ConsumerSetup>
			</div>
		);
	}
}

export default CalculatorOutput;
