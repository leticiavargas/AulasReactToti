import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  const [contador, setContador] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div className='testing'>
        <span>Contador Toter</span>
        <span className='result'>{contador}</span>
        <div className='buttonRow'>
          <button onClick={() => setContador(contador - 1)}>-</button>
          <button onClick={() => setContador(contador + 1)}>+</button>
        </div>
      </div>
    </div>
  );
}

export default App;
