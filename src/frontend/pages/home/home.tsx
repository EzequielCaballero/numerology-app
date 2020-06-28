import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
//ASSERTS
import logo from '../../assets/logo-1.png';
import './home.css';

class HomeView extends React.Component<RouteComponentProps> {
	goToCalculator = () => {
		this.props.history.push('/calculator');
	};

	render() {
		return (
			<div className="box">
				<div className="box-content">
					<div className="home-header">
						<p>{`👋 ¡Bienvenido! 👋`}</p>
						<p>Numerología pitagórica</p>
					</div>
					<div className="home-quote">
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
							labore et dolore magna aliqua.
						</p>
					</div>
					<div>
						<img src={logo} className="home-logo" alt="logo" />
					</div>
					<button className="btn-action" onClick={() => this.goToCalculator()}>
						CALCULADORA
					</button>
				</div>
			</div>
		);
	}
}

export default HomeView;
