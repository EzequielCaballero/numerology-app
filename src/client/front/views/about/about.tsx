import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { RoutePath } from '../../../back/sitemap/routes';
import { ConsumerSetup } from '../../context/setup';
import { Headline } from '../../components/headline/headline';
import './about.css';

export class About extends React.Component<RouteComponentProps> {

	private goToContact = (): void => {
		this.props.history.push({
			pathname: RoutePath.Contact,
			search: ''
		});
	};

	public render(): React.ReactNode {
		return (
			<div className="box">
				<ConsumerSetup>
					{({ translate }) => (
						<div className="box-content">
							<div className="about-content">
								{/* HEADLINE */}
								<Headline
									title={translate.t('cross.head.title_short')}
									subtitle={translate.t('about.headline.subtitle')}
								/>
								{/* CONTENT */}
								<h5>{translate.t('about.title')}</h5>
								<div className="about-item">
									<input id="check-question-1" type="checkbox" />
									<label className="about-question" htmlFor="check-question-1">
										{translate.t('about.faq.1.question')}
										<span>{'>'}</span>
									</label>
									<div id="about-answer-1" className="about-answer">
										<p>{translate.t('about.faq.1.answer.0')}</p>
										<p>{translate.t('about.faq.1.answer.1')}</p>
										<p>{translate.t('about.faq.1.answer.2')}</p>
										<p>{translate.t('about.faq.1.answer.3')}</p>
									</div>
								</div>
								<div className="about-item">
									<input id="check-question-2" type="checkbox" />
									<label className="about-question" htmlFor="check-question-2">
										{translate.t('about.faq.2.question')}
										<span>{'>'}</span>
									</label>
									<div id="about-answer-2" className="about-answer">
										<p>{translate.t('about.faq.2.answer.0')}</p>
										<p>{translate.t('about.faq.2.answer.1')}</p>
										<p>{translate.t('about.faq.2.answer.2')}</p>
										<p>{translate.t('about.faq.2.answer.3')}</p>
										<p>{translate.t('about.faq.2.answer.4')}</p>
									</div>
								</div>
								<div className="about-item">
									<input id="check-question-3" type="checkbox" />
									<label className="about-question" htmlFor="check-question-3">
										{translate.t('about.faq.3.question')}
										<span>{'>'}</span>
									</label>
									<div id="about-answer-3" className="about-answer">
										<p>{translate.t('about.faq.3.answer.0')}</p>
										<p>
											<strong>{translate.t('core.image.title')}</strong>
											<br />
											<span>{translate.t('core.image.description')}</span>
										</p>
										<p>
											<strong>{translate.t('core.essence.title')}</strong>
											<br />
											<span>{translate.t('core.essence.description')}</span>
										</p>
										<p>
											<strong>{translate.t('core.mission.title')}</strong>
											<br />
											<span>{translate.t('core.mission.description')}</span>
										</p>
										<p>
											<strong>{translate.t('core.natalPath.title')}</strong>
											<br />
											<span>{translate.t('core.natalPath.description')}</span>
										</p>
										<p>
											<strong>{translate.t('core.potentialNumber.title')}</strong>
											<br />
											<span>{translate.t('core.potentialNumber.description')}</span>
										</p>
										<p>
											<strong>{translate.t('core.personalKey.title')}</strong>
											<br />
											<span>{translate.t('core.personalKey.description')}</span>
										</p>
										<p>
											<strong>{translate.t('core.personalYear.title')}</strong>
											<br />
											<span>{translate.t('core.personalYear.description')}</span>
										</p>
										<p>
											<strong>{translate.t('core.personalMonth.title')}</strong>
											<br />
											<span>{translate.t('core.personalMonth.description')}</span>
										</p>
										<p>
											<strong>{translate.t('core.ageDigit.title')}</strong>
											<br />
											<span>{translate.t('core.ageDigit.description')}</span>
										</p>
										<p>
											<strong>{translate.t('core.stages.title')}</strong>
											<br />
											<span>{translate.t('core.stages.description')}</span>
										</p>
										<p>
											<strong>{translate.t('core.karmas.title')}</strong>
											<br />
											<span>{translate.t('core.karmas.description')}</span>
										</p>
									</div>
								</div>
								<div className="about-item">
									<input id="check-question-4" type="checkbox" />
									<label className="about-question" htmlFor="check-question-4">
										{translate.t('about.faq.4.question')}
										<span>{'>'}</span>
									</label>
									<div id="about-answer-4" className="about-answer">
										<p>{translate.t('about.faq.4.answer.0')}</p>
										<p>{translate.t('about.faq.4.answer.1')}</p>
										<table className="about-answer-4-table">
											<tbody>
												<tr>
													<th>1</th>
													<th>2</th>
													<th>3</th>
													<th>4</th>
													<th>5</th>
													<th>6</th>
													<th>7</th>
													<th>8</th>
													<th>9</th>
												</tr>
												<tr>
													<td>A</td>
													<td>B</td>
													<td>C</td>
													<td>D</td>
													<td>E</td>
													<td>F</td>
													<td>G</td>
													<td>H</td>
													<td>I</td>
												</tr>
												<tr>
													<td>J</td>
													<td>K</td>
													<td>L</td>
													<td>M</td>
													<td>N</td>
													<td>O</td>
													<td>P</td>
													<td>Q</td>
													<td>R</td>
												</tr>
												<tr>
													<td>S</td>
													<td>T</td>
													<td>U</td>
													<td>V</td>
													<td>W</td>
													<td>X</td>
													<td>Y</td>
													<td>Z</td>
													<td> </td>
												</tr>
											</tbody>
										</table>
										<br />
										<p>{translate.t('about.faq.4.answer.2')}</p>
									</div>
								</div>
								<div className="about-item">
									<input id="check-question-5" type="checkbox" />
									<label className="about-question" htmlFor="check-question-5">
										{translate.t('about.faq.5.question')}
										<span>{'>'}</span>
									</label>
									<div id="about-answer-5" className="about-answer">
										<p>{translate.t('about.faq.5.answer.0')}</p>
										<p>{translate.t('about.faq.5.answer.1')}</p>
										<p>
											{translate.t('about.faq.5.answer.2')}
										</p>
										<button className="btn-action contacto" onClick={this.goToContact}>
											{translate.t('about.faq.5.answer.3')}
										</button>
									</div>
								</div>
							</div>
						</div>
					)}
				</ConsumerSetup>
			</div>
		);
	}
}
