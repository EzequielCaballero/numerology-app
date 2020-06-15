import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import './calculator-form.css';

const CalculatorForm = (props) => {
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
		handleSubmit
	} = props;

	return (
		<Form className="calculator-form" autoComplete="false" onSubmit={(event) => handleSubmit(event)} noValidate>
			<Form.Group id="form_name">
				<Form.Label>Nombre completo</Form.Label>
				<InputGroup className="mb-3 form-input-name">
					<InputGroup.Prepend>
						<Button variant="outline-danger" onClick={() => handleRemoveName('firstName')}>
							<span id="remove-field" role="img" aria-label="removeField">
								-
							</span>
						</Button>
					</InputGroup.Prepend>
					{valueFirstName.map((subname, index) => (
						<Form.Control
							key={`firstName-${index}`}
							name={`firstName-${index}`}
							type="text"
							maxLength="30"
							placeholder={`Nombre-${index + 1}...`}
							onChange={(event) => handleInputName(event)}
							value={subname}
						/>
					))}
					<InputGroup.Append>
						<Button variant="outline-success" onClick={() => handleAddName('firstName')}>
							<span id="add-field" role="img" aria-label="addField">
								+
							</span>
						</Button>
					</InputGroup.Append>
				</InputGroup>
				<InputGroup className="mb-3 form-input-name">
					<InputGroup.Prepend>
						<Button variant="outline-danger" onClick={() => handleRemoveName('lastName')}>
							<span id="remove-field" role="img" aria-label="removeField">
								-
							</span>
						</Button>
					</InputGroup.Prepend>
					{valueLastName.map((subname, index) => (
						<Form.Control
							key={`lastName-${index}`}
							name={`lastName-${index}`}
							type="text"
							maxLength="30"
							placeholder={`Apellido-${index + 1}...`}
							onChange={(event) => handleInputName(event)}
							value={subname}
						/>
					))}
					<InputGroup.Append>
						<Button variant="outline-success" onClick={() => handleAddName('lastName')}>
							<span id="add-field" role="img" aria-label="addField">
								+
							</span>
						</Button>
					</InputGroup.Append>
				</InputGroup>
			</Form.Group>
			<Form.Group id="form_date">
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
						min="1000"
						value={valueBirthYear}
					/>
				</InputGroup>
			</Form.Group>
			<div className="form-output">
				<input type="checkbox" id="form-output-check" />
				<div className="form-output-header">
					<span>Valores finales</span>

					<label className="form-output-check-btn" htmlFor="form-output-check">
						<span>?</span>
					</label>
				</div>
				<div className="form-output-values">
					<span>
						{valueFirstName[0] !== '' && valueLastName[0] !== '' ? (
							`${valueFirstName.map((item) => item).toString().replace(/,/g, ' ')} 
            ${valueLastName.map((item) => item).toString().replace(/,/g, ' ')}`
						) : (
							'...'
						)}
					</span>
					<br />
					<span>
						{valueBirthDay !== '' && valueBirthMonth !== '' && valueBirthYear !== '' ? (
							`${valueBirthDay}/${valueBirthMonth}/${valueBirthYear}`
						) : (
							'...'
						)}
					</span>
				</div>
			</div>
			<div className="form-actions">
				<button className="btn-action" type="submit">
					Calcular
				</button>
				<button type="text" onClick={(e) => handleCleanInputs(e)}>
					<span role="img" aria-label="trash">
						<svg
							id="trash_icon"
							version="1.1"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 512 512"
							width="30"
							height="25"
						>
							<path d="M459.2,60.7h-72C386.2,43,371.6,29,353.7,29H161.7c-17.9,0-32.4,14-33.6,31.7H64.6
            c-18.6,0-33.8,15.1-33.8,33.8v8.4c0,18.6,15.1,33.8,33.8,33.8h21v342.1c0,13.8,11.2,25,25,25h309c13.8,0,25-11.2,25-25V136.7h14.7
            c18.7,0,33.8-15.1,33.8-33.8v-8.4C493,75.8,477.9,60.7,459.2,60.7z M196.7,443.7c0,12.6-10.2,22.8-22.8,22.8
            c-12.6,0-22.8-10.2-22.8-22.8V158.8c0-12.6,10.2-22.8,22.8-22.8c12.6,0,22.8,10.2,22.8,22.8V443.7z M287.9,443.7
            c0,12.6-10.2,22.8-22.8,22.8s-22.8-10.2-22.8-22.8V158.8c0-12.6,10.2-22.8,22.8-22.8s22.8,10.2,22.8,22.8V443.7z M379.1,443.7
            c0,12.6-10.2,22.8-22.8,22.8c-12.6,0-22.8-10.2-22.8-22.8V158.8c0-12.6,10.2-22.8,22.8-22.8c12.6,0,22.8,10.2,22.8,22.8V443.7z" />
						</svg>
					</span>
				</button>
			</div>
		</Form>
	);
};

export default CalculatorForm;
