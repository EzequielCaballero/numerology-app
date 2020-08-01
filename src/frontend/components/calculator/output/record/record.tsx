import React from 'react';
import IPerson from '../../../../../backend/entity/person';
import './record.css';

type TProps = {
	person: IPerson;
	showRecord: (operation: string) => void;
};

const CalculatorOutputRecord: React.FunctionComponent<TProps> = (props: TProps) => {
	const { person, showRecord } = props;

	return (
		<div className="output-record">
			<div title="image" className="output-record-operation">
				<span className="record-title">Imagen</span>
				<span className="record-value">{person.image}</span>
				<span className="record-expand" role="img" aria-label="search" onClick={() => showRecord('image')}>
					🔎
				</span>
			</div>
			<div title="essence" className="output-record-operation">
				<span className="record-title">Esencia</span>
				<span className="record-value">{person.essence}</span>
				<span className="record-expand" role="img" aria-label="search" onClick={() => showRecord('essence')}>
					🔎
				</span>
			</div>
			<div title="mission" className="output-record-operation">
				<span className="record-title">Misión</span>
				<span className="record-value">{person.mission}</span>
				<span className="record-expand" role="img" aria-label="search" onClick={() => showRecord('mission')}>
					🔎
				</span>
			</div>
			<div title="path" className="output-record-operation">
				<span className="record-title">Sendero</span>
				<span className="record-value">{person.natal_path}</span>
				<span className="record-expand" role="img" aria-label="search" onClick={() => showRecord('path')}>
					🔎
				</span>
			</div>
			<div title="personalKey" className="output-record-operation">
				<span className="record-title">Clave</span>
				<span className="record-value">{person.personal_key}</span>
				<span
					className="record-expand"
					role="img"
					aria-label="search"
					onClick={() => showRecord('personalKey')}
				>
					🔎
				</span>
			</div>
			<div title="potentialNumber" className="output-record-operation">
				<span className="record-title">Potencial</span>
				<span className="record-value">{person.potential_number}</span>
				<span
					className="record-expand"
					role="img"
					aria-label="search"
					onClick={() => showRecord('potentialNumber')}
				>
					🔎
				</span>
			</div>
			<div title="karmas" className="output-record-operation">
				<span className="record-title">Karmas</span>
				<span className="record-value">***</span>
				<span className="record-expand" role="img" aria-label="search" onClick={() => showRecord('karmas')}>
					🔎
				</span>
			</div>
			<div title="stages" className="output-record-operation">
				<span className="record-title">Etapas</span>
				<span className="record-value">***</span>
				<span className="record-expand" role="img" aria-label="search" onClick={() => showRecord('stages')}>
					🔎
				</span>
			</div>
			<div title="personalYear" className="output-record-operation">
				<span className="record-title">Año personal</span>
				<span className="record-value">{person.personal_year}</span>
				<span
					className="record-expand"
					role="img"
					aria-label="search"
					onClick={() => showRecord('personalYear')}
				>
					🔎
				</span>
			</div>
			<div title="personalMonth" className="output-record-operation">
				<span className="record-title">Mes personal</span>
				<span className="record-value">{person.personal_month}</span>
				<span
					className="record-expand"
					role="img"
					aria-label="search"
					onClick={() => showRecord('personalMonth')}
				>
					🔎
				</span>
			</div>
			<div title="ageDigit" className="output-record-operation">
				<span className="record-title">Digito de edad</span>
				<span className="record-value">{person.age_digit}</span>
				<span className="record-expand" role="img" aria-label="search" onClick={() => showRecord('ageDigit')}>
					🔎
				</span>
			</div>
		</div>
	);
};

export default CalculatorOutputRecord;
