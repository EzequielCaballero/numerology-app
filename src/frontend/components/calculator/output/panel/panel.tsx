import React from 'react';
import { TName, TBirth } from '../../../../../backend/entity/iperson';
import { Convertor } from '../../../../../backend/services/core/convertor';
import { SVGSelector } from '../../../svg/selector';
import './panel.css';

type TProps = {
	name: TName;
	birth: TBirth;
	showReport: boolean;
	isSaveActive: boolean;
	switchOutput: () => void;
	handleSaveResult: () => void;
	goToCalculatorInput: () => void;
	goToHistory: () => void;
};

export const CalculatorOutputPanel: React.FunctionComponent<TProps> = ({
	name,
	birth,
	showReport,
	isSaveActive,
	switchOutput,
	handleSaveResult,
	goToCalculatorInput,
	goToHistory
}) => {
	return (
		<div className="output-panel">
			<div className="output-option">
				<button onClick={goToCalculatorInput}>
					<SVGSelector name="iconEdit" />
				</button>
				<button className="btn-action" onClick={switchOutput}>
					{showReport ? 'Cálculo' : 'Reporte'}
					<SVGSelector name="iconSwitch" />
				</button>
				{isSaveActive ? (
					<button onClick={handleSaveResult}>
						<SVGSelector name="iconSave" />
					</button>
				) : (
					<button onClick={goToHistory} title="Resultado guardado">
						<SVGSelector name="iconCheck" />
					</button>
				)}
			</div>
			<div className="input-person">
				<p id="input-person-name">{Convertor.formatNameToString(name)}</p>
				<p id="input-person-date">{Convertor.formatDateToString(birth)}</p>
			</div>
		</div>
	);
};
