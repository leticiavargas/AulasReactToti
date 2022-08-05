import React, { useEffect, useState } from 'react';
import { Modal, RecipeInfo } from './components';
import './App.css';

function App() {

  const [showModal, setShowModal] = useState(false);
  const [receitaToDelete, setReceitaToDelete] = useState();
  const [author, setAuthor] = useState('');
  const [recipe, setRecipe] = useState('');
  const [recipeType, setRecipeType] = useState('bolos');
  const [listaReceitas, setListaReceitas] = useState();
  const [isUpdate, setIsUpdate] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      "author": author,
	    "title": recipe,
      "type": recipeType,
    }
    console.log("data", data);
    const response = await fetch('http://localhost:4000/recipes/', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    });
    if (response.ok) {
      console.log("OKS", response.ok);
      fetchAll();
    }
    else 
      console.log("ERRO");
  }

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

  const onUpdate = (receitaId) => {
    fetch(`http://localhost:4000/recipes/${receitaId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("retorno do alterar", data);
        setIsUpdate(receitaId);
        setAuthor(data.author);
        setRecipe(data.title);
        setRecipeType(data.type);
      });
  }

  const handleUpdate = async() => {
    const receitaId = isUpdate;
    const response = await fetch(`http://localhost:4000/recipes/${receitaId}`, {
      method: 'PATCH',
      body: JSON.stringify({
        author: author,
	      title: recipe,
        type: recipeType,
      }),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    });
    if (response.ok) {
      console.log("OKS", response.ok);
      setIsUpdate(undefined);
      setAuthor('');
      setRecipe('');
      fetchAll();
    } else {

    }
  }

  return (
    <div className="App">
      <form onSubmit={isUpdate ? handleUpdate : handleSubmit} >
        <div className="formRow">
          <label>Nome do autor</label>
          <input 
            type="text" 
            value={author} 
            onChange={(e) => setAuthor(e.target.value)} 
          />
        </div>
        <div className="formRow">
          <label>Nome da receita</label>
          <input type="text"
            value={recipe}
            onChange={(e) => setRecipe(e.target.value)}
          />
        </div>
        <div className="formRow">
          <label>Escolha o tipo da receita</label>
          <select value={recipeType} onChange={(e) => setRecipeType(e.target.value)}>
            <option value="bolos">Bolos</option>
            <option value="lanches">Lanches</option>
            <option value="sobremesas">Sobremesas</option>
            <option value="caldos">Caldos</option>
          </select>
        </div>
        <button type="submit">{isUpdate ? "Alterar" : "Cadastrar"}</button>
      </form>
      <div className="recipes-list">
        <h3> Lista de Receitas </h3>
        <ul>
          {listaReceitas?.map((receita, index) => {
            return (
              <RecipeInfo 
                key={receita.id}
                receita={receita}
                index={index}
                onDelete={(id) => onDelete(id)}
                onUpdate={(id) => onUpdate(id)}
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
  );
}

export default App;
