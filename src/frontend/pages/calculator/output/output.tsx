import React from 'react';
import { RouteComponentProps, Redirect } from 'react-router-dom';
import { RoutePath } from '../../../../backend/sitemap/routes';
import { TRecord } from '../../../../backend/services/calculator';
import Convertor from '../../../../backend/services/convertor';
import Validator, { TName, TBirth } from '../../../../backend/services/validator';
import URLHandler from '../../../../backend/services/urlhandler';
import StorageHandler from '../../../../backend/services/storagehandler';
import Person from '../../../../backend/entity/person';
import Headline from '../../../components/headline/headline';
import ModalMessage, { TModal } from '../../../components/modal/modal';
import CalculatorOutputRecord from '../../../components/calculator/output/record/record';
import CalculatorOutputReport from '../../../components/calculator/output/report/report';
import SVGSelector from '../../../components/svg/selector';
import './output.css';

type TState = {
	isSaveActive: boolean;
	showReport: boolean;
	modal: TModal;
};

class CalculatorOutput extends React.Component<RouteComponentProps, TState> {
	private nameParam: TName;
	private birthParam: TBirth;
	private person: Person;
	private record: TRecord;

	constructor(props: RouteComponentProps) {
		super(props);
		URLHandler.setLocation(this.props.location.search);
		this.nameParam = URLHandler.getParamName();
		this.birthParam = URLHandler.getParamBirth();
		this.person = new Person(this.nameParam, this.birthParam);
		this.record = this.person.calculateValues();
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
		StorageHandler.deleteInvalidKeyValues();
		if (!StorageHandler.isResultStored(this.nameParam, this.birthParam)) this.setState({ isSaveActive: true });
	}

