import React from 'react';
import { IPerson, TNumbers } from '../../../../../backend/entity/iperson';
import { TRecord } from '../../../../../backend/services/core/calculator';
import './record.css';

type TProps = {
	person: IPerson;
	record: TRecord;
};

export const CalculatorOutputRecord: React.FunctionComponent<TProps> = ({ person, record }) => {
	const getTitle = (key: string): string => {
		switch (key) {
			case 'image':
				return 'Imagen';
			case 'essence':
				return 'Esencia';
			case 'mission':
				return 'Misión';
			case 'natalPath':
				return 'Sendero natal';
			case 'potentialNumber':
				return 'Número potencial';
			case 'personalKey':
				return 'Clave personal';
			case 'personalYear':
				return 'Año personal';
			case 'personalMonth':
				return 'Mes personal';
			case 'ageDigit':
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
			case 'natalPath':
				text.push(JSON.stringify(record.birth));
				for (let i = 0; i < record.path.length; i++) {
					text.push(JSON.stringify(record.path[i]));
				}
				break;
			case 'potentialNumber':
				text.push(
					`${person.numbers.mission} + ${person.numbers.natalPath} = ${person.numbers.potentialNumber}`
				);
				break;
			case 'personalKey':
				text.push(`${person.birth.month} -> ${person.numbers.personalKey}`);
				break;
			case 'personalYear':
				text.push(
					`${person.birth.month} + ${person.birth.year} + ${new Date().getFullYear()} = ${person.numbers
						.personalYear}`
				);
				break;
			case 'personalMonth':
				text.push(
					`${person.numbers.personalYear} + ${new Date().getMonth() + 1} = ${person.numbers.personalMonth}`
				);
				text.push('(año personal + mes actual)');
				break;
			case 'ageDigit':
				text.push(`${person.age} + ${person.age + 1} = ${person.numbers.ageDigit}`);
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
				text.push(`Números faltantes: ${person.karmas.possible}`);
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
