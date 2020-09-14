import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { RoutePath } from '../../../back/sitemap/routes';
import { ConsumerSetup } from '../../context/setup';
import { SVGSelector } from '../../components/svg/selector';
import './home.css';

export class Home extends React.Component<RouteComponentProps> {
	private goToCalculator = () => {
		this.props.history.push(RoutePath.CInput);
	};

	public render(): React.ReactNode {
		return (
			<div className="box">
				<ConsumerSetup>
					{({ translate }) => (
						<div className="box-content">
							<div className="home-header">
								<p>{`${translate.t('home.title')} 👋`}</p>
								<p>{translate.t('home.subtitle')}</p>
							</div>
							<div className="home-content">
								<div className="home-quote">
									<p>
										<span>{translate.t('home.quote.phrase')}</span>
										<br />
										<span>- {translate.t('home.quote.author')}</span>
									</p>
								</div>
								<button
									aria-label={translate.t('home.btn')}
									className="btn-circle"
									onClick={() => this.goToCalculator()}
								>
									<SVGSelector name="logoMandala" />
								</button>
							</div>
						</div>
					)}
				</ConsumerSetup>
			</div>
		);
	}
}
