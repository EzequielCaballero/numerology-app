import React, { useState }from 'react';
import { useContextSetup } from '../../../../context/setup';
import { SVGSelector } from '../../../../components/svg/selector';
import { useWindowSize, TSize } from '../../../../hooks/windowsize';
import './share.css';

export type TShare = {
    urlShare: string;
    emailInput: string;
    isEmailValid: boolean;
    isEmailSent: boolean;
    isLoading: boolean;
    handleInputEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
    shareResult: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const CalculatorOutputShare: React.FunctionComponent<TShare> = ({ 
    urlShare, emailInput, isEmailValid, isEmailSent, isLoading, handleInputEmail, shareResult }) => {

    const [isEmailSelected, setIsEmailSelected] = useState(false);
    const { translate } = useContextSetup();
    const size: TSize = useWindowSize();

    return(
        <div>
            { !isEmailSelected ?  
                <React.Fragment>
                <p>{translate.t('coutput.modal.share.msg')}</p>
                <div className="output-share-options">
                    <span>
                        <button data-action="share/email" onClick={ () => setIsEmailSelected(true) }>
                            <SVGSelector name="iconEmail" />
                        </button>
                    </span>
                    <span>
                        <a href={`http://www.facebook.com/sharer.php?u=${urlShare}`} target="_blank" rel="noreferrer" data-action="share/facebook">
                            <SVGSelector name="logoFacebook" />
                        </a>
                    </span>
                    <span>
                        <a href={`whatsapp://send?text='Destino numérico | ${urlShare}'`} 
                           target="_blank" rel="noreferrer" data-action="share/whatsapp"
                           style={{display:size.width as number <= 600 ? 'block' : 'none'}}>
                            <SVGSelector name="logoWhatsapp" />
                        </a>
                    </span>
                </div>
                </React.Fragment>
            : 
            <form id="share-form" autoComplete="off" noValidate onSubmit={(e: React.FormEvent<HTMLFormElement>) => shareResult(e)}>
                <label htmlFor="input-share-email">*Email</label>
                <input id="input-share-email" 
                       name="name" 
                       aria-label={translate.t('contact.form.field.0')} 
                       type="text" 
                       placeholder="..."
                       maxLength={30}
                       value={emailInput}
                       onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputEmail(event)}
                       disabled={isLoading}
                /><br/>
                { !isEmailValid && isEmailSent && <i className='input-share-error'>{translate.t('coutput.modal.share.input-error')}</i> }
                <button type="submit" 
                        className="btn-action" 
                        disabled={isLoading} >
                        { isLoading && <SVGSelector name="spinnerRotary" /> }
                        {translate.t('coutput.modal.share.btn')}
                </button>
            </form>
            }
        </div>
    )
}