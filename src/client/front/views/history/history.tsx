import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { RoutePath } from '../../../back/sitemap/routes';
import { Convertor } from '../../../back/services/core/convertor';
import { URLParams } from '../../../back/services/handler/urlparams';
import { LocalStorage, TResult } from '../../../back/services/handler/localstorage';
import { ConsumerSetup } from '../../context/setup';
import { THead, Head } from '../../components/cross/head/head';
import { Headline } from '../../components/headline/headline';
import { ModalDialog, TModal } from '../../components/modal/modal';
import { SVGSelector } from '../../components/svg/selector';
import './history.css';

const PAGE_HEAD:THead  = { page: "history" }

type TState = {
	results: TResult[];
	modal: TModal;
};

export class History extends React.Component<RouteComponentProps, TState> {
	constructor(props: RouteComponentProps) {
		super(props);
		this.state = {
			results: LocalStorage.getAllResultsStored() as TResult[],
			modal: {
				type: '',
				isActive: false,
				isActionRequired: false
			}
		};
	}

	public componentDidMount() {
		LocalStorage.deleteInvalidResults();
	}

	private showModal = (type: string, isActive: boolean, isActionRequired: boolean, actionKey: string): void => {
		let modal: TModal = this.state.modal;
		modal.type = type;
		modal.isActive = isActive;
		modal.isActionRequired = isActionRequired;
		modal.actionKey = actionKey;
		this.setState({ modal });
	};

	private handleModalResponse = (response: boolean, actionKey?: string): void => {
		let modal: TModal = this.state.modal;
		modal.isActive = false;
		this.setState({ modal });
		if (response) {
			this.deleteItemHistory(actionKey as string);
		}
	};

	private handleDeleteItemHistory = (key: string): void => {
		this.showModal('delete', true, true, key);
	};

	private deleteItemHistory = (key: string): void => {
		LocalStorage.deleteResult(key);
		this.setState({ results: LocalStorage.getAllResultsStored() as TResult[] });
	};

	private goToResultView = (result: TResult): void => {
		this.props.history.push({
			state: RoutePath.History,
			pathname: RoutePath.COutput,
			search: URLParams.generateURLwithParams(result.name, result.birth)
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
								<React.Fragment>
									<p>{translate.t('history.modal.delete.title')}</p>
									<p>{translate.t('history.modal.delete.msg')}</p>
								</React.Fragment>
							</ModalDialog>
							<div className="history-content">
								{/* HEADLINE */}
								<Headline
									title={translate.t('cross.headline.title')}
									subtitle={translate.t('history.headline.subtitle')}
								/>
								{/* HISTORY */}
								<h5>{translate.t('history.list.title')}</h5>
								{this.state.results.length === 0 && (
									<div>
										<SVGSelector name="iconSave" />
										<br />
										<i>{translate.t('history.list.empty')}</i>
									</div>
								)}
								{this.state.results.map((result) => (
									<div key={result.key} className="history-item">
										<div className="history-item-person">
											<p className="history-item-fullname">
												{Convertor.formatNameToString(result.name)}
											</p>
											<p className="history-item-birth">
												{Convertor.formatDateToString(result.birth)}
											</p>
										</div>
										<div>
											<button
												aria-label={translate.t('history.action.view')}
												title={translate.t('history.action.view')}
												className="history-item-action"
												onClick={() => this.goToResultView(result)}
											>
												<SVGSelector name="iconView" />
											</button>
										</div>
										<div>
											<button
												aria-label={translate.t('history.action.delete')}
												title={translate.t('history.action.delete')}
												className="history-item-action"
												onClick={() => this.handleDeleteItemHistory(result.key)}
											>
												<SVGSelector name="iconDelete" />
											</button>
										</div>
									</div>
								))}
							</div>
						</div>
					)}
				</ConsumerSetup>
			</div>
		);
	}
}
