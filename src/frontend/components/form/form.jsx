import React from "react";
//BOOTSTRAP
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import ButtonGroup from "react-bootstrap/ButtonGroup";
//STYLE
import "./form.css";

const InputForm = (props) => {
  const {
    valueFirstName,
    valueLastName,
    valueBirthDay,
    valueBirthMonth,
    valueBirthYear,
    handleInputName,
    handleInputDate,
    handleAddName,
    handleRemoveName,
    handleCleanInputs,
    handleSubmit,
  } = props;

  return (
    <Form
      autoComplete="false"
      onSubmit={(event) => handleSubmit(event)}
      noValidate
    >
      <Form.Group id="form_name">
        <Form.Label>Nombre completo</Form.Label>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <Button
              variant="outline-secondary"
              onClick={() => handleRemoveName("firstName")}
            >
              <span role="img" aria-label="removeField">
                -
              </span>
            </Button>
          </InputGroup.Prepend>
          {valueFirstName.map((subname, index) => (
            <Form.Control
              key={`firstName-${index}`}
              name={`firstName-${index}`}
              type="text"
              placeholder={`Nombre-${index + 1}...`}
              onChange={(event) => handleInputName(event)}
              value={subname}
            />
          ))}
          <InputGroup.Append>
            <Button
              variant="outline-secondary"
              onClick={() => handleAddName("firstName")}
            >
              <span role="img" aria-label="addField">
                +
              </span>
            </Button>
          </InputGroup.Append>
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <Button
              variant="outline-secondary"
              onClick={() => handleRemoveName("lastName")}
            >
              <span role="img" aria-label="removeField">
                -
              </span>
            </Button>
          </InputGroup.Prepend>
          {valueLastName.map((subname, index) => (
            <Form.Control
              key={`lastName-${index}`}
              name={`lastName-${index}`}
              type="text"
              placeholder={`Apellido-${index + 1}...`}
              onChange={(event) => handleInputName(event)}
              value={subname}
            />
          ))}
          <InputGroup.Append>
            <Button
              variant="outline-secondary"
              onClick={() => handleAddName("lastName")}
            >
              <span role="img" aria-label="addField">
                +
              </span>
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </Form.Group>
      <Form.Group>
        <Form.Label>Fecha de nacimiento</Form.Label>
        <InputGroup className="mb-3 form-input-date">
          <Form.Control
            name="birthDay"
            type="number"
            placeholder="Día"
            onChange={(event) => handleInputDate(event)}
            min="1"
            max="31"
            value={valueBirthDay}
          />
          <Form.Control
            name="birthMonth"
            type="number"
            placeholder="Mes"
            onChange={(event) => handleInputDate(event)}
            min="1"
            max="12"
            value={valueBirthMonth}
          />
          <Form.Control
            name="birthYear"
            type="number"
            placeholder="Año"
            onChange={(event) => handleInputDate(event)}
            min="1900"
            max={new Date().getFullYear()}
            value={valueBirthYear}
          />
        </InputGroup>
      </Form.Group>
      <div className="form-output">
        <span>
          {valueFirstName[0] !== "" && valueLastName[0] !== ""
            ? `${valueFirstName
                .map((item) => item)
                .toString()
                .replace(/,/g, " ")} 
            ${valueLastName
              .map((item) => item)
              .toString()
              .replace(/,/g, " ")}`
            : "..."}
        </span>
        <br />
        <span>
          {valueBirthDay !== "" &&
          valueBirthMonth !== "" &&
          valueBirthYear !== ""
            ? `${valueBirthDay}/${valueBirthMonth}/${valueBirthYear}`
            : "..."}
        </span>
      </div>
      <ButtonGroup className="form-actions">
        <Button
          id="form_clean"
          variant="light"
          className="btn-left"
          onClick={() => handleCleanInputs()}
        >
          <span role="img" aria-label="trash">
            <img
              id="trash-icon"
              src={require("../../assets/trash.svg")}
              alt="Trash"
            />
          </span>
        </Button>
        <Button id="form_submit" variant="success" type="submit" size="lg">
          Calcular
        </Button>
      </ButtonGroup>
    </Form>
  );
};

export default InputForm;
