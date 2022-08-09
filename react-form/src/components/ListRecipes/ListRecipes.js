import React, { useState, useEffect } from "react";
import { Modal, RecipeInfo } from '../index';
import './ListRecipes.css';
import { useNavigate } from 'react-router-dom';

const ListRecipes = () => {

  const [listaReceitas, setListaReceitas] = useState();
  const [showModal, setShowModal] = useState(false);
  const [receitaToDelete, setReceitaToDelete] = useState();
  let navigate = useNavigate();

  function fetchAll() {
    fetch('http://localhost:4000/recipes')
      .then((response) => response.json())
      .then(data => setListaReceitas(data));
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleDelete = async () => {
    const response = await fetch('http://localhost:4000/recipes/'+ receitaToDelete, {
      method: 'DELETE',
    })
    if (response.ok) {
      alert("Deletado com sucesso");
      fetchAll();
    }
    setShowModal(false);
  }

  const onDelete = (receitaId) => {
    setReceitaToDelete(receitaId);
    setShowModal(true);
  }

  const handleCancelar = () => {
    setReceitaToDelete('');
    setShowModal(false);
  }

  return(
    <div className="container">
      <div className="recipesList">
        <h1> Lista de Receitas </h1>
        <ul>
          {listaReceitas?.map((receita, index) => {
            return (
              <RecipeInfo 
                key={receita.id}
                receita={receita}
                index={index}
                onDelete={(id) => onDelete(id)}
                onUpdate={() => navigate(`/recipe/${receita.id}`)}
              />
            )
          })}
        </ul>
      </div>
      {
        showModal &&
        <Modal 
          handleCancelar={handleCancelar}
          handleDelete={handleDelete}
        />
      }
    </div>
  )
}

export { ListRecipes }