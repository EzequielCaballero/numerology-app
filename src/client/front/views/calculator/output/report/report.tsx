import React from 'react';
import { IPerson, TNumbers, TKarma } from '../../../../../back/entity/iperson';
import { useContextSetup } from '../../../../context/setup';
import './report.css';

type TProps = {
	person: IPerson;
	redirect: () => void;
};

export const CalculatorOutputReport: React.FunctionComponent<TProps> = ({ person, redirect }) => {
	const { translate } = useContextSetup();

	const numbers: Array<JSX.Element> = Object.keys(person.numbers).map((item) => (
		<div key={item} className="report-category">
			<div className="report-header">
				<p>
					<span className="report-title">{translate.t(`core.${item}.title`)}</span>
					<br />
					<i className="report-subtitle">"{translate.t(`core.${item}.subtitle`)}"</i>
				</p>
				<p className="report-value" data-result-value={person.numbers[item as keyof TNumbers]}>
					{person.numbers[item as keyof TNumbers]}
				</p>
			</div>
			<div className="report-description">
				{item === 'essence' && (
					<div>
						<p>
							<strong>{translate.t(`core.${item}.report.aspects.0`)}: </strong>
							<span>
								{translate.t(`core.${item}.report.${person.numbers[item as keyof TNumbers]}.0`)}
							</span>
						</p>

						<p>
							<strong>{translate.t(`core.${item}.report.aspects.1`)}: </strong>
							<span>
								{translate.t(`core.${item}.report.${person.numbers[item as keyof TNumbers]}.1`)}
							</span>
						</p>

						<p>
							<strong>{translate.t(`core.${item}.report.aspects.2`)}: </strong>
							<span>
								{translate.t(`core.${item}.report.${person.numbers[item as keyof TNumbers]}.2`)}
							</span>
						</p>
					</div>
				)}

				{item === 'personalKey' && (
					<div>
						<p>
							<strong>{translate.t(`core.${item}.report.aspects.0`)}: </strong>
							<span>
								{translate.t(`core.${item}.report.${person.numbers[item as keyof TNumbers]}.0`)}
							</span>
						</p>

						<p>
							<strong>{translate.t(`core.${item}.report.aspects.1`)}: </strong>
							<span>
								{translate.t(`core.${item}.report.${person.numbers[item as keyof TNumbers]}.1`)}
							</span>
						</p>
					</div>
				)}

				{item === 'personalYear' && (
					<div>
						<i>{translate.t(`core.${item}.report.${person.numbers[item as keyof TNumbers]}.0`)}</i>
						<p>
							<strong>{translate.t(`core.${item}.report.aspects.1`)}: </strong>
							<span>
								{translate.t(`core.${item}.report.${person.numbers[item as keyof TNumbers]}.1`)}
							</span>
						</p>

						<p>
							<strong>{translate.t(`core.${item}.report.aspects.2`)}: </strong>
							<span>
								{translate.t(`core.${item}.report.${person.numbers[item as keyof TNumbers]}.2`)}
							</span>
						</p>
					</div>
				)}

				{item !== 'essence' &&
				item !== 'personalKey' &&
				item !== 'personalYear' && (
					<p>{translate.t(`core.${item}.report.${person.numbers[item as keyof TNumbers]}`)}</p>
				)}
			</div>
		</div>
	));

	const stages: JSX.Element = (
		<div className="report-category">
			<div className="report-header">
				<p>
					<span className="report-title">{translate.t(`core.stages.title`)}</span>
					<br />
					<i className="report-subtitle">"{translate.t(`core.stages.subtitle`)}"</i>
				</p>
			</div>
			<div className="report-description">
				{person.stages.map((s, i) => (
					<div key={s.num}>
						<p>
							<strong>
								{translate.t(`core.stages.calc.stage`, {
									num: s.num,
									from: s.from,
									to: s.to === 0 ? '∞' : s.to
								})}
								{` = `}
							</strong>
							<span className="report-value">{s.value}</span>
						</p>
						<p>{translate.t(`core.stages.report.${s.value}`)}</p>
					</div>
				))}
			</div>
		</div>
	);

	const karmas: JSX.Element = (
		<div className="report-category">
			<div className="report-header">
				<p>
					<span className="report-title">{translate.t(`core.karmas.title`)}</span>
					<br />
					<i className="report-subtitle">"{translate.t(`core.karmas.subtitle`)}"</i>
				</p>
			</div>
			<div className="report-description">
				{Object.keys(person.karmas).map(
					(item, i) =>
						person.karmas[item as keyof TKarma] !== 0 &&
						item !== 'potential' && (
							<div key={`karma-${item}`}>
								<p className="report-value-karma">
									<span className="report-value">{person.karmas[item as keyof TKarma]}</span>
									<span> {translate.t(`core.karmas.calc.part.${i}`)}</span>
								</p>
								<p>
									<strong>{translate.t(`core.karmas.report.aspects.0`)}: </strong>
									<span>
										{translate.t(`core.karmas.report.${person.karmas[item as keyof TKarma]}.0`)}
									</span>
								</p>
								<p>
									<strong>{translate.t(`core.karmas.report.aspects.1`)}: </strong>
									<span>
										{translate.t(`core.karmas.report.${person.karmas[item as keyof TKarma]}.1`)}
									</span>
								</p>
							</div>
						)
				)}
			</div>
			{person.karmas.potential.length > 0 && (
				<div className="report-description extra">
					<p>
						<span className="report-title">{translate.t(`core.karmas.report.potential.title`)}</span>
						<br />
						<i className="report-subtitle">{translate.t(`core.karmas.report.potential.subtitle`)}</i>
					</p>
					{person.karmas.potential.map((item) => (
						<div key={`potential-karma-${item}`}>
							<p className="report-value-karma">
								<span>{translate.t('core.karmas.calc.part.3')} </span>
								<span className="report-value">{item}</span>
							</p>
							<p>
								<strong>{translate.t(`core.karmas.report.aspects.0`)}: </strong>
								<span>{translate.t(`core.karmas.report.potential.${item}.0`)}</span>
							</p>
							<p>
								<strong>{translate.t(`core.karmas.report.aspects.1`)}: </strong>
								<span>{translate.t(`core.karmas.report.potential.${item}.1`)}</span>
							</p>
						</div>
					))}
				</div>
			)}
		</div>
	);

	return (
		<div className="output-report">
			<h4>{translate.t('coutput.report.title')}</h4>
			{numbers}
			{stages}
			{karmas}
			<button className="btn-action contacto" onClick={redirect}>
				{translate.t('coutput.report.contact')}
			</button>
		</div>
	);
};
