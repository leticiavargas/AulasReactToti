import React from "react";
import './ListRow.css';

function ListRow (props) {
  return(
    <div className="listRowContainer">
      <div className="listName">
        <label>{`Nome: ${props.nome}`}</label>
        <label>{`Valor: ${props.valorTotal}`}</label>
      </div>
      <img src={props.imagem} width={100} />
    </div>
  )
}

export default ListRow;