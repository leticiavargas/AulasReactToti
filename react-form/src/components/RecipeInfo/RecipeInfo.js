import React from "react";
import './RecipeInfo.css';

const RecipeInfo = ({ receita, index, onDelete, onUpdate }) => {
  return (
    <li style={{ backgroundColor: index%2 ? '#FFFFFF' : '#F7E7FF' }}>
      <span>{receita.id} - {receita.title}</span>
      <button onClick={() => onDelete(receita.id)}>Excluir</button>
      <button onClick={() => onUpdate(receita.id)}>Alterar</button>
    </li>
  )
}

export { RecipeInfo }