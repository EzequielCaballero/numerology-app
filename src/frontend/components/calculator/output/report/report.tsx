import React from 'react';
import IPerson from '../../../../../backend/entity/person';
import './report.css';

type TProps = {
	person: IPerson;
};

const CalculatorOutputReport: React.FunctionComponent<TProps> = (props: TProps) => {
	const { person } = props;

	return (
		<div className="output-report">
			<h3>Análisis de resultados</h3>
			<h5>IMAGEN | {person.numbers.image}</h5>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
				dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
				ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum. In culpa
				qui officia deserunt mollit anim id est laborum.
			</p>
			<h5>ESENCIA | {person.numbers.essence}</h5>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
				dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
				ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum. In culpa
				qui officia deserunt mollit anim id est laborum.
			</p>
			<h5>MISIÓN | {person.numbers.mission}</h5>
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
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
				dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
				ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum. In culpa
				qui officia deserunt mollit anim id est laborum.
			</p>
		</div>
	);
};

export default CalculatorOutputReport;
