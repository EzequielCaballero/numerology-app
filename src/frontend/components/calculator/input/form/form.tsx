import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { TName, TBirth } from '../../../../../backend/entity/iperson';
import { SVGSelector } from '../../../svg/selector';
import './form.css';

type TProps = {
	name: TName;
	birth: TBirth;
	handleInputName: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleInputDate: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleAddName: (keyName: string) => void;
	handleRemoveName: (keyName: string) => void;
	handleCleanInputs: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export const CalculatorInputForm: React.FunctionComponent<TProps> = (props: TProps) => {
	const {
		name,
		birth,
		handleInputName,
		handleInputDate,
		handleAddName,
		handleRemoveName,
		handleCleanInputs,
		handleSubmit
	} = props;

	return (
		<Form
			className="form-calculator"
			autoComplete="false"
			onSubmit={(event: React.FormEvent<HTMLFormElement>) => handleSubmit(event)}
			noValidate
		>
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
					{name.firstName.map((subname, index) => (
						<Form.Control
							key={`firstName-${index}`}
							name={`firstName-${index}`}
							type="text"
							maxLength={30}
							placeholder={`Nombre-${index + 1}...`}
							onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputName(event)}
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
					{name.lastName.map((subname, index) => (
						<Form.Control
							key={`lastName-${index}`}
							name={`lastName-${index}`}
							type="text"
							maxLength={30}
							placeholder={`Apellido-${index + 1}...`}
							onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputName(event)}
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
						name="day"
						type="number"
						placeholder="Día"
						onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputDate(event)}
						min="1"
						max="31"
						value={birth.day === 0 ? '' : birth.day}
					/>
					<Form.Control
						name="month"
						type="number"
						placeholder="Mes"
						onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputDate(event)}
						min="1"
						max="12"
						value={birth.month === 0 ? '' : birth.month}
					/>
					<Form.Control
						name="year"
						type="number"
						placeholder="Año"
						onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputDate(event)}
						min="1000"
						value={birth.year === 0 ? '' : birth.year}
					/>
				</InputGroup>
			</Form.Group>
			<div className="form-output">
				<input type="checkbox" id="form-output-check" />
				<div className="form-output-header">
					<span>Valores ingresados</span>

					<label className="form-output-check-btn" htmlFor="form-output-check">
						<span>{'>'}</span>
					</label>
				</div>
				<div className="form-output-values">
					<span>
						{`${name.firstName.map((item) => item).join(' ')} 
            				 ${name.lastName.map((item) => item).join(' ')}`}
					</span>
					<br />
					<span>{`${birth.day}/${birth.month}/${birth.year}`}</span>
				</div>
			</div>
			<div className="form-actions">
				<button className="btn-action" type="submit">
					Calcular
				</button>
				<button onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleCleanInputs(e)}>
					<SVGSelector name="iconTrash" />
				</button>
			</div>
		</Form>
	);
};
