import React from 'react';
import './calculator-result.css';

const CalculatorResult = (props) => {
	const { person, showOperations, hideResults } = props;

	//INPUTS FORMATTED
	const fullName = person.nombre_input
		.split('|')
		.map((name, index) => <span key={index}>{name.toLowerCase()} </span>);

	const birthDate = `${('0' + person.nacimiento[0]).slice(-2)}/${('0' + person.nacimiento[1]).slice(-2)}/${person
		.nacimiento[2]}`;

	return (
		<div className="calculator-result">
			<div className="result-option">
				<button onClick={hideResults}>
					<svg
						id="back_icon"
						version="1.1"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 512 512"
						width="25"
						height="25"
					>
						<path d="M500,234.6v38.8c0,10.7-3.6,19.8-10.7,27.4c-7.1,7.6-16.4,11.4-27.8,11.4h-232l96.5,89.1
            c8.3,7.3,12.5,16.4,12.5,27.3c0,10.9-4.2,20-12.5,27.3l-24.7,23c-8.1,7.5-18,11.2-29.7,11.2c-11.4,0-21.4-3.7-30-11.2L27.2,281.3
            C19.1,273.8,15,264.7,15,254c0-10.5,4.1-19.7,12.2-27.6L241.7,29.5C250,21.8,260,18,271.7,18c11.4,0,21.3,3.8,29.7,11.5L326,51.9
            c8.3,7.7,12.5,16.9,12.5,27.6c0,10.7-4.2,19.9-12.5,27.6l-96.5,88.8h232c11.4,0,20.7,3.8,27.8,11.4C496.4,214.8,500,223.9,500,234.6
            z" />
					</svg>
				</button>
				<button className="btn-action">Reporte</button>
			</div>
			<div className="result-person">
				<p id="output-name">{fullName}</p>
				<p id="output-date">{birthDate}</p>
			</div>
			<div className="result-detail">
				<div name="image" className="result-detail-item">
					<span className="r-title">Imagen</span>
					<span className="r-value">{person.imagen}</span>
					<span className="r-expand" role="img" aria-label="search" onClick={() => showOperations('image')}>
						🔎
					</span>
				</div>
				<div name="essence" className="result-detail-item">
					<span className="r-title">Esencia</span>
					<span className="r-value">{person.esencia}</span>
					<span className="r-expand" role="img" aria-label="search" onClick={() => showOperations('essence')}>
						🔎
					</span>
				</div>
				<div name="mission" className="result-detail-item">
					<span className="r-title">Misión</span>
					<span className="r-value">{person.mision}</span>
					<span className="r-expand" role="img" aria-label="search" onClick={() => showOperations('mission')}>
						🔎
					</span>
				</div>
				<div name="path" className="result-detail-item">
					<span className="r-title">Sendero</span>
					<span className="r-value">{person.sendero_natal}</span>
					<span className="r-expand" role="img" aria-label="search" onClick={() => showOperations('path')}>
						🔎
					</span>
				</div>
				<div name="personalKey" className="result-detail-item">
					<span className="r-title">Clave</span>
					<span className="r-value">{person.clave_personal}</span>
					<span
						className="r-expand"
						role="img"
						aria-label="search"
						onClick={() => showOperations('personalKey')}
					>
						🔎
					</span>
				</div>
				<div name="potentialNumber" className="result-detail-item">
					<span className="r-title">Potencial</span>
					<span className="r-value">{person.numero_potencial}</span>
					<span
						className="r-expand"
						role="img"
						aria-label="search"
						onClick={() => showOperations('potentialNumber')}
					>
						🔎
					</span>
				</div>
				<div name="karmas" className="result-detail-item">
					<span className="r-title">Karmas</span>
					<span className="r-value">***</span>
					<span className="r-expand" role="img" aria-label="search" onClick={() => showOperations('karmas')}>
						🔎
					</span>
				</div>
				<div name="stages" className="result-detail-item">
					<span className="r-title">Etapas</span>
					<span className="r-value">***</span>
					<span className="r-expand" role="img" aria-label="search" onClick={() => showOperations('stages')}>
						🔎
					</span>
				</div>
				<div name="personalYear" className="result-detail-item">
					<span className="r-title">Año personal</span>
					<span className="r-value">{person.ano_personal}</span>
					<span
						className="r-expand"
						role="img"
						aria-label="search"
						onClick={() => showOperations('personalYear')}
					>
						🔎
					</span>
				</div>
				<div name="personalMonth" className="result-detail-item">
					<span className="r-title">Mes personal</span>
					<span className="r-value">{person.mes_personal}</span>
					<span
						className="r-expand"
						role="img"
						aria-label="search"
						onClick={() => showOperations('personalMonth')}
					>
						🔎
					</span>
				</div>
				<div name="ageDigit" className="result-detail-item">
					<span className="r-title">Digito de edad</span>
					<span className="r-value">{person.digito_edad}</span>
					<span
						className="r-expand"
						role="img"
						aria-label="search"
						onClick={() => showOperations('ageDigit')}
					>
						🔎
					</span>
				</div>
			</div>
		</div>
	);
};

export default CalculatorResult;
