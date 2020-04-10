import React from "react";
//BOOTSTRAP
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
//ASSERTS
import "./calculator-results.css";

const CalculatorResults = (props) => {
  const { person, showOperations, hideResults } = props;

  return (
    <div className="results">
      <ButtonGroup className="results options">
        <Button variant="light" onClick={hideResults}>
          Volver
        </Button>
        <Button variant="success">Reporte</Button>
        <Button variant="info">Exportar</Button>
      </ButtonGroup>
      <div className="results header">
        <p id="output-name">
          {person.nombre.map((name, index) => (
            <span key={index}>{name.toLowerCase()} </span>
          ))}
        </p>
        <p id="output-date">
          <span>{person.nacimiento[0]}/</span>
          <span>{person.nacimiento[1]}/</span>
          <span>{person.nacimiento[2]}</span>
        </p>
      </div>
      <div className="results details">
        <div name="image" className="results details-item">
          <span className="r-title">Imagen</span>
          <span className="r-value">{person.imagen}</span>
          <span
            className="r-expand"
            role="img"
            aria-label="search"
            onClick={() => showOperations("image")}
          >
            🔎
          </span>
        </div>
        <div name="essence" className="results details-item">
          <span className="r-title">Esencia</span>
          <span className="r-value">{person.esencia}</span>
          <span
            className="r-expand"
            role="img"
            aria-label="search"
            onClick={() => showOperations("essence")}
          >
            🔎
          </span>
        </div>
        <div name="mission" className="results details-item">
          <span className="r-title">Misión</span>
          <span className="r-value">{person.mision}</span>
          <span
            className="r-expand"
            role="img"
            aria-label="search"
            onClick={() => showOperations("mission")}
          >
            🔎
          </span>
        </div>
        <div name="path" className="results details-item">
          <span className="r-title">Sendero</span>
          <span className="r-value">{person.sendero_natal}</span>
          <span
            className="r-expand"
            role="img"
            aria-label="search"
            onClick={() => showOperations("path")}
          >
            🔎
          </span>
        </div>
        <div name="personalKey" className="results details-item">
          <span className="r-title">Clave</span>
          <span className="r-value">{person.clave_personal}</span>
          <span
            className="r-expand"
            role="img"
            aria-label="search"
            onClick={() => showOperations("personalKey")}
          >
            🔎
          </span>
        </div>
        <div name="potentialNumber" className="results details-item">
          <span className="r-title">Potencial</span>
          <span className="r-value">{person.numero_potencial}</span>
          <span
            className="r-expand"
            role="img"
            aria-label="search"
            onClick={() => showOperations("potentialNumber")}
          >
            🔎
          </span>
        </div>
        <div name="karmas" className="results details-item">
          <span className="r-title">Karmas</span>
          <span className="r-value">***</span>
          <span
            className="r-expand"
            role="img"
            aria-label="search"
            onClick={() => showOperations("karmas")}
          >
            🔎
          </span>
        </div>
        <div name="stages" className="results details-item">
          <span className="r-title">Etapas</span>
          <span className="r-value">***</span>
          <span
            className="r-expand"
            role="img"
            aria-label="search"
            onClick={() => showOperations("stages")}
          >
            🔎
          </span>
        </div>
        <div name="personalYear" className="results details-item">
          <span className="r-title">Año personal</span>
          <span className="r-value">{person.ano_personal}</span>
          <span
            className="r-expand"
            role="img"
            aria-label="search"
            onClick={() => showOperations("personalYear")}
          >
            🔎
          </span>
        </div>
        <div name="personalMonth" className="results details-item">
          <span className="r-title">Mes personal</span>
          <span className="r-value">{person.mes_personal}</span>
          <span
            className="r-expand"
            role="img"
            aria-label="search"
            onClick={() => showOperations("personalMonth")}
          >
            🔎
          </span>
        </div>
        <div name="ageDigit" className="results details-item">
          <span className="r-title">Digito de edad</span>
          <span className="r-value">{person.digito_edad}</span>
          <span
            className="r-expand"
            role="img"
            aria-label="search"
            onClick={() => showOperations("ageDigit")}
          >
            🔎
          </span>
        </div>
      </div>
    </div>
  );
};

export default CalculatorResults;
