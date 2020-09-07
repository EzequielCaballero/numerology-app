import React from 'react';
import { TName, TBirth } from '../../../../../back/entity/iperson';
import { Convertor } from '../../../../../back/services/core/convertor';
import { useContextSetup } from '../../../../context/setup';
import { SVGSelector } from '../../../../components/svg/selector';
import { Switcher } from '../../../../components/switcher/switcher';
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
				<span>
					<button onClick={goToCalculatorInput} title={translate.t('coutput.panel.edit')}>
						<SVGSelector name="iconEdit" />
					</button>
				</span>
				<span>
					{/* {showReport ? translate.t('coutput.panel.switcher.0') : translate.t('coutput.panel.switcher.1')} */}
					<Switcher
						identifier="switcher-output"
						title={
							showReport ? (
								translate.t('coutput.panel.switcher.0')
							) : (
								translate.t('coutput.panel.switcher.1')
							)
						}
						action={switchOutput}
					/>
				</span>
				{isSaveActive ? (
					<span>
						<button onClick={handleSaveResult} title={translate.t('coutput.panel.save.0')}>
							<SVGSelector name="iconSave" />
						</button>
					</span>
				) : (
					<span>
						<button onClick={goToHistory} title={translate.t('coutput.panel.save.1')}>
							<SVGSelector name="iconCheck" />
						</button>
					</span>
				)}
			</div>
			<div className="input-person">
				<p id="input-person-name">{Convertor.formatNameToString(name)}</p>
				<p id="input-person-date">{Convertor.formatDateToString(birth)}</p>
			</div>
		</div>
	);
};
