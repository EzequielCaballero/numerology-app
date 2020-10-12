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
			<div className="input-person">
				<p id="input-person-name">{Convertor.formatNameToString(name)}</p>
				<p id="input-person-date">{Convertor.formatDateToString(birth)}</p>
			</div>
			<div className="output-option">
				<span>
					<button
						aria-label="Edit input"
						title={translate.t('coutput.panel.edit')}
						onClick={goToCalculatorInput}
					>
						<SVGSelector name="iconEdit" />
					</button>
				</span>
				<span>
					{/* {showReport ? translate.t('coutput.panel.switcher.0') : translate.t('coutput.panel.switcher.1')} */}
					<Switcher
						identifier="switcher-output"
						title={
							showReport ? (
								translate.t('coutput.panel.switcher.1')
							) : (
								translate.t('coutput.panel.switcher.0')
							)
						}
						action={switchOutput}
					/>
				</span>
				{isSaveActive ? (
					<span>
						<button
							aria-label={translate.t('coutput.panel.save.0')}
							title={translate.t('coutput.panel.save.0')}
							onClick={handleSaveResult}
						>
							<SVGSelector name="iconSave" />
						</button>
					</span>
				) : (
					<span>
						<button
							aria-label={translate.t('coutput.panel.save.1')}
							title={translate.t('coutput.panel.save.1')}
							onClick={goToHistory}
						>
							<SVGSelector name="iconCheck" />
						</button>
					</span>
				)}
			</div>
		</div>
	);
};
