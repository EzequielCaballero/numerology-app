import React from "react";
//BOOTSTRAP
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const ModalMessage = props => {
  const { modalTitle, modalText, modalType, showModal, handleClose } = props;

  return (
    <Modal show={showModal} className={modalType}>
      <Modal.Header>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{modalText}</Modal.Body>
      <Modal.Footer>
        <Button block variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalMessage;
