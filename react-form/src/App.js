import React, { useEffect, useState } from 'react';
import './App.css';
import { 
  BrowserRouter,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import { ListRecipes } from './components/ListRecipes/ListRecipes';
import { CreateRecipe } from './components/CreateRecipe/CreateRecipe';
import { UpdateRecipe } from './components/UpdateRecipe/UpdateRecipe';
import { NotFound } from './components/NotFound/NotFound';

function App() {

  return (
    <BrowserRouter>
      <nav id="upMenu">
        <div className="containerMenu">
          <ul>
            <li><Link to="/">Início</Link></li>
            <li><Link to="/createRecipe">Nova Receita</Link></li>
            <li><Link to="/createType">Nova Categoria</Link></li>
          </ul>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<ListRecipes />}/>
          <Route path="/createType" element={<ListRecipes />} />
          <Route path="/createRecipe" element={<CreateRecipe /> } />
          <Route path="/recipe/:recipeId" element={<UpdateRecipe />} />
          <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
