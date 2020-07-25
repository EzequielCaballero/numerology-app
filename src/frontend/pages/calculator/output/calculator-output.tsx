import React from 'react';
import { RouteComponentProps, Redirect } from 'react-router-dom';
import { RoutePath } from '../../../../backend/sitemap/routes';
import Header from '../../../components/header/header';
import ModalMessage, { TModal } from '../../../components/modal/modal';
import { TRecord } from '../../../../backend/services/calculator';
import Validator, { TName, TBirth } from '../../../../backend/services/validator';
import URLHandler from '../../../../backend/services/urlhandler';
import Person from '../../../../backend/entity/person';
import './calculator-output.css';

type TState = {
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

	public componentDidMount() {}

	private getFullnameText = (): JSX.Element[] => {
		let fullname: string[] = this.nameParam.firstName.concat(this.nameParam.lastName);
		return fullname.map((name: string, index: number) => <span key={index}>{name.toLowerCase()} </span>);
	};

	private getBirthdateText = (): string => {
		const birth: Date = new Date(
			`${this.person.nacimiento[0]}-${this.person.nacimiento[1]}-${this.person.nacimiento[2]}`
		);
		return `${('0' + birth.getDate()).slice(-2)}/${('0' + (birth.getMonth() + 1)).slice(
			-2
		)}/${birth.getFullYear()}`;
	};

	private showDetail = (type: string): void => {
		let newMsg: string[] = [ '' ];
		//console.log(JSON.stringify(record));
		switch (type) {
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
				newMsg.push(`${this.person.nacimiento[2]} -> ${this.person.clave_personal}`);
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
					newMsg.push(`${stage.num}° | ${stage.from} -> ${stage.to === 0 ? '∞' : stage.to} = ${stage.value}`);
				}
				this.handleModalContent('Detalle de etapas...', newMsg);
				break;
			case 'personalYear':
				newMsg.push(
					`${this.person.nacimiento[2]} + ${this.person.nacimiento[1]} + ${new Date().getFullYear()} = ${this
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

	private goToInputView = (): void => {
		this.props.history.push({
			pathname: RoutePath.CInput,
			search: URLHandler.generateURLwithParams(this.nameParam, this.birthParam)
		});
	};

	public render() {
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
					{/* CALCULATOR RESULTS */}
					<div className="calculator-result">
						<div className="result-option">
							<button onClick={this.goToInputView}>
								<svg
									id="back_icon"
									version="1.1"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 512 512"
									width="25"
									height="25"
								>
									<path d="M500,234.6v38.8c0,10.7-3.6,19.8-10.7,27.4c-7.1,7.6-16.4,11.4-27.8,11.4h-232l96.5,89.1c8.3,7.3,12.5,16.4,12.5,27.3c0,10.9-4.2,20-12.5,27.3l-24.7,23c-8.1,7.5-18,11.2-29.7,11.2c-11.4,0-21.4-3.7-30-11.2L27.2,281.3C19.1,273.8,15,264.7,15,254c0-10.5,4.1-19.7,12.2-27.6L241.7,29.5C250,21.8,260,18,271.7,18c11.4,0,21.3,3.8,29.7,11.5L326,51.9c8.3,7.7,12.5,16.9,12.5,27.6c0,10.7-4.2,19.9-12.5,27.6l-96.5,88.8h232c11.4,0,20.7,3.8,27.8,11.4C496.4,214.8,500,223.9,500,234.6z" />
								</svg>
							</button>
							<button className="btn-action">Reporte</button>
						</div>
						<div className="result-person">
							<p id="input-name">{this.getFullnameText()}</p>
							<p id="input-date">{this.getBirthdateText()}</p>
						</div>
						<div className="result-detail">
							<div title="image" className="result-detail-item">
								<span className="r-title">Imagen</span>
								<span className="r-value">{this.person.imagen}</span>
								<span
									className="r-expand"
									role="img"
									aria-label="search"
									onClick={() => this.showDetail('image')}
								>
									🔎
								</span>
							</div>
							<div title="essence" className="result-detail-item">
								<span className="r-title">Esencia</span>
								<span className="r-value">{this.person.esencia}</span>
								<span
									className="r-expand"
									role="img"
									aria-label="search"
									onClick={() => this.showDetail('essence')}
								>
									🔎
								</span>
							</div>
							<div title="mission" className="result-detail-item">
								<span className="r-title">Misión</span>
								<span className="r-value">{this.person.mision}</span>
								<span
									className="r-expand"
									role="img"
									aria-label="search"
									onClick={() => this.showDetail('mission')}
								>
									🔎
								</span>
							</div>
							<div title="path" className="result-detail-item">
								<span className="r-title">Sendero</span>
								<span className="r-value">{this.person.sendero_natal}</span>
								<span
									className="r-expand"
									role="img"
									aria-label="search"
									onClick={() => this.showDetail('path')}
								>
									🔎
								</span>
							</div>
							<div title="personalKey" className="result-detail-item">
								<span className="r-title">Clave</span>
								<span className="r-value">{this.person.clave_personal}</span>
								<span
									className="r-expand"
									role="img"
									aria-label="search"
									onClick={() => this.showDetail('personalKey')}
								>
									🔎
								</span>
							</div>
							<div title="potentialNumber" className="result-detail-item">
								<span className="r-title">Potencial</span>
								<span className="r-value">{this.person.numero_potencial}</span>
								<span
									className="r-expand"
									role="img"
									aria-label="search"
									onClick={() => this.showDetail('potentialNumber')}
								>
									🔎
								</span>
							</div>
							<div title="karmas" className="result-detail-item">
								<span className="r-title">Karmas</span>
								<span className="r-value">***</span>
								<span
									className="r-expand"
									role="img"
									aria-label="search"
									onClick={() => this.showDetail('karmas')}
								>
									🔎
								</span>
							</div>
							<div title="stages" className="result-detail-item">
								<span className="r-title">Etapas</span>
								<span className="r-value">***</span>
								<span
									className="r-expand"
									role="img"
									aria-label="search"
									onClick={() => this.showDetail('stages')}
								>
									🔎
								</span>
							</div>
							<div title="personalYear" className="result-detail-item">
								<span className="r-title">Año personal</span>
								<span className="r-value">{this.person.ano_personal}</span>
								<span
									className="r-expand"
									role="img"
									aria-label="search"
									onClick={() => this.showDetail('personalYear')}
								>
									🔎
								</span>
							</div>
							<div title="personalMonth" className="result-detail-item">
								<span className="r-title">Mes personal</span>
								<span className="r-value">{this.person.mes_personal}</span>
								<span
									className="r-expand"
									role="img"
									aria-label="search"
									onClick={() => this.showDetail('personalMonth')}
								>
									🔎
								</span>
							</div>
							<div title="ageDigit" className="result-detail-item">
								<span className="r-title">Digito de edad</span>
								<span className="r-value">{this.person.digito_edad}</span>
								<span
									className="r-expand"
									role="img"
									aria-label="search"
									onClick={() => this.showDetail('ageDigit')}
								>
									🔎
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default CalculatorOutput;
