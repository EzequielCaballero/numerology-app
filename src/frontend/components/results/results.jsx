import React from "react";
//BOOTSTRAP
import Button from "react-bootstrap/Button";
//ASSERTS
import "./results.css";

const Results = props => {
  const { person, showOperations, hideResults } = props;

  return (
    <div className="results">
      <h3>RESULTADOS</h3>
      <div className="results options">
        <Button variant="light" onClick={hideResults}>
          Volver
        </Button>
        <Button variant="success">Reporte</Button>
        <Button variant="info">Exportar</Button>
      </div>
      <hr />
      <div className="results header">
        <p>
          {person.nombre[0]} {person.nombre[1]} {person.nombre[2]}
        </p>
        <p>
          {person.nacimiento[0]}/{person.nacimiento[1]}/{person.nacimiento[2]}
        </p>
      </div>
      <hr />
      <div className="results details">
        <div
          name="image"
          className="results details-item"
          onClick={() => showOperations("image")}
        >
          <span className="r-title">Imagen</span>
          <span className="r-value"> | {person.imagen}</span>
          <span role="img" aria-label="search">
            🔎
          </span>
        </div>
        <div
          name="essence"
          className="results details-item"
          onClick={() => showOperations("essence")}
        >
          <span className="r-title">Esencia</span>
          <span className="r-value"> | {person.esencia}</span>
          <span role="img" aria-label="search">
            🔎
          </span>
        </div>
        <div name="mission" className="results details-item">
          <span className="r-title">Misión</span>
          <span className="r-value"> | {person.mision}</span>
        </div>
        <div
          name="path"
          className="results details-item"
          onClick={() => showOperations("path")}
        >
          <span className="r-title">Sendero</span>
          <span className="r-value"> | {person.sendero_natal}</span>
          <span role="img" aria-label="search">
            🔎
          </span>
        </div>
        <div name="personalKey" className="results details-item">
          <span className="r-title">Clave</span>
          <span className="r-value"> | {person.clave_personal}</span>
        </div>
        <div nome="potentialNumber" className="results details-item">
          <span className="r-title">Potencial</span>
          <span className="r-value"> | {person.numero_potencial}</span>
        </div>
      </div>
    </div>
  );
};

export default Results;
