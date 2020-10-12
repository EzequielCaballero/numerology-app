import React from 'react';
import { ConsumerSetup } from '../../context/setup';
import { Headline } from '../../components/headline/headline';
import { SVGSelector } from '../../components/svg/selector';
import './contact.css';

export class Contact extends React.Component {
	public render(): React.ReactNode {
		return (
			<div className="box">
				<ConsumerSetup>
					{({ translate }) => (
						<div className="box-content">
							<div className="contact-content">
								{/* HEADLINE */}
								<Headline
									title={translate.t('cross.head.title_short')}
									subtitle={translate.t('contact.headline.subtitle')}
								/>
								{/* CONTENT */}
								<div className="contact-header">
									<h4>{`${translate.t('contact.title')} 👋`}</h4>
									<span>{translate.t('contact.subtitle.0')}</span>
								</div>
								<div className="contact-msg">
									<p>{translate.t('contact.subtitle.1')}</p>
									<p>
										<i>{translate.t('contact.msg.0')}</i>
									</p>
									<p>
										<span>{translate.t('contact.msg.1')} </span>
										<a href={`mailto:${translate.t('contact.email')}`}>
											{' '}
											<strong>{translate.t('contact.email')}</strong>
											<br />
											<SVGSelector name="iconEmail" />
										</a>
									</p>
									<p>
										<i>*{translate.t('contact.msg.2')}</i>
									</p>
								</div>
							</div>
						</div>
					)}
				</ConsumerSetup>
			</div>
		);
	}
}
