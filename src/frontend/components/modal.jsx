import React, { useEffect } from 'react';
//BOOTSTRAP
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

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
		<Modal show={show} onHide={close} className={style}>
			<Modal.Header>
				<Modal.Title>{title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>{msgText}</Modal.Body>
			<Modal.Footer>
				<Button block variant="secondary" onClick={close}>
					Cerrar
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default ModalMessage;
