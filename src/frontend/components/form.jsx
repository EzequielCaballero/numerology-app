import React from "react";
//BOOTSTRAP
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const InputForm = props => {
  const {
    valueName,
    valueSubname,
    valueLastname,
    valueBirth,
    handleUserInput,
    handleCleanInputs,
    handleSubmit
  } = props;
  return (
    <Form autoComplete="false" onSubmit={event => handleSubmit(event)}>
      <Form.Group id="form_name">
        <Form.Label>Nombre completo</Form.Label>
        <Form.Row>
          <Col>
            <Form.Control
              name="firstName"
              type="text"
              placeholder="*Nombre..."
              onChange={event => handleUserInput(event)}
              value={valueName}
            />
          </Col>
          <Col>
            <Form.Control
              name="secondName"
              type="text"
              placeholder="Segundo nombre..."
              onChange={event => handleUserInput(event)}
              value={valueSubname}
            />
          </Col>
          <Col>
            <Form.Control
              name="lastName"
              type="text"
              placeholder="*Apellido..."
              onChange={event => handleUserInput(event)}
              value={valueLastname}
            />
          </Col>
        </Form.Row>
      </Form.Group>
      <Form.Group className="form_date">
        <Form.Label>Fecha de nacimiento</Form.Label>
        <Form.Control
          name="birthDate"
          type="date"
          placeholder="Seleccione fecha..."
          onChange={event => handleUserInput(event)}
          value={valueBirth}
        />
      </Form.Group>
      <div className="form-actions">
        <Button
          id="form_clean"
          variant="secondary"
          onClick={() => handleCleanInputs()}
        >
          Limpiar
        </Button>
        <Button id="form_submit" variant="primary">
          Calcular
        </Button>
      </div>
    </Form>
  );
};

export default InputForm;
