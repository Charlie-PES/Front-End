import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import Adotar from './pages/Adotar';
import Sobre from './pages/Sobre';
import Cadastro from './pages/Cadastro';
import PetMatch from './pages/PetMatch';
import PetPage from './pages/PetPage';
import Mapa from './pages/Mapa';
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
                    </Routes>
                </main>

                <Footer />
            </div>
    );
}

export default App;
