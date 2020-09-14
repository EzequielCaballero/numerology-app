import React from 'react';
import { IPerson, TNumbers } from '../../../../../back/entity/iperson';
import { TRecord } from '../../../../../back/services/core/calculator';
import { useContextSetup } from '../../../../context/setup';
import './record.css';

type TProps = {
	person: IPerson;
	record: TRecord;
};

export const CalculatorOutputRecord: React.FunctionComponent<TProps> = ({ person, record }) => {
	const { translate } = useContextSetup();

	const getNumbersDetail = (key: string): Array<JSX.Element> => {
		let text: string[] = [];
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
					`${person.birth.day} + ${person.birth.month} + ${new Date().getFullYear()} = ${person.numbers
						.personalYear}`
				);
				break;
			case 'personalMonth':
				text.push(
					`${person.numbers.personalYear} + ${new Date().getMonth() + 1} = ${person.numbers.personalMonth}`
				);
				break;
			case 'ageDigit':
				text.push(`${person.age} + ${person.age + 1} = ${person.numbers.ageDigit}`);
				break;
			default:
				break;
		}
		return text.map((t, index) => <p key={index}>{t.trim()}</p>);
	};

	const numbers: Array<JSX.Element> = Object.keys(person.numbers).map((item) => (
		<div key={item}>
			<input type="checkbox" name="check-record-item" id={`check-record-item-${item}`} />
			<div className="output-record-item">
				<span className="record-title">{translate.t(`coutput.record.detail.${item}.name`)}</span>
				<span className="record-value">{person.numbers[item as keyof TNumbers]}</span>
				<span>
					<label className="record-expand" htmlFor={`check-record-item-${item}`}>
						{'>'}
					</label>
				</span>
			</div>
			<div id={`record-detail-${item}`} className="output-record-detail">
				<i>*{translate.t(`coutput.record.detail.${item}.msg`)}</i>
				{getNumbersDetail(item)}
			</div>
		</div>
	));

	const stages: JSX.Element = (
		<div>
			<input type="checkbox" name="check-record-item" id="check-record-item-stages" />
			<div className="output-record-item">
				<span className="record-title">{translate.t('coutput.record.detail.stages.name')}</span>
				<span className="record-value">***</span>
				<span>
					<label className="record-expand" htmlFor="check-record-item-stages">
						{'>'}
					</label>
				</span>
			</div>
			<div id="record-detail-stages" className="output-record-detail">
				<i>*{translate.t('coutput.record.detail.stages.base')}</i>
				<br />
				<i>*{translate.t('coutput.record.detail.stages.total')}</i>
				<br />
				<i>*{translate.t('coutput.record.detail.stages.duration')}</i>
				<br />
				<i>*{translate.t('coutput.record.detail.stages.start')}</i>
				<br />
				<br />
				{person.stages.map((s, i) => (
					<p key={s.num}>
						<span>
							{translate.t(`coutput.record.detail.stages.stage`, {
								num: s.num,
								from: s.from,
								to: s.to === 0 ? '∞' : s.to,
								result: s.value
							})}
						</span>
						<br />
						<i>{translate.t(`coutput.record.detail.stages.result.${i}`)}</i>
					</p>
				))}
			</div>
		</div>
	);

	const karmas: JSX.Element = (
		<div>
			<input type="checkbox" name="check-record-item" id="check-record-item-karmas" />
			<div className="output-record-item">
				<span className="record-title">{translate.t('coutput.record.detail.karmas.name')}</span>
				<span className="record-value">***</span>
				<span>
					<label className="record-expand" htmlFor="check-record-item-karmas">
						{'>'}
					</label>
				</span>
			</div>
			<div id="record-detail-karmas" className="output-record-detail">
				<i>*{translate.t('coutput.record.detail.karmas.msg')}</i>
				{person.karmas.essence !== 0 || person.karmas.mission !== 0 || person.karmas.path !== 0 ? (
					<p>
						{translate.t('coutput.record.detail.karmas.part.0')}: <span>{person.karmas.essence}</span>
						<br />
						{translate.t('coutput.record.detail.karmas.part.1')}: <span>{person.karmas.mission}</span>
						<br />
						{translate.t('coutput.record.detail.karmas.part.2')}: <span>{person.karmas.path}</span>
					</p>
				) : (
					<p>
						<strong>{translate.t('coutput.record.detail.karmas.k_empty')}</strong>
					</p>
				)}

				<i>*{translate.t('coutput.record.detail.karmas.extra')}</i>
				<p>
					{translate.t('coutput.record.detail.karmas.part.3')}:{' '}
					<span>
						{person.karmas.possible.length > 0 ? (
							person.karmas.possible.join(', ')
						) : (
							translate.t('coutput.record.detail.karmas.pk_empty')
						)}
					</span>
				</p>
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
				<button
					aria-label={translate.t('coutput.record.action.expand')}
					title={translate.t('coutput.record.action.expand')}
					onClick={() => switchChecksStatus(true)}
				>
					<span>{'<>'}</span>
				</button>
				<button
					aria-label={translate.t('coutput.record.action.collapse')}
					title={translate.t('coutput.record.action.collapse')}
					onClick={() => switchChecksStatus(false)}
				>
					<span>{'><'}</span>
				</button>
			</div>
			{numbers}
			{stages}
			{karmas}
		</div>
	);
};
