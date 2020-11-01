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
							<div className="home-content">
								<div className="home-description">
									<div className="home-header">
										<h2>{translate.t('home.headline.subtitle')}</h2>
										<i>{translate.t('cross.head.title_short')}</i>
									</div>
									<div className="home-intro">
										<p>
											<span>{translate.t('cross.head.description.0')}</span>
											<br />
											<span>{translate.t('cross.head.description.1')}</span>
										</p>
										<button
											aria-label={translate.t('home.btn')}
											className="btn-circle"
											onClick={() => this.goToCalculator()}
										>
											<SVGSelector name="logoMandala" />
										</button>
									</div>
									<p className="home-quote">
										<span>{translate.t('home.quote.phrase')}</span>
										<br />
										<span>- {translate.t('home.quote.author')}</span>
									</p>
								</div>
							</div>
						</div>
					)}
				</ConsumerSetup>
			</div>
		);
	}
}
