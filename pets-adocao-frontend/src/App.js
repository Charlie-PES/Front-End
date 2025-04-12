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
import CadastroPet from './pages/user/CadastroPet';
import EditarPerfil from './pages/user/EditarPerfil';
import HistoricoAdocao from './pages/user/HistoricoAdocao';
import PetsFavoritos from './pages/user/PetsFavoritos';
import Faq from './pages/info/Faq';
import ServicoConsumidor from './pages/info/ServicoConsumidor';
import ContateNos from './pages/info/ContateNos';
import PoliticaPrivacidade from './pages/info/PoliticaPrivacidade';
import Inscricoes from './pages/info/Inscricoes';
import Feed from './pages/info/Feed'; // ajuste o caminho se necessário
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
                        <Route path="/editar-perfil" element={<EditarPerfil />} />
                        <Route path="/historico-adocao" element={<HistoricoAdocao />} />
                        <Route path="/favoritos" element={<PetsFavoritos />} />
                        <Route path="/faq" element={<Faq />} />
                        <Route path="/servico-consumidor" element={<ServicoConsumidor />} />
                        <Route path="/contato" element={<ContateNos />} />
                        <Route path="/privacidade" element={<PoliticaPrivacidade />} />
                        <Route path="/inscricoes" element={<Inscricoes />} />
                        <Route path="/feed" element={<Feed />} />
                    </Routes>
                </main>

                <Footer />
            </div>
    );
}

export default App;
