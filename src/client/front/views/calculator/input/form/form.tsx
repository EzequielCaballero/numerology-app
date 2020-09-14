import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { TName, TBirth } from '../../../../../back/entity/iperson';
import { useContextSetup } from '../../../../context/setup';
import { SVGSelector } from '../../../../components/svg/selector';
import './form.css';

type TProps = {
	name: TName;
	birth: TBirth;
	submitted: boolean;
	validName: boolean[];
	validBirth: boolean;
	handleInputName: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleInputDate: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleAddName: (keyName: string) => void;
	handleRemoveName: (keyName: string) => void;
	handleCleanInputs: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export const CalculatorInputForm: React.FunctionComponent<TProps> = (props: TProps) => {
	const { translate } = useContextSetup();
	const {
		name,
		birth,
		submitted,
		validName,
		validBirth,
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
				<Form.Label>* {translate.t('cinput.form.name.title')}</Form.Label>
				<InputGroup className="mb-3 form-input-name">
					<InputGroup.Prepend>
						<Button
							aria-label={translate.t('cinput.form.remove_field.0')}
							variant="outline-danger"
							onClick={() => handleRemoveName('firstName')}
						>
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
							aria-label={`${translate.t('cinput.form.name.field.0')}-${index + 1}...`}
							placeholder={`${translate.t('cinput.form.name.field.0')}-${index + 1}...`}
							onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputName(event)}
							value={subname}
							isValid={validName[0] && submitted}
							isInvalid={!validName[0] && submitted}
						/>
					))}
					<InputGroup.Append>
						<Button
							aria-label={translate.t('cinput.form.add_field.0')}
							variant="outline-success"
							onClick={() => handleAddName('firstName')}
						>
							<span id="add-field" role="img" aria-label="addField">
								+
							</span>
						</Button>
					</InputGroup.Append>
				</InputGroup>
				<InputGroup className="mb-3 form-input-name">
					<InputGroup.Prepend>
						<Button
							aria-label={translate.t('cinput.form.remove_field.1')}
							variant="outline-danger"
							onClick={() => handleRemoveName('lastName')}
						>
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
							aria-label={`${translate.t('cinput.form.name.field.1')}-${index + 1}...`}
							placeholder={`${translate.t('cinput.form.name.field.1')}-${index + 1}...`}
							onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputName(event)}
							value={subname}
							isValid={validName[1] && submitted}
							isInvalid={!validName[1] && submitted}
						/>
					))}
					<InputGroup.Append>
						<Button
							aria-label={translate.t('cinput.form.add_field.1')}
							variant="outline-success"
							onClick={() => handleAddName('lastName')}
						>
							<span id="add-field" role="img" aria-label="addField">
								+
							</span>
						</Button>
					</InputGroup.Append>
				</InputGroup>
			</Form.Group>
			<Form.Group id="form_date">
				<Form.Label>* {translate.t('cinput.form.birth.title')}</Form.Label>
				<InputGroup className="mb-3 form-input-date">
					<Form.Control
						name="day"
						type="number"
						aria-label={translate.t('cinput.form.birth.field.0')}
						placeholder={translate.t('cinput.form.birth.field.0')}
						onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputDate(event)}
						min="1"
						max="31"
						value={birth.day === 0 ? '' : birth.day}
						isValid={validBirth && submitted}
						isInvalid={!validBirth && submitted}
					/>
					<Form.Control
						name="month"
						type="number"
						aria-label={translate.t('cinput.form.birth.field.1')}
						placeholder={translate.t('cinput.form.birth.field.1')}
						onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputDate(event)}
						min="1"
						max="12"
						value={birth.month === 0 ? '' : birth.month}
						isValid={validBirth && submitted}
						isInvalid={!validBirth && submitted}
					/>
					<Form.Control
						name="year"
						type="number"
						aria-label={translate.t('cinput.form.birth.field.2')}
						placeholder={translate.t('cinput.form.birth.field.2')}
						onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputDate(event)}
						min="1000"
						max="9999"
						value={birth.year === 0 ? '' : birth.year}
						isValid={validBirth && submitted}
						isInvalid={!validBirth && submitted}
					/>
				</InputGroup>
			</Form.Group>
			<div className="form-preview">
				<input type="checkbox" id="form-preview-check" />
				<div className="form-preview-header">
					<span>{translate.t('cinput.form.expand')}</span>

					<label className="form-preview-check-btn" htmlFor="form-preview-check">
						<span>{'>'}</span>
					</label>
				</div>
				<div className="form-preview-values">
					<span>
						{`${name.firstName.map((item) => item).join(' ')} 
            				 ${name.lastName.map((item) => item).join(' ')}`}
					</span>
					<br />
					<span>
						{(birth.day !== 0 || birth.month !== 0 || birth.year !== 0) &&
							`${`0${birth.day}`.slice(-2)}/${`0${birth.month}`.slice(-2)}/${birth.year}`}
					</span>
				</div>
			</div>
			<div className="form-actions">
				<button className="btn-action" type="submit">
					{translate.t('cinput.form.btn')}
				</button>
				<button
					aria-label={translate.t('cinput.form.trash')}
					title={translate.t('cinput.form.trash')}
					onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleCleanInputs(e)}
				>
					<SVGSelector name="iconTrash" />
				</button>
			</div>
		</Form>
	);
};
