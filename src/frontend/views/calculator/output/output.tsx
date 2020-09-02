import React from 'react';
import { RouteComponentProps, Redirect } from 'react-router-dom';
import { RoutePath } from '../../../../backend/sitemap/routes';
import { Person } from '../../../../backend/entity/person';
import { TName, TBirth } from '../../../../backend/entity/iperson';
import { Calculator, TRecord } from '../../../../backend/services/core/calculator';
import { Validator } from '../../../../backend/services/core/validator';
import { URLParams } from '../../../../backend/services/handler/urlparams';
import { LocalStorage } from '../../../../backend/services/handler/localstorage';
import { Headline } from '../../../components/headline/headline';
import { ModalDialog, TModal } from '../../../components/modal/modal';
import { CalculatorOutputPanel } from '../../../components/calculator/output/panel/panel';
import { CalculatorOutputRecord } from '../../../components/calculator/output/record/record';
import { CalculatorOutputReport } from '../../../components/calculator/output/report/report';
import './output.css';

type TState = {
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
		this.person = Calculator.calculateValues(new Person(this.nameParam, this.birthParam));
		this.record = Calculator.getRecord();
		this.state = {
			isSaveActive: false,
			showReport: false,
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
		LocalStorage.deleteInvalidResults();
		if (!LocalStorage.isResultStored(this.nameParam, this.birthParam)) this.setState({ isSaveActive: true });
	}

	private switchOutput = (): void => {
		let prevState = this.state.showReport;
		this.setState({ showReport: !prevState });
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
		if (response) {
			this.saveResult();
		}
	};

	private handleSaveResult = (): void => {
		if (LocalStorage.isResultSavingAllowed()) {
			let newMsg: string[] = [ '' ];
			newMsg.push('El resultado será guardado en tu navegador.');
			this.setModalContent('Guardar resultado', newMsg);
			this.setModalProperties(true);
			this.showModal(true);
		} else {
			let newMsg: string[] = [ '' ];
			newMsg.push('Número máximo de resultados guardados alcanzado.');
			newMsg.push(`Límite: ${LocalStorage.getMaxNumberSaves()}.`);
			this.setModalContent('Límite de guardado.', newMsg);
			this.setModalProperties(false);
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
		if (!Validator.validateName(this.nameParam) || !Validator.validateDate(this.birthParam))
			return <Redirect from={this.props.location.pathname} exact to={RoutePath.CInput} />;

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
					<Headline title="RESULTADOS" />
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
			</div>
		);
	}
}

export default CalculatorOutput;
