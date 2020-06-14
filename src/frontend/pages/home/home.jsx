import React, { Component } from 'react';
//ASSERTS
import logo from '../../assets/logo-1.png';
import './home.css';
import './home-responsive.css';

class HomeView extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	goToCalculator = () => {
		this.props.history.push('/calculator');
	};

	render() {
		return (
			<div className="home-box">
				<div className="home-content">
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
					<button className="home-button" onClick={() => this.goToCalculator()}>
						CALCULADORA
					</button>
				</div>
			</div>
		);
	}
}

export default HomeView;
