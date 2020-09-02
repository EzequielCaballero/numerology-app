import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { RoutePath } from '../../../back/sitemap/routes';
import { SVGSelector } from '../../components/svg/selector';
import './home.css';

export class Home extends React.Component<RouteComponentProps> {
	private goToCalculator = () => {
		this.props.history.push(RoutePath.CInput);
	};

	public render(): React.ReactNode {
		return (
			<div className="box">
				<div className="box-content">
					<div className="home-header">
						<p>{`¡Bienvenido! 👋`}</p>
						<p>Numerología pitagórica</p>
					</div>
					<div className="home-quote">
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
							labore et dolore magna aliqua.
						</p>
					</div>
					<div className="home-content">
						<div>
							<SVGSelector name="logoMandala" />
						</div>
						<button className="btn-action" onClick={() => this.goToCalculator()}>
							Probar
						</button>
					</div>
				</div>
			</div>
		);
	}
}
