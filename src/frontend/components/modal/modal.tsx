import React, { useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import './modal.css';

export type TModal = {
	text: {
		title: string;
		msg: string[];
	};
	properties: {
		show: boolean;
	};
	showModal: (show: boolean) => void;
};

const ModalMessage: React.FunctionComponent<TModal> = ({ text, properties, showModal }) => {
	const renderDivMsgs = (): Array<JSX.Element> => {
		return text.msg.map((text, index) => (
			<div className="modal-text" key={index}>
				{text.trim()}
			</div>
		));
	};

	useEffect(
		() => {
			const bodyElement: HTMLElement = document.body;
			if (properties.show) {
				bodyElement.classList.remove('modal-open');
				bodyElement.removeAttribute('style');
			}
		},
		[ properties.show ]
	);

	return (
		<Modal id="app-modal" show={properties.show} onHide={() => showModal(false)}>
			<Modal.Header id="app-modal-header">
				<Modal.Title id="app-modal-title">{text.title}</Modal.Title>
			</Modal.Header>
			<Modal.Body id="app-modal-body">{renderDivMsgs()}</Modal.Body>
			<Modal.Footer id="app-modal-footer">
				<button id="app-modal-btn" className="btn-action-outline" onClick={() => showModal(false)}>
					Cerrar
				</button>
			</Modal.Footer>
		</Modal>
	);
};

export default ModalMessage;
