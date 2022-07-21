import React from "react";
import ListRow from "../ListRow/ListRow";
import './List.css';

function List(props) {

  console.log("PROPRIEDADES DA LISTA", props);
  //props.produtos
  return(
    <div className="listContainer">
      <h3>Lista</h3>
      {
        props.produtos.map(function(produto) {
          const valorTotal = produto.quantidade * produto.valor;
          return (
            <ListRow 
              nome={produto.nome} 
              valorTotal={valorTotal}
              imagem={produto.imagem}
            />
          )
        })
      }
    </div>
  )
}

export default List;