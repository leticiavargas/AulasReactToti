import React, { useEffect, useState } from "react";
import './RecipeForm.css';

const RecipeForm = ({ onSubmit, buttonTitle, recipeInfo }) => {
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [type, setType] = useState(1);
  const [types, setTypes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/types')
      .then((response) => response.json())
      .then(data => setTypes(data));
  }, []);

  useEffect(() => {
    setAuthor(recipeInfo?.author);
    setTitle(recipeInfo?.title);
    setType(recipeInfo?.type);
  }, [recipeInfo])

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      "author": author,
      "title": title,
      "type": type,
    }
    
    if(recipeInfo) {
      data.id = recipeInfo.id;
    }

    onSubmit(data);
  }

  return(
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
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="formRow">
        <label>Escolha o tipo da receita</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          {
            types.map((type) => (
              <option key={type.id} value={type.id}>{type.title}</option>
            ))
          }
        </select>
      </div>
      <button type="submit">{buttonTitle}</button>
    </form>
  )
}

export { RecipeForm }