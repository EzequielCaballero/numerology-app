import React from 'react';
import { ConsumerSetup } from '../../context/setup';
import { SVGSelector } from '../../components/svg/selector';
import './contact.css';

export class Contact extends React.Component {
	public render(): React.ReactNode {
		return (
			<div className="box">
				<ConsumerSetup>
					{({ translate }) => (
						<div className="box-content">
							<div className="contact-header">
								<a href={`mailto:${translate.t('contact.email')}`}>
									{' '}
									<SVGSelector name="iconEmail" />
								</a>
								<h4>{`${translate.t('contact.title')} 👋`}</h4>
								<span>{translate.t('contact.subtitle.0')}</span>
							</div>
							<div className="contact-content">
								<p>{translate.t('contact.subtitle.1')}</p>
								<p>
									<i>{translate.t('contact.msg.0')}</i>
								</p>
								<p>
									<span>{translate.t('contact.msg.1')} </span>
									<a href={`mailto:${translate.t('contact.email')}`}>
										{' '}
										<strong>{translate.t('contact.email')}</strong>
									</a>
								</p>
								<p>
									<i>*{translate.t('contact.msg.2')}</i>
								</p>
							</div>
						</div>
					)}
				</ConsumerSetup>
			</div>
		);
	}
}
