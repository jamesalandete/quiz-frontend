import React, { useState } from 'react';
import './modal.component.css'; // Asegúrate de crear el archivo CSS para estilizar el modal

interface ModalProps {
  showModal: boolean,
  children: any;
  closeModal: () => void;
}

const Modal = ({showModal, children, closeModal }: ModalProps) => {
  const hide = () => {
    closeModal()
  }
  return (
    <div className={`modal ${showModal ? 'show' : ''}`}>
      <div className="modal-content">
        <span className="close" onClick={hide}>&times;</span>
        {children}
      </div>
    </div>
  );
};

export default Modal;
