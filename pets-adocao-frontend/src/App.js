import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/info/Home/Home';
import Adotar from './pages/pet/Adotar/Adotar';
import Sobre from './pages/info/Sobre/Sobre';
import Cadastro from './pages/auth/Cadastro';
import PetMatch from './pages/pet/PetMatch/PetMatch';
import PetPage from './pages/pet/PetPage/PetPage';
import Mapa from './pages/info/Mapa/Mapa';
import Perfil from './pages/user/Perfil/Perfil';
import Acompanhamento from './pages/user/Acompanhamento/Acompanhamento';
import CadastroPet from './pages/user/CadastroPet/CadastroPet';
import EditarPerfil from './pages/user/EditarPerfil/EditarPerfil';
import HistoricoAdocao from './pages/user/HistoricoAdocao/HistoricoAdocao';
import PetsFavoritos from './pages/user/PetsFavoritos/PetsFavoritos';
import Faq from './pages/info/Faq/Faq';
import ServicoConsumidor from './pages/info/ServicoConsumidor/ServicoConsumidor';
import ContateNos from './pages/info/ContateNos/ContateNos';
import PoliticaPrivacidade from './pages/info/PoliticaPrivacidade/PoliticaPrivacidade';
import Inscricoes from './pages/info/Inscricoes/Inscricoes';
import Feed from './pages/info/Feed/Feed';
import Depoimentos from './pages/info/Depoimentos/Depoimentos'; 
import Apoiadores from './pages/info/Apoiadores/Apoiadores'; 
import MatchPage from './pages/user/MatchPage/MatchPage';
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
                        <Route path="/depoimentos" element={<Depoimentos />} />
                        <Route path="/apoiadores" element={<Apoiadores />} />
                        <Route path="/matchpage" element={<MatchPage />} />
                    </Routes>
                </main>

                <Footer />
            </div>
    );
}

export default App;
