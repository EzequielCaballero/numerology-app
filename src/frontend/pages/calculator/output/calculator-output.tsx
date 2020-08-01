import React from 'react';
import { RouteComponentProps, Redirect } from 'react-router-dom';
import { RoutePath } from '../../../../backend/sitemap/routes';
import Header from '../../../components/calculator/header/header';
import ModalMessage, { TModal } from '../../../components/modal/modal';
import CalculatorOutputRecord from '../../../components/calculator/output/record/record';
import CalculatorOutputReport from '../../../components/calculator/output/report/report';
import { TRecord } from '../../../../backend/services/calculator';
import Validator, { TName, TBirth } from '../../../../backend/services/validator';
import URLHandler from '../../../../backend/services/urlhandler';
import StorageHandler from '../../../../backend/services/storagehandler';
import Person from '../../../../backend/entity/person';
import './calculator-output.css';

type TState = {
	isSaveActive: boolean;
	showReport: boolean;
	modal: TModal;
};

class CalculatorOutput extends React.PureComponent<RouteComponentProps, TState> {
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
					show: false
				},
				showModal: this.showModal
			}
		};
	}

	public componentDidMount() {
		StorageHandler.deleteInvalidKeyValues();
		if (!StorageHandler.isResultStored(this.nameParam, this.birthParam)) this.setState({ isSaveActive: true });
	}

	private getFullnameText = (): string => {
		let fullname: string[] = this.nameParam.firstName.concat(this.nameParam.lastName);
		return fullname.map((name: string) => name.toLowerCase()).join(' ');
	};

	private getBirthdateText = (): string => {
		const birth: Date = new Date(
			`${this.person.birthdate[0]}-${this.person.birthdate[1]}-${this.person.birthdate[2]}`
		);
		return `${('0' + birth.getDate()).slice(-2)}/${('0' + (birth.getMonth() + 1)).slice(
			-2
		)}/${birth.getFullYear()}`;
	};

	private showRecord = (operation: string): void => {
		let newMsg: string[] = [ '' ];
		//console.log(JSON.stringify(record));
		switch (operation) {
			case 'image':
				newMsg.push(JSON.stringify(this.record.name));
				for (let i = 0; i < this.record.image.length; i++) {
					newMsg.push(JSON.stringify(this.record.image[i]));
				}
				this.handleModalContent('Cálculo de imagen...', newMsg);
				break;
			case 'essence':
				newMsg.push(JSON.stringify(this.record.name));
				for (let i = 0; i < this.record.essence.length; i++) {
					newMsg.push(JSON.stringify(this.record.essence[i]));
				}
				this.handleModalContent('Cálculo de esencia...', newMsg);
				break;
			case 'mission':
				newMsg.push(JSON.stringify(this.record.name));
				for (let i = 0; i < this.record.mission.length; i++) {
					newMsg.push(JSON.stringify(this.record.mission[i]));
				}
				this.handleModalContent('Cálculo de misión...', newMsg);
				break;
			case 'path':
				newMsg.push(JSON.stringify(this.record.birth));
				for (let i = 0; i < this.record.path.length; i++) {
					newMsg.push(JSON.stringify(this.record.path[i]));
				}
				this.handleModalContent('Cálculo de sendero...', newMsg);
				break;
			case 'personalKey':
				newMsg.push(`${this.person.birthdate[2]} -> ${this.person.personal_key}`);
				this.handleModalContent('Detalle de clave personal...', newMsg);
				break;
			case 'potentialNumber':
				newMsg.push(`${this.person.mission} + ${this.person.natal_path} = ${this.person.potential_number}`);
				this.handleModalContent('Detalle del número potencial...', newMsg);
				break;
			case 'karmas':
				newMsg.push(`Esencia: ${this.person.karmas.essence}`);
				newMsg.push(`Misión: ${this.person.karmas.mission}`);
				newMsg.push(`Sendero: ${this.person.karmas.path}`);
				newMsg.push('---');
				newMsg.push(`Números faltantes: ${this.person.possible_karmas}`);
				this.handleModalContent('Detalle de karmas...', newMsg);
				break;
			case 'stages':
				for (let stage of this.person.stages) {
					newMsg.push(`${stage.num}° | ${stage.from} -> ${stage.to === 0 ? '∞' : stage.to} = ${stage.value}`);
				}
				this.handleModalContent('Detalle de etapas...', newMsg);
				break;
			case 'personalYear':
				newMsg.push(
					`${this.person.birthdate[2]} + ${this.person.birthdate[1]} + ${new Date().getFullYear()} = ${this
						.person.personal_year}`
				);
				this.handleModalContent('Detalle del año personal...', newMsg);
				break;
			case 'personalMonth':
				newMsg.push(
					`${this.person.personal_year} + ${new Date().getMonth() + 1} = ${this.person.personal_month}`
				);
				newMsg.push('(año personal + mes actual)');
				this.handleModalContent('Detalle del mes personal...', newMsg);
				break;
			case 'ageDigit':
				newMsg.push(`${this.person.age} + ${this.person.age + 1} = ${this.person.age_digit}`);
				newMsg.push('(edad actual + edad próxima)');
				this.handleModalContent('Detalle de digito de edad...', newMsg);
				break;
			default:
				break;
		}
		this.showModal(true);
	};

	private switchOutput = (): void => {
		let prevState = this.state.showReport;
		this.setState({ showReport: !prevState });
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

	private saveResult = (): void => {
		StorageHandler.saveResult(this.nameParam, this.birthParam);
		this.setState({ isSaveActive: false });
	};

	private goBack = (): void => {
		const prevPath: string = this.props.location.state ? this.props.location.state as string : RoutePath.CInput;
		this.props.history.push({
			pathname: prevPath,
			search: URLHandler.generateURLwithParams(this.nameParam, this.birthParam)
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
						showModal={this.state.modal.showModal}
					/>
					{/* INTRO */}
					<Header title="RESULTADOS" />
					{/* CALCULATOR OUTPUT */}
					<div className="calculator-output">
						<div className="output-option">
							<button onClick={this.goBack}>
								<svg
									id="icon_back"
									version="1.1"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 512 512"
								>
									<path d="M500,234.6v38.8c0,10.7-3.6,19.8-10.7,27.4c-7.1,7.6-16.4,11.4-27.8,11.4h-232l96.5,89.1c8.3,7.3,12.5,16.4,12.5,27.3c0,10.9-4.2,20-12.5,27.3l-24.7,23c-8.1,7.5-18,11.2-29.7,11.2c-11.4,0-21.4-3.7-30-11.2L27.2,281.3C19.1,273.8,15,264.7,15,254c0-10.5,4.1-19.7,12.2-27.6L241.7,29.5C250,21.8,260,18,271.7,18c11.4,0,21.3,3.8,29.7,11.5L326,51.9c8.3,7.7,12.5,16.9,12.5,27.6c0,10.7-4.2,19.9-12.5,27.6l-96.5,88.8h232c11.4,0,20.7,3.8,27.8,11.4C496.4,214.8,500,223.9,500,234.6z" />
								</svg>
							</button>
							<button className="btn-action" onClick={this.switchOutput}>
								{this.state.showReport ? 'Cálculo' : 'Reporte'}
							</button>
							{this.state.isSaveActive ? (
								<button onClick={this.saveResult}>
									<svg
										id="icon_save"
										version="1.1"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 512 512"
									>
										<path d="M294.6,134h36.4c1.1,0,2-4.1,2-9.2V49.7h-40.3v75.1C292.6,129.9,293.5,134,294.6,134z" />
										<path d="M375,49.7l-22.1,0c0,0,0.5,84.3,0.5,84.3c0,12-8.7,16.3-20.7,16.3H157.3c-12,0-21.8-9.8-21.8-21.8V49.7H81.7C61.4,49.7,45,66.2,45,86.4V413c0,20.3,16.4,36.7,36.7,36.7h339.6c13.1,0,23.7-10.6,23.7-23.7V126C445,120.3,379,53.7,375,49.7zM382.8,377.4c0,11.1,0,35.5-19.2,39.3H130.9c-23.7,0-23.7-18.5-23.7-30.3V253.9c0-11.8,9.6-21.4,21.4-21.4h232.7c11.8,0,21.4,9.6,21.4,22.2V377.4z" />
										<path d="M153.1,306h192.1c5.7,0,10.4-0.9,10.4-1.9v-15.6h-213V304C142.7,305.1,147.3,306,153.1,306z" />
										<path d="M153.1,367.4h192.1c5.7,0,10.4-0.9,10.4-1.9v-15.6h-213v15.6C142.7,366.5,147.3,367.4,153.1,367.4z" />
									</svg>
								</button>
							) : (
								<span id="icon_output_saved" title="Resultado guardado">
									🟢
								</span>
							)}
						</div>
						<div className="input-person">
							<p id="input-person-name">{this.getFullnameText()}</p>
							<p id="input-person-date">{this.getBirthdateText()}</p>
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
