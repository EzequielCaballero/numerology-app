import React, { useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useContextSetup } from '../../context/setup';
import './modal.css';

export type TModal = {
	properties: {
		type: string;
		isActive: boolean;
		isInteractive: boolean;
		actionIdentifier?: string;
	};
	action: (response: boolean, identifier?: string) => void;
};

export const ModalDialog: React.FunctionComponent<TModal> = ({ children, properties, action }) => {
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
		<Modal id="app-modal" show={properties.isActive} onHide={() => action(false)}>
			<Modal.Body id="app-modal-body">{children}</Modal.Body>
			<Modal.Footer id="app-modal-footer">
				<button id="app-modal-btn-cancel" className="btn-action-outline" onClick={() => action(false)}>
					{properties.isInteractive ? translate.t('modal.btn.cancel') : translate.t('modal.btn.close')}
				</button>
				{properties.isInteractive && (
					<button
						id="app-modal-btn-accept"
						className="btn-action"
						onClick={() => action(true, properties.actionIdentifier)}
					>
						{translate.t('modal.btn.accept')}
					</button>
				)}
			</Modal.Footer>
		</Modal>
	);
};
