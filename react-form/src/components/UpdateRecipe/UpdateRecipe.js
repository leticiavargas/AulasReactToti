import React, { useEffect, useState } from "react";
import './UpdateRecipe.css';
import { RecipeForm } from "../RecipeForm/RecipeForm";
import { useParams, useNavigate } from 'react-router-dom';

const UpdateRecipe = () => {

  const [recipeInfo, setRecipeInfo] = useState();
  const { recipeId } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:4000/recipes/${recipeId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("retorno do alterar", data);
        setRecipeInfo(data)
      });
  },[recipeId]);

  const handleUpdate = async(recipeData) => {
    const response = await fetch(`http://localhost:4000/recipes/${recipeData.id}`, {
      method: 'PATCH',
      body: JSON.stringify(recipeData),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    });
    if (response.ok) {
      console.log("OKS", response.ok);
      navigate('/');
    } else {
      console.log("ERRO");
    }
  }

  return(
    <div className="container">
      <h1>Alterar Receita</h1>
      <RecipeForm 
        onSubmit={(recipeData) => handleUpdate(recipeData)}
        recipeInfo={recipeInfo}
        buttonTitle="Alterar"
      />
    </div>
  )
}

export { UpdateRecipe }