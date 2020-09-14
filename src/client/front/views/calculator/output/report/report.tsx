import React from 'react';
import { IPerson } from '../../../../../back/entity/iperson';
import { useContextSetup } from '../../../../context/setup';
import './report.css';

type TProps = {
	person: IPerson;
};

export const CalculatorOutputReport: React.FunctionComponent<TProps> = ({ person }) => {
	const { translate } = useContextSetup();
	return (
		<div className="output-report">
			<h3>{translate.t('coutput.report.title')}</h3>
			<br />
			<h5>
				{'IMAGEN | '}
				<span>{person.numbers.image}</span>
			</h5>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
				dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
				ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum. In culpa
				qui officia deserunt mollit anim id est laborum.
			</p>
			<h5>
				{'ESENCIA | '}
				<span>{person.numbers.essence}</span>
			</h5>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
				dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
				ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum. In culpa
				qui officia deserunt mollit anim id est laborum.
			</p>
			<h5>
				{'MISIÓN | '}
				<span>{person.numbers.mission}</span>
			</h5>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
				dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
				ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum. In culpa
				qui officia deserunt mollit anim id est laborum.
			</p>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
				dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
				ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum. In culpa
				qui officia deserunt mollit anim id est laborum.
			</p>
		</div>
	);
};
