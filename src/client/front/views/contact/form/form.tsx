import React from 'react';
import { useContextSetup } from '../../../context/setup';
import { SVGSelector } from '../../../components/svg/selector';
import './form.css';

export type TContact = {
    name: string,
    email: string,
    message: string
}

export type TForm = {
    valid: [boolean, boolean, boolean]
    submitted: boolean,
    sent: boolean,
    received: boolean
}

type TProps = {
    contact: TContact,
    form: TForm,
    handleInput: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const ContactForm: React.FunctionComponent<TProps> = ({ contact, form, handleInput, handleSubmit }) => {
    const { translate } = useContextSetup();
    return (
        <form id="contact-form" autoComplete="off" noValidate onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}>
			{/* NAME */}
			<div>
                
                <input id="input-contact-name" 
                       name="name" 
                       aria-label={translate.t('contact.form.field.0')} 
                       type="text" 
                       placeholder="..." 
                       value={contact.name}
                       maxLength={30}
                       onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInput(event)}
                       required
                />
                <label className="lbl-input-contact" htmlFor="input-contact-name">*{translate.t('contact.form.field.0')}</label>
                {
                    contact.name !== "" && (!form.valid[0] && form.submitted) && (
                        <label className="lbl-input-contact-error">{translate.t('contact.form.error.0')}</label>
                    )
                }
            </div>
            
			{/* EMAIL */}
			<div>
                <input id="input-contact-email" 
                       name="email" 
                       aria-label={translate.t('contact.form.field.1')} 
                       type="text" 
                       placeholder="..." 
                       value={contact.email}
                       maxLength={40}
                       onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInput(event)} 
                       required
                />
                <label className="lbl-input-contact" htmlFor="input-contact-email">*{translate.t('contact.form.field.1')}</label>
                {
                    contact.email !== "" && (!form.valid[1] && form.submitted) && (
                        <label className="lbl-input-contact-error">{translate.t('contact.form.error.1')}</label>
                    )
                }
            </div>
			{/* MESSAGE */}
			<div>
                
                <textarea id="input-contact-message" 
                          name="message" 
                          aria-label={translate.t('contact.form.field.2')} 
                          rows={2}
                          placeholder="..." 
                          value={contact.message}
                          maxLength={120}
                          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => handleInput(event)} 
                          required
                />
                <label className="lbl-input-contact" htmlFor="input-contact-message">*{translate.t('contact.form.field.2')}</label>
                {
                    contact.message !== "" && (!form.valid[2] && form.submitted) && (
                        <label className="lbl-input-contact-error">{translate.t('contact.form.error.0')}</label>
                    )
                }
            </div>
            
			{/* SUBMIT */}
            <button type="submit" 
                    className="btn-action contact" 
                    disabled={
                        (contact.name === "" || contact.email === "" || contact.message === "") ||
                        (form.submitted && (!form.valid[0] || !form.valid[1] || !form.valid[2])) ||
                        form.sent
                    }
            >
                { form.sent && !form.received && <SVGSelector name="spinnerRotary" /> }
                {translate.t('contact.form.btn')}
            </button>
		</form>
    )
}