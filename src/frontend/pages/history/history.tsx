import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { RoutePath } from '../../../backend/sitemap/routes';
import Convertor from '../../../backend/services/convertor';
import URLHandler from '../../../backend/services/urlhandler';
import StorageHandler, { TResult } from '../../../backend/services/storagehandler';
import Header from '../../components/header/header';
import './history.css';

type TState = {
	results: TResult[];
};

class History extends React.Component<RouteComponentProps, TState> {
	constructor(props: RouteComponentProps) {
		super(props);
		this.state = {
			results: StorageHandler.getAllResultsStored() as TResult[]
		};
	}

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
					{/* HEADER */}
					<Header title="HISTORIAL" />
					{/* HISTORY */}
					<div className="history-title">
						{this.state.results.length > 0 ? (
							<i>Listado de resultados previamente guardados</i>
						) : (
							<i>No hay resultados guardados</i>
						)}
					</div>
					{this.state.results.map((result) => (
						<div key={result.id} className="history-item">
							<div className="history-item-person">
								<p className="history-item-fullname">{Convertor.FormatNameToString(result.name)}</p>
								<p className="history-item-birth">{Convertor.FormatDateToString(result.birth)}</p>
							</div>
							<div>
								<span
									title="Ver"
									className="history-item-action"
									role="img"
									aria-label="search"
									onClick={() => this.goToResultView(result)}
								>
									{' '}
									📌{' '}
								</span>
							</div>
							<div>
								<span
									title="Borrar"
									className="history-item-action"
									role="img"
									aria-label="delete"
									onClick={() => this.deleteItemHistory(result.key)}
								>
									🔴
								</span>
							</div>
						</div>
					))}
				</div>
			</div>
		);
	}
}

export default History;
