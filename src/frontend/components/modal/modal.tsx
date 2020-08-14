import React, { useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import './modal.css';

export type TModal = {
	text: {
		title: string;
		msg: string[];
	};
	properties: {
		isActive: boolean;
		isInteractive: boolean;
		actionIdentifier?: string;
	};
	action: (response: boolean, identifier?: string) => void;
};

const ModalMessage: React.FunctionComponent<TModal> = ({ text, properties, action }) => {
	const formatTextContent = (): Array<JSX.Element> => {
		return text.msg.map((text, index) => (
			<div className="modal-text" key={index}>
				{text.trim()}
			</div>
		));
	};

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
			<Modal.Header id="app-modal-header">
				<Modal.Title id="app-modal-title">{text.title}</Modal.Title>
			</Modal.Header>
			<Modal.Body id="app-modal-body">{formatTextContent()}</Modal.Body>
			<Modal.Footer id="app-modal-footer">
				<button id="app-modal-btn-cancel" className="btn-action-outline" onClick={() => action(false)}>
					{properties.isInteractive ? 'Cancelar' : 'Cerrar'}
				</button>
				{properties.isInteractive && (
					<button
						id="app-modal-btn-accept"
						className="btn-action"
						onClick={() => action(true, properties.actionIdentifier)}
					>
						Aceptar
					</button>
				)}
			</Modal.Footer>
		</Modal>
	);
};

export default ModalMessage;
