import React from "react";
//BOOTSTRAP
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const InputForm = props => {
  const { handleUserInput, handleSubmit } = props;
  return (
    <Form autoComplete="off" onSubmit={event => handleSubmit(event)}>
      <Form.Group id="form_name">
        <Form.Label>Nombre completo</Form.Label>
        <Form.Row>
          <Col>
            <Form.Control
              name="firstName"
              type="text"
              placeholder="Nombre..."
              onChange={event => handleUserInput(event)}
            />
          </Col>
          <Col>
            <Form.Control
              name="secondName"
              type="text"
              placeholder="Segundo nombre..."
              onChange={event => handleUserInput(event)}
            />
          </Col>
          <Col>
            <Form.Control
              name="lastName"
              type="text"
              placeholder="Apellido..."
              onChange={event => handleUserInput(event)}
            />
          </Col>
        </Form.Row>
      </Form.Group>
      <Form.Group id="form_date">
        <Form.Label>Fecha de nacimiento</Form.Label>
        <Form.Control
          name="birthDate"
          type="date"
          placeholder="Seleccione fecha..."
          onChange={event => handleUserInput(event)}
        />
      </Form.Group>
      <Button id="form_submit" variant="primary" type="submit" size="lg">
        Calcular
      </Button>
    </Form>
  );
};

export default InputForm;