	private showRecord = (operation: string): void => {
		let newMsg: string[] = [ '' ];
		//console.log(JSON.stringify(record));
		switch (operation) {
			case 'image':
				newMsg.push(JSON.stringify(this.record.name));
				for (let i = 0; i < this.record.image.length; i++) {
					newMsg.push(JSON.stringify(this.record.image[i]));
				}
				this.setModalContent('Cálculo de imagen...', newMsg);
				break;
			case 'essence':
				newMsg.push(JSON.stringify(this.record.name));
				for (let i = 0; i < this.record.essence.length; i++) {
					newMsg.push(JSON.stringify(this.record.essence[i]));
				}
				this.setModalContent('Cálculo de esencia...', newMsg);
				break;
			case 'mission':
				newMsg.push(JSON.stringify(this.record.name));
				for (let i = 0; i < this.record.mission.length; i++) {
					newMsg.push(JSON.stringify(this.record.mission[i]));
				}
				this.setModalContent('Cálculo de misión...', newMsg);
				break;
			case 'path':
				newMsg.push(JSON.stringify(this.record.birth));
				for (let i = 0; i < this.record.path.length; i++) {
					newMsg.push(JSON.stringify(this.record.path[i]));
				}
				this.setModalContent('Cálculo de sendero...', newMsg);
				break;
			case 'personalKey':
				newMsg.push(`${this.person.birthdate[2]} -> ${this.person.personal_key}`);
				this.setModalContent('Detalle de clave personal...', newMsg);
				break;
			case 'potentialNumber':
				newMsg.push(`${this.person.mission} + ${this.person.natal_path} = ${this.person.potential_number}`);
				this.setModalContent('Detalle del número potencial...', newMsg);
				break;
			case 'karmas':
				newMsg.push(`Esencia: ${this.person.karmas.essence}`);
				newMsg.push(`Misión: ${this.person.karmas.mission}`);
				newMsg.push(`Sendero: ${this.person.karmas.path}`);
				newMsg.push('---');
				newMsg.push(`Números faltantes: ${this.person.possible_karmas}`);
				this.setModalContent('Detalle de karmas...', newMsg);
				break;
			case 'stages':
				for (let stage of this.person.stages) {
					newMsg.push(`${stage.num}° | ${stage.from} -> ${stage.to === 0 ? '∞' : stage.to} = ${stage.value}`);
				}
				this.setModalContent('Detalle de etapas...', newMsg);
				break;
			case 'personalYear':
				newMsg.push(
					`${this.person.birthdate[2]} + ${this.person.birthdate[1]} + ${new Date().getFullYear()} = ${this
						.person.personal_year}`
				);
				this.setModalContent('Detalle del año personal...', newMsg);
				break;
			case 'personalMonth':
				newMsg.push(
					`${this.person.personal_year} + ${new Date().getMonth() + 1} = ${this.person.personal_month}`
				);
				newMsg.push('(año personal + mes actual)');
				this.setModalContent('Detalle del mes personal...', newMsg);
				break;
			case 'ageDigit':
				newMsg.push(`${this.person.age} + ${this.person.age + 1} = ${this.person.age_digit}`);
				newMsg.push('(edad actual + edad próxima)');
				this.setModalContent('Detalle de digito de edad...', newMsg);
				break;
			default:
				break;
		}
		this.setModalProperties(false);
		this.showModal(true);
	};

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
		if (StorageHandler.isSavingAllowed()) {
			let newMsg: string[] = [ '' ];
			newMsg.push('El resultado será guardado en tu navegador.');
			this.setModalContent('Guardar resultado', newMsg);
			this.setModalProperties(true);
			this.showModal(true);
		} else {
			let newMsg: string[] = [ '' ];
			newMsg.push('Número máximo de resultados guardados alcanzado.');
			newMsg.push(`Límite: ${StorageHandler.getMaxNumberSaves()}.`);
			this.setModalContent('Límite de guardado.', newMsg);
			this.setModalProperties(false);
			this.showModal(true);
		}
	};

	private saveResult = (): void => {
		try {
			StorageHandler.saveResult(this.nameParam, this.birthParam);
			this.setState({ isSaveActive: false });
		} catch (error) {
			console.error(`Error saving result in localstorage. Detail: ${error}`);
		}
	};

	private goToCalculatorInput = (): void => {
		this.props.history.push({
			pathname: RoutePath.CInput,
			search: URLHandler.generateURLwithParams(this.nameParam, this.birthParam)
		});
	};

	private goToHistory = (): void => {
		this.props.history.push({
			pathname: RoutePath.History,
			search: ''
		});
	};

	public render(): React.ReactNode {
		if (!Validator.ValidateName(this.nameParam) || !Validator.ValidateDate(this.birthParam))
			return <Redirect from={this.props.location.pathname} exact to={RoutePath.CInput} />;

		return (
			<div className="box">
				<div className="box-content">
					{/* MODAL */}
					<ModalMessage
						text={this.state.modal.text}
						properties={this.state.modal.properties}
						action={this.state.modal.action}
					/>
					{/* HEADER */}
					<Headline title="RESULTADOS" />
					{/* CALCULATOR OUTPUT */}
					<div className="calculator-output">
						<div className="output-option">
							<button onClick={this.goToCalculatorInput}>
								<SVGSelector name="iconEdit" />
							</button>
							<button className="btn-action" onClick={this.switchOutput}>
								{this.state.showReport ? 'Cálculo' : 'Reporte'}
								<SVGSelector name="iconSwitch" />
							</button>
							{this.state.isSaveActive ? (
								<button onClick={this.handleSaveResult}>
									<SVGSelector name="iconSave" />
								</button>
							) : (
								<button onClick={this.goToHistory} title="Resultado guardado">
									<SVGSelector name="iconCheck" />
								</button>
							)}
						</div>
						<div className="input-person">
							<p id="input-person-name">{Convertor.FormatNameToString(this.nameParam)}</p>
							<p id="input-person-date">{Convertor.FormatDateToString(this.birthParam)}</p>
						</div>
						<div className="output-detail">
							{!this.state.showReport ? (
								<CalculatorOutputRecord person={this.person} showRecord={this.showRecord} />
							) : (
								<CalculatorOutputReport person={this.person} />
							)}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default CalculatorOutput;
