import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Adotar from './pages/Adotar';
import Sobre from './pages/Sobre';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/adotar" element={<Adotar />} />
        <Route path="/sobre" element={<Sobre />} />
      </Routes>
    </div>
  );
}

export default App;