import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { RoutePath } from '../../../backend/sitemap/routes';
import Convertor from '../../../backend/services/convertor';
import URLHandler from '../../../backend/services/urlhandler';
import StorageHandler, { TResult } from '../../../backend/services/storagehandler';
import Headline from '../../components/headline/headline';
import ModalMessage, { TModal } from '../../components/modal/modal';
import SVGSelector from '../../components/svg/selector';
import './history.css';

type TState = {
	results: TResult[];
	modal: TModal;
};

class History extends React.Component<RouteComponentProps, TState> {
	constructor(props: RouteComponentProps) {
		super(props);
		this.state = {
			results: StorageHandler.getAllResultsStored() as TResult[],
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
	}

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

	private handleModalResponse = (response: boolean, identifier?: string): void => {
		this.showModal(false);
		if (response) {
			this.deleteItemHistory(identifier as string);
		}
	};

	private handleDeleteItemHistory = (key: string): void => {
		let newMsg: string[] = [ '' ];
		newMsg.push('El resultado seleccionado será eliminado de tu navegador.');
		this.setModalContent('Eliminar resultado', newMsg);
		this.setModalProperties(true, key);
		this.showModal(true);
	};

	private deleteItemHistory = (key: string): void => {
		StorageHandler.deleteResult(key);
		this.setState({ results: StorageHandler.getAllResultsStored() as TResult[] });
	};

	private goToResultView = (result: TResult): void => {
		this.props.history.push({
			state: RoutePath.History,
			pathname: RoutePath.COutput,
			search: URLHandler.generateURLwithParams(result.name, result.birth)
		});
	};

	public render(): React.ReactNode {
		return (
			<div className="box">
				<div className="box-content">
					{/* MODAL */}
					<ModalMessage
						text={this.state.modal.text}
						properties={this.state.modal.properties}
						action={this.state.modal.action}
					/>
					{/* HEADLINE */}
					<Headline title="HISTORIAL" />
					{/* HISTORY */}
					<div className="history">
						<div className="history-title">
							{this.state.results.length > 0 ? (
								<i>Listado de resultados guardados</i>
							) : (
								<i>No hay resultados guardados</i>
							)}
						</div>
						{this.state.results.map((result) => (
							<div key={result.key} className="history-item">
								<div className="history-item-person">
									<p className="history-item-fullname">{Convertor.FormatNameToString(result.name)}</p>
									<p className="history-item-birth">{Convertor.FormatDateToString(result.birth)}</p>
								</div>
								<div>
									<button
										className="history-item-action"
										aria-label="search"
										onClick={() => this.goToResultView(result)}
									>
										<SVGSelector name="iconView" />
									</button>
								</div>
								<div>
									<button
										className="history-item-action"
										aria-label="delete"
										onClick={() => this.handleDeleteItemHistory(result.key)}
									>
										<SVGSelector name="iconDelete" />
									</button>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		);
	}
}

export default History;
