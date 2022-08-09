import React, { useState } from "react";
import './CreateRecipe.css';
import { RecipeForm } from '../RecipeForm/RecipeForm';
import { useNavigate } from 'react-router-dom';

const CreateRecipe = () => {

  let navigate = useNavigate();

  const onSubmit = async (recipeData) => {
    
    const response = await fetch('http://localhost:4000/recipes/', {
      method: 'POST',
      body: JSON.stringify(recipeData),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    });
    if (response.ok) {
      console.log("OKS", response.ok);
      navigate('/');
    }
    else 
      console.log("ERRO");
  }

  return(
    <div className="container createRecipe">
      <h1>Cadastrar Nova Receita</h1>
      <RecipeForm
        onSubmit={(recipeData) => onSubmit(recipeData)}
        buttonTitle="Cadastrar"
      />
    </div>
  )
}

export { CreateRecipe }