import React, { useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import './modal.css';

const ModalMessage = (props) => {
	const { title, msg, show, close, style } = props;

	let msgText = msg;
	if (Array.isArray(msg)) {
		msgText = msg.map((text, index) => (
			<div className="modal-text" key={index}>
				{text.trim()}
			</div>
		));
	}

	useEffect(
		() => {
			const bodyElement = document.body;
			if (show) {
				bodyElement.classList.remove('modal-open');
				bodyElement.style = '';
			}
		},
		[ show ]
	);

	return (
		<Modal id="app-modal" show={show} onHide={close} className={style}>
			<Modal.Header id="app-modal-header">
				<Modal.Title id="app-modal-title">{title}</Modal.Title>
			</Modal.Header>
			<Modal.Body id="app-modal-body">{msgText}</Modal.Body>
			<Modal.Footer id="app-modal-footer">
				<button id="app-modal-btn" block variant="secondary" onClick={close}>
					Cerrar
				</button>
			</Modal.Footer>
		</Modal>
	);
};

export default ModalMessage;
