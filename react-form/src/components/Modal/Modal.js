import React from "react";
import './Modal.css';

const Modal = ({ handleCancelar, handleDelete }) => {
  return(
    <div>
      <div className="modal-background"/>
      <div className="modal-content">
        <h3>Você tem certeza que deseja excluir?</h3>
        <label>Esta ação é irreversível, tem certeza mesmo?</label>
        <div className="modal-buttons">
          <button onClick={handleDelete}>Confirmar</button>
          <button onClick={handleCancelar}>Cancelar</button>
        </div>
      </div>
    </div>
  )
}

export { Modal }