import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { RoutePath } from '../../../back/sitemap/routes';
import { Convertor } from '../../../back/services/core/convertor';
import { URLParams } from '../../../back/services/handler/urlparams';
import { LocalStorage, TResult } from '../../../back/services/handler/localstorage';
import { ConsumerSetup } from '../../context/setup';
import { Headline } from '../../components/headline/headline';
import { ModalDialog, TModal } from '../../components/modal/modal';
import { SVGSelector } from '../../components/svg/selector';
import './history.css';

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
				properties: {
					type: 'delete',
					isActive: false,
					isInteractive: false
				},
				action: this.handleModalResponse
			}
		};
	}

	public componentDidMount() {
		LocalStorage.deleteInvalidResults();
	}

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

	private handleModalResponse = (response: boolean, identifier?: string): void => {
		this.showModal(false);
		if (response) {
			this.deleteItemHistory(identifier as string);
		}
	};

	private handleDeleteItemHistory = (key: string): void => {
		this.setModalProperties(true, key);
		this.showModal(true);
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
							{/* MODAL */}
							<ModalDialog properties={this.state.modal.properties} action={this.state.modal.action}>
								<p>{translate.t('history.modal.delete.title')}</p>
								<p>{translate.t('history.modal.delete.msg')}</p>
							</ModalDialog>
							<div className="history-content">
								{/* HEADLINE */}
								<Headline
									title={translate.t('cross.head.title_short')}
									subtitle={translate.t('history.headline.subtitle')}
								/>
								{/* HISTORY */}

								<div className="history-title">
									{this.state.results.length > 0 ? (
										<i>{translate.t('history.list.with')}</i>
									) : (
										<div>
											<i>{translate.t('history.list.without')}</i>
											<br />
											<SVGSelector name="iconSave" />
										</div>
									)}
								</div>
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
