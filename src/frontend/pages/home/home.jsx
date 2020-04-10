import React, { Component } from "react";
import { Link } from "react-router-dom";
//ASSERTS
import logo from "../../assets/logo-1.png";
import "./home-style.css";
import "./home-responsive.css";

class HomeView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="home-box">
        <div className="home-content">
          <p>{`👋 ¡Bienvenido! 👋`}</p>
          <p>Numerología pitagórica</p>
          <div>
            <img src={logo} className="home-logo" alt="logo" />
          </div>
          <br />
          <div>
            <Link
              to="/calculator"
              rel="noopener noreferrer"
              aria-label="Direct link to website calculator"
            >
              CALCULADORA
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default HomeView;
