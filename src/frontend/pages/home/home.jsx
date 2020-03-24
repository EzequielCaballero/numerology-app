import React, { Component } from "react";
//LOGIC
import Person from "../../../backend/entity/Person";
import Calculator from "../../../backend/controllers/Calculator";
//COMPONENTS
import InputForm from "../../components/inputForm";
import ModalMessage from "../../components/modal";
//ASSERTS
import logo from "../../assets/logo-1.png";
import "./home.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      secondName: "",
      lastName: "",
      birthDate: "",
      modal: {
        show: false,
        type: "success",
        title: "",
        msg: ""
      }
    };
    // this.calculator = new Calculator();
    // this.person = new Person();
  }

  handleUserInput = e => {
    try {
      const { name, value } = e.target;
      this.setState({ [name]: value });
    } catch (error) {
      console.log(error);
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    e.stopPropagation();
    this.validateForm();
  };

  validateForm = () => {
    if (
      this.state.firstName !== "" &&
      this.state.lastName !== "" &&
      this.state.birthDate !== ""
    )
      this.calculateValues();
    else this.handleModalShow("Error!", "Faltan datos por completar");
  };

  calculateValues = () => {
    //INPUT
    const fullname =
      this.state.secondName !== ""
        ? `${this.state.firstName}|${this.state.secondName}|${this.state.lastName}`
        : `${this.state.firstName}|${this.state.lastName}`;
    const birthParts = this.state.birthDate.split("-");
    console.log(birthParts);
    const birth = new Date(
      `${birthParts[1]}/${birthParts[2]}/${birthParts[0]}`
    );
    //CALCULATE
    // this.person.nombre = this.calculator.FormatName(fullname);
    // this.person.birth = this.calculator.FormatBirth(birth);
    this.handleModalShow("Resultado", "Datos...");
  };

  handleModalClose = () => this.setState({ modal: { show: false } });
  handleModalShow = (title, msg) =>
    this.setState({ modal: { show: true, title, msg } });

  render() {
    return (
      <div className="home-content">
        {/* INTRO */}
        <img src={logo} className="home-logo" alt="logo" />
        <div className="home-intro">
          <span>¡Bienvenido!</span>
          <p>Calculadora de numerología pitagórica</p>
        </div>

        {/* FORM */}
        <InputForm
          handleUserInput={this.handleUserInput}
          handleSubmit={this.handleSubmit}
        />

        {/* MODAL */}
        <ModalMessage
          modalTitle={this.state.modal.title}
          modalText={this.state.modal.msg}
          modalType={this.state.modal.type}
          showModal={this.state.modal.show}
          handleClose={this.handleModalClose}
        />
      </div>
    );
  }
}

export default Home;
