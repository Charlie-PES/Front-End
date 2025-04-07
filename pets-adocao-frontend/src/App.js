import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import Adotar from './pages/Adotar';
import Sobre from './pages/Sobre';
import Cadastro from './pages/Cadastro';
//import './App.css';

function App() {
    return (
        <div className="App">
            <Header />

            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/adotar" element={<Adotar />} />
                <Route path="/sobre" element={<Sobre />} />
                <Route path="/cadastro" element={<Cadastro />} />
            </Routes>

            <Footer />
        </div>
    );
}

export default App;
