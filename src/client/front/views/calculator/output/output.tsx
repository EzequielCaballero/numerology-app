import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { RoutePath } from '../../../../back/sitemap/routes';
import { Person } from '../../../../back/entity/person';
import { TName, TBirth } from '../../../../back/entity/iperson';
import { Calculator, TRecord } from '../../../../back/services/core/calculator';
import { Validator } from '../../../../back/services/core/validator';
import { Convertor } from '../../../../back/services/core/convertor';
import { URLParams } from '../../../../back/services/handler/urlparams';
import { BrowserConfig } from '../../../../back/services/handler/browserconfig';
import { LocalStorage } from '../../../../back/services/handler/localstorage';
import { API_CONFIG } from '../../../../back/api/config';
import { THeader, TBody, RequestType } from '../../../../back/api/request';
import { ConsumerSetup } from '../../../context/setup';
import { THead, Head } from '../../../components/cross/head/head';
import { Headline } from '../../../components/headline/headline';
import { ModalDialog, TModal } from '../../../components/modal/modal';
import { CalculatorOutputPanel } from './panel/panel';
import { CalculatorOutputRecord } from './record/record';
import { CalculatorOutputReport } from './report/report';
import { TShare, CalculatorOutputShare } from './share/share';
import './output.css';

const PAGE_HEAD:THead  = { page: "coutput" }

type TState = {
	isInputOk: boolean;
	isSaveActive: boolean;
	showReport: boolean;
	modal: TModal;
	share: TShare;
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
			showReport: true,
			modal: {
				type: '',
				isActive: false,
				isActionRequired: false
			},
			share:{
				urlShare: URLParams.getCurrentURL(),
				emailInput: '',
				isEmailValid: false,
				isEmailSent: false,
				isLoading: false,
				handleInputEmail: this.handleInputEmail,
				shareResult: this.shareResult
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

	private showModal = (type: string, isActive: boolean, isActionRequired: boolean): void => {
		let modal: TModal = this.state.modal;
		modal.type = type;
		modal.isActive = isActive;
		modal.isActionRequired = isActionRequired;
		this.setState({ modal });
	};

	private handleModalResponse = (response: boolean): void => {
		let modal: TModal = this.state.modal;
		modal.isActive = false;
		this.setState({ modal });
		if (response && this.state.modal.type === 'save') {
			this.saveResult();
		}
	};

	private handleSaveResult = (): void => {
		if (LocalStorage.isResultSavingAllowed()) this.showModal('save', true, true);
		else this.showModal('save-error', true, false);
	};

	private saveResult = (): void => {
		try {
			LocalStorage.saveResult(this.nameParam, this.birthParam);
			this.setState({ isSaveActive: false });
		} catch (error) {
			console.error(`Error saving result in localstorage. Detail: ${error}`);
		}
	};

	private handleShareResult = (): void => {
		this.showModal("share", true, false);
	};

	private handleInputEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		const { value } = e.target;
		let share : TShare = this.state.share;
		share.emailInput = value;
        share.isEmailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) ? true : false;
		this.setState({ share });
	}

	private shareResult = (e: React.FormEvent<HTMLFormElement>):void =>{
		e.preventDefault();
		e.stopPropagation();
		let share : TShare = this.state.share;
		share.isEmailSent = true;
		this.setState({ share });
		if(share.isEmailValid){
			share.isLoading = true;
			this.setState({ share });
			this.sendEmail()
				.then((info) => {
					share.isLoading = false;
					this.setState({ share });
					this.showModal('share-sucess', true, false);
					console.log(info);
				})
				.catch((error) => {
					share.isLoading = false;
					this.setState({ share });
					this.showModal('share-error', true, false);
					console.error(error);
				});
		}
	}

	private sendEmail = () => {
		return new Promise((resolve, reject) => { 
			const header:THeader ={
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'Origin-Type': RequestType.Result,
				'Token': API_CONFIG.token as string 
			}
			const body:TBody = {
				lang: LocalStorage.getLang() as string || BrowserConfig.getLang(),
				from: API_CONFIG.mail as string,
				to: this.state.share.emailInput,
				subject: `DESTINO NUMERICO - ${Convertor.formatNameToString(this.person.name)}`,
				username: Convertor.formatNameToString(this.person.name),
				message:{
					text: '',
					birth: Convertor.formatDateToString(this.person.birth),
        			url: this.state.share.urlShare
				}
			}
			const request = {
				method: 'POST',
				headers: header,
				body: JSON.stringify(body)
			}
	
			fetch(`${API_CONFIG.path}/api/send/email`, request)
				.then((res) => res.json())
				.then((res) => {
					if (res.status === 200) {
						console.log(res.message);
					} else {
						console.error(JSON.stringify(res));
					}
					//LOG REGISTRATION
					fetch(`${API_CONFIG.path}/api/send/log`, request)
						.then((res) => res.json())
						.then((res)=>{
							if (res.status === 200) {
								resolve(res.message);
							} else {
								reject(JSON.stringify(res));
							}
						})
						.catch((error) => {
							reject(`Error sending log: ${error}`);
						});
				})
				.catch((error) => {
					reject(`Error sending email: ${error}`);
				});
		});
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

	private goToContact = (): void => {
		this.props.history.push({
			pathname: RoutePath.Contact,
			search: ''
		});
	};

	public render(): React.ReactNode {
		return (
			<div className="box">
				<ConsumerSetup>
					{({ translate }) => (
						<div className="box-content">
							<Head {...PAGE_HEAD} />
							{/* MODAL */}
							<ModalDialog properties={this.state.modal} callBack={this.handleModalResponse}>
								{this.state.modal.type !== '' && 
									<React.Fragment>
										<p>{translate.t(`coutput.modal.${this.state.modal.type}.title`)}</p>
										{ this.state.modal.type !== 'share' ? 
											<p>
											{translate.t(`coutput.modal.${this.state.modal.type}.msg`, {
													limit: LocalStorage.getMaxNumberSaves() })}
											</p>
											:
											<CalculatorOutputShare {...this.state.share}/>
										}
									</React.Fragment>
								}
							</ModalDialog>
							<div className="calculator-output">
								{/* HEADLINE */}
								<Headline
									title={translate.t('cross.headline.title')}
									subtitle={translate.t('coutput.headline.subtitle')}
								/>
								{/* CALCULATOR OUTPUT */}

								<CalculatorOutputPanel
									name={this.nameParam}
									birth={this.birthParam}
									showReport={this.state.showReport}
									isSaveActive={this.state.isSaveActive}
									switchOutput={this.switchOutput}
									handleSaveResult={this.handleSaveResult}
									handleShareResult={this.handleShareResult}
									goToCalculatorInput={this.goToCalculatorInput}
									goToHistory={this.goToHistory}
								/>
								{this.state.isInputOk && 
									this.state.showReport ? (
										<CalculatorOutputReport person={this.person} redirect={this.goToContact} />
									) : (
										<CalculatorOutputRecord person={this.person} record={this.record} />
									)
								}
							</div>
						</div>
					)}
				</ConsumerSetup>
			</div>
		);
	}
}

export default CalculatorOutput;
