import React from 'react';
import { TName, TBirth } from '../../../../../back/entity/iperson';
import { Convertor } from '../../../../../back/services/core/convertor';
import { useContextSetup } from '../../../../context/setup';
import { SVGSelector } from '../../../../components/svg/selector';
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
	const { translate } = useContextSetup();
	return (
		<div className="output-panel">
			<div className="output-option">
				<button onClick={goToCalculatorInput} title={translate.t('coutput.panel.edit')}>
					<SVGSelector name="iconEdit" />
				</button>
				<button className="btn-action" onClick={switchOutput}>
					{showReport ? translate.t('coutput.panel.option.0') : translate.t('coutput.panel.option.1')}
					<SVGSelector name="iconSwitch" />
				</button>
				{isSaveActive ? (
					<button onClick={handleSaveResult} title={translate.t('coutput.panel.save.0')}>
						<SVGSelector name="iconSave" />
					</button>
				) : (
					<button onClick={goToHistory} title={translate.t('coutput.panel.save.1')}>
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
