import React, { useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useContextSetup } from '../../context/setup';
import './modal.css';

export type TModal = {
	type: string;
	isActive: boolean;
	isActionRequired: boolean;
	actionKey?: string;
};

type TProps = {
	properties: TModal;
	callBack: (response: boolean, actionKey?:string) => void;
}

export const ModalDialog: React.FunctionComponent<TProps> = ({ children, properties, callBack }) => {
	const { translate } = useContextSetup();

	useEffect(
		() => {
			const bodyElement: HTMLElement = document.body;
			if (properties.isActive) {
				bodyElement.classList.remove('modal-open');
				bodyElement.removeAttribute('style');
			}
		},
		[ properties.isActive ]
	);

	return (
		<Modal id="app-modal" show={properties.isActive} onHide={() => callBack(false)}>
			<Modal.Body id="app-modal-body">{children}</Modal.Body>
			<Modal.Footer id="app-modal-footer">
				<button id="app-modal-btn-cancel" className="btn-action-outline" onClick={() => callBack(false)}>
					{properties.isActionRequired ? (
						translate.t('cross.modal.btn.cancel')
					) : (
						translate.t('cross.modal.btn.close')
					)}
				</button>
				{properties.isActionRequired && (
					<button
						id="app-modal-btn-accept"
						className="btn-action"
						onClick={() => callBack(true, properties.actionKey)}
					>
						{translate.t('cross.modal.btn.accept')}
					</button>
				)}
			</Modal.Footer>
		</Modal>
	);
};
