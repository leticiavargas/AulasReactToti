import React, { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [showModal, setShowModal] = useState(false);
  const [receitaToDelete, setReceitaToDelete] = useState();
  const [author, setAuthor] = useState('');
  const [recipe, setRecipe] = useState('');
  const [listaReceitas, setListaReceitas] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      "author": author,
	    "title": recipe,
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

  console.log("LISTA DE RECEITAS", listaReceitas);
  return (
    <div className="App">
      <form onSubmit={handleSubmit} >
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
        <button type="submit">Cadastrar</button>
      </form>
      <div>
        <ul>
          {listaReceitas?.map((receita) => {
            return (
              <li key={receita.id}>
                {receita.id} - {receita.title} 
                <button onClick={() => onDelete(receita.id)}>Excluir</button>
              </li>
            )
          })}
        </ul>
      </div>
      {
        showModal &&
        <div className="modal">
          <h3>Você tem certeza que deseja excluir?</h3>
          <button onClick={handleDelete}>Confirmar</button>
          <button onClick={handleCancelar}>Cancelar</button>
        </div>
      }
      
    </div>
  );
}

export default App;
