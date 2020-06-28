import React, { useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import './modal.css';

const ModalMessage = (props) => {
	const { text, properties, showModal } = props;

	let msgText = text.msg;
	if (Array.isArray(text.msg)) {
		msgText = text.msg.map((text, index) => (
			<div className="modal-text" key={index}>
				{text.trim()}
			</div>
		));
	}

	useEffect(
		() => {
			const bodyElement = document.body;
			if (properties.show) {
				bodyElement.classList.remove('modal-open');
				bodyElement.style = '';
			}
		},
		[ properties.show ]
	);

	return (
		<Modal id="app-modal" show={properties.show} onHide={() => showModal(false)}>
			<Modal.Header id="app-modal-header">
				<Modal.Title id="app-modal-title">{text.title}</Modal.Title>
			</Modal.Header>
			<Modal.Body id="app-modal-body">{msgText}</Modal.Body>
			<Modal.Footer id="app-modal-footer">
				<button id="app-modal-btn" className="btn-action-outline" onClick={() => showModal(false)}>
					Cerrar
				</button>
			</Modal.Footer>
		</Modal>
	);
};

export default ModalMessage;
