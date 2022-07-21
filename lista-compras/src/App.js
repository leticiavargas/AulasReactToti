import './App.css';
import List from './components/List/List';

const FRUTAS = [
  {
    nome: "morango",
    quantidade: 92,
    valor: 7,
    imagem: "https://super.abril.com.br/wp-content/uploads/2018/07/55c5099882bee117c10b9aaathinkstockphotos-1768304931.jpeg?quality=90&strip=info&resize=850,567"
  },
  {
    nome: "abacaxi",
    quantidade: 50,
    valor: 3,
    imagem: "https://sportlife.com.br/wp-content/uploads/2021/11/abacaxi-1-832x520.jpg"
  },
  {
    nome: "manga",
    quantidade: 43,
    valor: 2,
    imagem: "https://s4.static.brasilescola.uol.com.br/be/2022/01/manga.jpg"
  }
] 


function App() {
  return (
    <div className="App">
      <List produtos={FRUTAS} />
    </div>
  );
}

export default App;
