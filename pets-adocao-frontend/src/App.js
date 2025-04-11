import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/info/Home';
import Adotar from './pages/pet/Adotar';
import Sobre from './pages/info/Sobre';
import Cadastro from './pages/auth/Cadastro';
import PetMatch from './pages/pet/PetMatch';
import PetPage from './pages/pet/PetPage';
import Mapa from './pages/info/Mapa';
import Perfil from './pages/user/Perfil';
import Acompanhamento from './pages/user/Acompanhamento';
import CadastroPet from './pages/CadastroPet'; // ajuste o caminho se necessário
import './App.css'; // Certifique-se de ter o CSS abaixo

function App() {
    return (
            <div className="app-container">
                <Header />

                <main className="content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/adotar" element={<Adotar />} />
                        <Route path="/sobre" element={<Sobre />} />
                        <Route path="/cadastro" element={<Cadastro />} />
                        <Route path="/match/:id" element={<PetMatch />} />
                        <Route path="/pet/:id" element={<PetPage />} />
                        <Route path="/mapa" element={<Mapa />} />
                        <Route path="/perfil" element={<Perfil />} />
                        <Route path="/acompanhamento" element={<Acompanhamento />} />
                        <Route path="/cadastro-pet" element={<CadastroPet />} />
                    </Routes>
                </main>

                <Footer />
            </div>
    );
}

export default App;
