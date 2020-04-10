import React, { Component } from "react";
//LOGIC
import Person from "../../../backend/entity/Person";
import Calculator from "../../../backend/controllers/Calculator";
//COMPONENTS
import InputForm from "../../components/form/form";
import ModalMessage from "../../components/modal";
import Results from "../../components/results/results";
//ASSERTS
import logo from "../../assets/logo-1.png";
import "./home-style.css";
import "./home-responsive.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: ["Ezequiel", "Andrés"],
      lastName: ["Caballero"],
      birthDay: 14,
      birthMonth: 8,
      birthYear: 1989,
      modal: {
        show: false,
        title: "",
        msg: [],
        style: "home-success",
      },
      showResults: false,
    };
    this.calculator = new Calculator();
    this.person = new Person();
  }

  handleInputName = (e) => {
    try {
      const { name, value } = e.target;
      const input = name.split("-");
      let newState = this.state[input[0]];
      newState[input[1]] = value
        .replace(/\s/g, "")
        .replace(/[^[A-Za-zÀ-ÖØ-öø-ÿ]/g, "");
      this.setState({ [input[0]]: newState });
    } catch (error) {
      console.log(error);
    }
  };

  handleInputDate = (e) => {
    try {
      const { name, value } = e.target;
      this.setState({ [name]: value.trim() });
    } catch (error) {
      console.log(error);
    }
  };

  handleAddName = (field) => {
    if (this.state[field].length < 3) {
      let newState = this.state[field];
      newState.push("");
      this.setState({ [field]: newState });
    }
  };

  handleRemoveName = (field) => {
    if (this.state[field].length > 1) {
      let newState = this.state[field];
      newState.pop();
      this.setState({ [field]: newState });
    }
  };

  handleCleanInputs = () => {
    this.setState({
      firstName: [""],
      lastName: [""],
      birthDay: "",
      birthMonth: "",
      birthYear: "",
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (this.validateForm()) this.calculateValues();
    else {
      let newMsg = [];
      newMsg.push("Por favor revisar los campos mandatorios");
      newMsg.push("Nombre | Apellido | Fecha de nacimiento");
      this.handleModalShow("Información incorrecta", newMsg);
    }
  };

  validateForm = () => {
    if (this.validateNameInput() && this.validateDateInput()) return true;

    return false;
  };

  validateNameInput = () => {
    if (this.state.firstName[0] !== "" && this.state.lastName[0] !== "")
      return true;

    return false;
  };

  validateDateInput = () => {
    if (
      this.state.birthDay !== "" &&
      this.state.birthDay > 0 &&
      this.state.birthDay <= 31 &&
      this.state.birthMonth !== "" &&
      this.state.birthMonth > 0 &&
      this.state.birthMonth <= 12 &&
      this.state.birthYear !== "" &&
      this.state.birthYear > 1900 &&
      this.state.birthYear <= new Date().getFullYear()
    )
      return true;

    return false;
  };

  formatInput_name = () => {
    let fullname = "";
    for (let subname of this.state.firstName) {
      if (subname !== "") fullname += `${subname}|`;
    }
    for (let subname of this.state.lastName) {
      if (subname !== "") fullname += `${subname}|`;
    }
    fullname = fullname.slice(0, -1);
    return fullname;
  };

  formatInput_birth = () => {
    const birth = new Date(
      `${this.state.birthYear}/${this.state.birthMonth}/${this.state.birthDay}`
    );
    return birth;
  };

  calculateValues = () => {
    //NORMALIZE
    this.person.nombre = this.calculator.FormatName(this.formatInput_name());
    this.person.nacimiento = this.calculator.FormatBirth(
      this.formatInput_birth()
    );
    this.person.edad = this.calculator.CalculateAge(this.formatInput_birth());
    //CALCULATE
    this.person.imagen = this.calculator.CalculateImage(this.person.nombre);
    this.person.esencia = this.calculator.CalculateEssence(this.person.nombre);
    this.person.mision = this.calculator.CalculateMission(this.person.nombre);
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
    this.person.karmas = this.calculator.CalculateKarmas();
    this.person.posibles_karmas = this.calculator.CalculatePossibleKarmas();
    this.person.etapas = this.calculator.CalculateStages(
      this.person.nacimiento,
      this.person.sendero_natal
    );
    this.person.ano_personal = this.calculator.CalculatePersonalYear(
      this.person.nacimiento
    );
    this.person.mes_personal = this.calculator.CalculatePersonalMonth(
      this.person.ano_personal
    );
    this.person.digito_edad = this.calculator.CalculateAgeDigit(
      this.person.edad
    );
    //console.info(JSON.stringify(this.person));
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

  showOperations = (type) => {
    let newMsg = [];
    //console.log(JSON.stringify(this.calculator._record));
    switch (type) {
      case "image":
        newMsg.push(JSON.stringify(this.calculator._record.name));
        for (let i = 0; i < this.calculator._record.image.length; i++) {
          newMsg.push(JSON.stringify(this.calculator._record.image[i]));
        }
        this.handleModalShow("Calculo de imagen...", newMsg);
        break;
      case "essence":
        newMsg.push(JSON.stringify(this.calculator._record.name));
        for (let i = 0; i < this.calculator._record.essence.length; i++) {
          newMsg.push(JSON.stringify(this.calculator._record.essence[i]));
        }
        this.handleModalShow("Calculo de esencia...", newMsg);
        break;
      case "mission":
        newMsg.push(JSON.stringify(this.calculator._record.name));
        for (let i = 0; i < this.calculator._record.mission.length; i++) {
          newMsg.push(JSON.stringify(this.calculator._record.mission[i]));
        }
        this.handleModalShow("Calculo de misión...", newMsg);
        break;
      case "path":
        newMsg.push(JSON.stringify(this.calculator._record.birth));
        for (let i = 0; i < this.calculator._record.path.length; i++) {
          newMsg.push(JSON.stringify(this.calculator._record.path[i]));
        }
        this.handleModalShow("Calculo de sendero...", newMsg);
        break;
      case "karmas":
        newMsg.push(`Esencia: ${this.person.karmas.essence}`);
        newMsg.push(`Misión: ${this.person.karmas.mission}`);
        newMsg.push(`Sendero: ${this.person.karmas.path}`);
        newMsg.push("---");
        newMsg.push(`Números faltantes: ${this.person.posibles_karmas}`);
        this.handleModalShow("Detalle de karmas...", newMsg);
        break;
      case "stages":
        for (let stage of this.person.etapas) {
          newMsg.push(
            `Etapa ${stage.num} | Desde: ${stage.from} | Hasta: ${stage.to} | VALOR-> ${stage.value}`
          );
        }
        this.handleModalShow("Detalle de etapas...", newMsg);
        break;
      case "ages":
        newMsg.push(`Edad actual: ${this.person.edad}`);
        newMsg.push(`Edad futura: ${this.person.edad + 1}`);
        newMsg.push(`Resultado: ${this.person.digito_edad}`);
        this.handleModalShow("Detalle de digito de edad...", newMsg);
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
          <div className="home-title">Numerología pitagórica</div>
          <p className="home-subtitle">CALCULADORA</p>
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
          <div className="home-form">
            <InputForm
              valueFirstName={this.state.firstName}
              valueLastName={this.state.lastName}
              valueBirthDay={this.state.birthDay}
              valueBirthMonth={this.state.birthMonth}
              valueBirthYear={this.state.birthYear}
              handleInputName={this.handleInputName}
              handleInputDate={this.handleInputDate}
              handleAddName={this.handleAddName}
              handleRemoveName={this.handleRemoveName}
              handleCleanInputs={this.handleCleanInputs}
              handleSubmit={this.handleSubmit}
            />
          </div>
        ) : (
          <div className="home-results">
            <Results
              person={this.person}
              showOperations={this.showOperations}
              hideResults={this.hideResults}
            />
          </div>
        )}
      </div>
    );
  }
}

export default Home;
