import React, { Component } from "react";
//LOGIC
import Person from "../../../backend/entity/Person";
import Calculator from "../../../backend/controllers/Calculator";
//COMPONENTS
import InputForm from "../../components/form";
import ModalMessage from "../../components/modal";
import Results from "../../components/results/results";
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
        title: "",
        msg: [],
        style: "home-success"
      },
      showResults: false
    };
    this.calculator = new Calculator();
    this.person = new Person();
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
    ) {
      this.calculateValues();
    } else {
      let newMsg = [];
      newMsg.push("Faltan valores mandatorios");
      newMsg.push("Nombre | Apellido | Fecha de nacimiento");
      this.handleModalShow("Error!", newMsg);
    }
  };

  formatInput_name = () => {
    const fullname =
      this.state.secondName !== ""
        ? `${this.state.firstName}|${this.state.secondName}|${this.state.lastName}`
        : `${this.state.firstName}|${this.state.lastName}`;
    return fullname;
  };

  formatInput_birth = () => {
    const birthParts = this.state.birthDate.split("-");
    const birth = new Date(
      `${birthParts[1]}/${birthParts[2]}/${birthParts[0]}`
    );
    return birth;
  };

  calculateValues = () => {
    //CALCULATE
    this.person.nombre = this.calculator.FormatName(this.formatInput_name());
    this.person.nacimiento = this.calculator.FormatBirth(
      this.formatInput_birth()
    );
    this.person.esencia = this.calculator.CalculateEssence(this.person.nombre);
    this.person.imagen = this.calculator.CalculateImage(this.person.nombre);
    this.person.mision = this.calculator.CalculateMission(
      this.person.esencia,
      this.person.imagen
    );
    this.person.sendero_natal = this.calculator.CalculatePath(
      this.person.nacimiento
    );
    this.person.clave_personal = this.calculator.CalculatePersonalKey(
      this.person.nacimiento
    );
    this.person.numero_potencial = this.calculator.CalculatePotential(
      this.person.mision,
      this.person.sendero_natal
    );
    console.info(JSON.stringify(this.person));
    this.showResults();
  };

  hideResults = () => {
    this.calculator = new Calculator();
    this.person = new Person();
    this.setState({ showResults: false });
  };

  showResults = () => {
    this.operations = this.calculator._record;
    this.setState({ showResults: true });
  };

  showOperations = type => {
    let newMsg = [];
    //console.log(JSON.stringify(this.calculator._record));
    switch (type) {
      case "essence":
        newMsg.push(JSON.stringify(this.calculator._record.name));
        for (let i = 0; i < this.calculator._record.essence.length; i++) {
          newMsg.push(JSON.stringify(this.calculator._record.essence[i]));
        }
        this.handleModalShow("Calculo de esencia...", newMsg);
        break;
      case "image":
        newMsg.push(JSON.stringify(this.calculator._record.name));
        for (let i = 0; i < this.calculator._record.image.length; i++) {
          newMsg.push(JSON.stringify(this.calculator._record.image[i]));
        }
        this.handleModalShow("Calculo de imagen...", newMsg);
        break;
      case "path":
        newMsg.push(JSON.stringify(this.calculator._record.birth));
        for (let i = 0; i < this.calculator._record.path.length; i++) {
          newMsg.push(JSON.stringify(this.calculator._record.path[i]));
        }
        this.handleModalShow("Calculo de sendero...", newMsg);
        break;
      default:
        break;
    }
  };

  handleModalClose = () => {
    let modalProperties = this.state.modal;
    modalProperties.msg = [];
    modalProperties.show = false;
    this.setState({ modal: modalProperties });
  };
  handleModalShow = (title, msg) => {
    let modalProperties = this.state.modal;
    modalProperties.show = true;
    modalProperties.title = title;
    modalProperties.msg = msg;
    this.setState({ modal: modalProperties });
  };

  render() {
    return (
      <div className="home-content">
        {/* INTRO */}
        <div className="home-intro">
          <img src={logo} className="home-logo" alt="logo" />
          <div className="home-title">CALCULADORA</div>
          <p className="home-subtitle">Numerología pitagórica</p>
        </div>
        {/* MODAL */}
        <ModalMessage
          title={this.state.modal.title}
          msg={this.state.modal.msg}
          show={this.state.modal.show}
          close={this.handleModalClose}
          style={this.state.modal.style}
        />

        {!this.state.showResults ? (
          <InputForm
            valueName={this.state.firstName}
            valueSubname={this.state.secondName}
            valueLastname={this.state.lastName}
            valueBirth={this.state.birthDate}
            handleUserInput={this.handleUserInput}
            handleSubmit={this.handleSubmit}
          />
        ) : (
          <Results
            person={this.person}
            showOperations={this.showOperations}
            hideResults={this.hideResults}
          />
        )}
      </div>
    );
  }
}

export default Home;
