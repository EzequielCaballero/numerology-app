import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { RoutePath } from '../../../back/sitemap/routes';
import { API_CONFIG } from '../../../back/api/config';
import { THeader, TBody, RequestType } from '../../../back/api/request';
import { ConsumerSetup } from '../../context/setup';
import { Headline } from '../../components/headline/headline';
import { ModalDialog, TModal } from '../../components/modal/modal';
import { TContact, TForm, ContactForm } from './form/form';
import { SVGSelector } from '../../components/svg/selector';
import './contact.css';

type TState = {
	contact: TContact;
	form: TForm;
	modal: TModal;
}

export class Contact extends React.Component<RouteComponentProps, TState> {
	constructor(props: RouteComponentProps){
		super(props);
		this.state = {
			contact:{
				name: "",
				email: "",
				message: ""
			},
			form:{
				valid: [false, false, false],
				submitted: false,
				sent: false,
				received: false
			},
			modal: {
				type: 'success',
				isActive: false,
				isActionRequired: false
			}
		}
	}

	private handleInput = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>): void => {
		e.preventDefault();
		const { name, value } = e.target;
		let input: TContact = this.state.contact;
		input[name as keyof TContact] = value.replace(/\r?\n|\r/,"");
		this.setState({ contact: input }, () => this.validateForm());
		
	};

	private validateForm = (): void => {
		let formState = this.state.form;
		formState.valid[0] = this.state.contact.name.trim().length > 0;
		formState.valid[1] = this.state.contact.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) ? true : false;
		formState.valid[2] = this.state.contact.message.trim().length > 0;
		this.setState({ form: formState });
	};

	private handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
		e.preventDefault();
		e.stopPropagation();
		let formState = this.state.form;
		formState.submitted = true;
		this.setState({ form: formState });

		if(this.state.form.valid[0] && this.state.form.valid[1] && this.state.form.valid[2]){
			formState.sent = true;
			this.setState({ form: formState });
			this.sendEmail()
				.then((info) => {
					formState.received = true;
					this.setState({ form: formState });
					this.showModal('success', true, false);
					console.log(info);
				})
				.catch((error) => {
					formState.received = true;
					this.setState({ form: formState });
					this.showModal('error', true, false);
					console.error(error);
				});
		}
	};

	private sendEmail = () => {
		return new Promise((resolve, reject) => { 
			const header:THeader ={
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'Origin-Type': RequestType.Contact,
				'Token': API_CONFIG.token as string 
			}
			const body:TBody = {
				lang: 'es',
				from: this.state.contact.email,
				to: API_CONFIG.mail as string,
				subject: `CONTACTO de ${this.state.contact.email}`,
				username: this.state.contact.name,
				message:{
					text: this.state.contact.message
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
		this.goToHome();
	};

	private goToHome = (): void => {
		this.props.history.push({
			pathname: RoutePath.Home,
			search: ''
		});
	};

	public render(): React.ReactNode {
		return (
			<div className="box">
				<ConsumerSetup>
					{({ translate }) => (
						<div className="box-content">
							<div className="contact-content">
								{/* MODAL */}
								<ModalDialog properties={this.state.modal} callBack={this.handleModalResponse}>
									<React.Fragment>
										<p>{translate.t(`contact.modal.${this.state.modal.type}.title`)}</p>
										<p>{translate.t(`contact.modal.${this.state.modal.type}.msg`)}</p>
									</React.Fragment>
								</ModalDialog>
								{/* HEADLINE */}
								<Headline
									title={translate.t('cross.head.title_short')}
									subtitle={translate.t('contact.headline.subtitle')}
								/>
								{/* CONTENT */}
								<p className="contact-greetings">
									<span>{`${translate.t('contact.intro.0')} 👋`}</span><br/>
									<span>{translate.t('contact.intro.1')}</span>
								</p>
								<p className="contact-msg">
									{translate.t('contact.msg.0')}
								</p>
								<ContactForm 
									contact = {this.state.contact}
									form = {this.state.form}
									handleInput = {this.handleInput}
									handleSubmit = {this.handleSubmit}
								/>
								<p className="contact-msg">
									<i>{translate.t('contact.msg.1')}</i>
								</p>
								<p className="contact-email">
									<a href={`mailto:${translate.t('contact.email')}`}>
										<SVGSelector name="iconEmail" />{' '}
										<strong>{API_CONFIG.mail}</strong>
									</a>
								</p>
							</div>
						</div>
					)}
				</ConsumerSetup>
			</div>
		);
	}
}
