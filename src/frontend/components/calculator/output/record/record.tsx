import React from 'react';
import { IPerson, TNumbers } from '../../../../../backend/entity/iperson';
import { TRecord } from '../../../../../backend/services/core/calculator';
import './record.css';

type TProps = {
	person: IPerson;
	record: TRecord;
};

const CalculatorOutputRecord: React.FunctionComponent<TProps> = ({ person, record }) => {
	const getTitle = (key: string): string => {
		switch (key) {
			case 'image':
				return 'Imagen';
			case 'essence':
				return 'Esencia';
			case 'mission':
				return 'Misión';
			case 'natal_path':
				return 'Sendero natal';
			case 'potential_number':
				return 'Número potencial';
			case 'personal_key':
				return 'Clave personal';
			case 'personal_year':
				return 'Año personal';
			case 'personal_month':
				return 'Mes personal';
			case 'age_digit':
				return 'Digito de edad';
			case 'stages':
				return 'Etapas';
			case 'karmas':
				return 'Karmas';
			default:
				return '';
		}
	};

	const getDescription = (key: string): Array<JSX.Element> => {
		let text: string[] = [ '' ];
		switch (key) {
			case 'image':
				text.push(JSON.stringify(record.name));
				for (let i = 0; i < record.image.length; i++) {
					text.push(JSON.stringify(record.image[i]));
				}
				break;
			case 'essence':
				text.push(JSON.stringify(record.name));
				for (let i = 0; i < record.essence.length; i++) {
					text.push(JSON.stringify(record.essence[i]));
				}
				break;
			case 'mission':
				text.push(JSON.stringify(record.name));
				for (let i = 0; i < record.mission.length; i++) {
					text.push(JSON.stringify(record.mission[i]));
				}
				break;
			case 'natal_path':
				text.push(JSON.stringify(record.birth));
				for (let i = 0; i < record.path.length; i++) {
					text.push(JSON.stringify(record.path[i]));
				}
				break;
			case 'potential_number':
				text.push(
					`${person.numbers.mission} + ${person.numbers.natal_path} = ${person.numbers.potential_number}`
				);
				break;
			case 'personal_key':
				text.push(`${person.birthdate[2]} -> ${person.numbers.personal_key}`);
				break;
			case 'personal_year':
				text.push(
					`${person.birthdate[2]} + ${person.birthdate[1]} + ${new Date().getFullYear()} = ${person.numbers
						.personal_year}`
				);
				break;
			case 'personal_month':
				text.push(
					`${person.numbers.personal_year} + ${new Date().getMonth() + 1} = ${person.numbers.personal_month}`
				);
				text.push('(año personal + mes actual)');
				break;
			case 'age_digit':
				text.push(`${person.age} + ${person.age + 1} = ${person.numbers.age_digit}`);
				text.push('(edad actual + edad próxima)');
				break;
			case 'stages':
				for (let stage of person.stages) {
					text.push(`${stage.num}° | ${stage.from} -> ${stage.to === 0 ? '∞' : stage.to} = ${stage.value}`);
				}
				break;
			case 'karmas':
				text.push(`Esencia: ${person.karmas.essence}`);
				text.push(`Misión: ${person.karmas.mission}`);
				text.push(`Sendero: ${person.karmas.path}`);
				text.push('---');
				text.push(`Números faltantes: ${person.karmas.possible_karmas}`);
				break;
			default:
				break;
		}
		return text.map((t, index) => <p key={index}>{t.trim()}</p>);
	};

	const numbers: Array<JSX.Element> = Object.keys(person.numbers).map((item) => (
		<div key={item} title={item}>
			<input type="checkbox" name="check-record-item" id={`check-record-item-${item}`} />
			<div className="output-record-item">
				<span className="record-title">{getTitle(item)}</span>
				<span className="record-value">{person.numbers[item as keyof TNumbers]}</span>
				<span>
					<label className="record-expand" htmlFor={`check-record-item-${item}`}>
						{'>'}
					</label>
				</span>
			</div>
			<div id={`record-detail-${item}`} className="output-record-detail">
				{getDescription(item)}
			</div>
		</div>
	));

	const stages: JSX.Element = (
		<div title="stages">
			<input type="checkbox" name="check-record-item" id="check-record-item-stages" />
			<div className="output-record-item">
				<span className="record-title">{getTitle('stages')}</span>
				<span className="record-value">***</span>
				<span>
					<label className="record-expand" htmlFor="check-record-item-stages">
						{'>'}
					</label>
				</span>
			</div>
			<div id="record-detail-stages" className="output-record-detail">
				{getDescription('stages')}
			</div>
		</div>
	);

	const karmas: JSX.Element = (
		<div title="karmas">
			<input type="checkbox" name="check-record-item" id="check-record-item-karmas" />
			<div className="output-record-item">
				<span className="record-title">{getTitle('karmas')}</span>
				<span className="record-value">***</span>
				<span>
					<label className="record-expand" htmlFor="check-record-item-karmas">
						{'>'}
					</label>
				</span>
			</div>
			<div id="record-detail-karmas" className="output-record-detail">
				{getDescription('karmas')}
			</div>
		</div>
	);

	const switchChecksStatus = (check: boolean): void => {
		const allinputChecks: NodeListOf<HTMLInputElement> = document.getElementsByName(
			'check-record-item'
		) as NodeListOf<HTMLInputElement>;
		allinputChecks.forEach((i) => (i.checked = check));
	};

	return (
		<div className="output-record">
			<div className="output-record-switch-expand">
				<button onClick={() => switchChecksStatus(true)}>
					<span>{'<>'}</span>
				</button>
				<button onClick={() => switchChecksStatus(false)}>
					<span>{'><'}</span>
				</button>
			</div>
			{numbers}
			{stages}
			{karmas}
		</div>
	);
};

export default CalculatorOutputRecord;
