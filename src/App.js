import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import BackButton from './components/BackButton/BackButton';
import Home from './pages/info/Home/Home';
import Adotar from './pages/pet/Adotar/Adotar';
import Sobre from './pages/info/Sobre/Sobre';
import Cadastro from './pages/auth/Cadastro';
import Login from './pages/Login';
import PetMatch from './pages/pet/PetMatch/PetMatch';
import PetPage from './pages/pet/PetPage/PetPage';
import Mapa from './pages/info/Mapa/Mapa';
import Perfil from './pages/user/Perfil/Perfil';
import Acompanhamento from './pages/user/Acompanhamento/Acompanhamento';
import CadastroPet from './pages/user/CadastroPet/CadastroPet';
import EditarPerfil from './pages/user/EditarPerfil/EditarPerfil';
import HistoricoAdocao from './pages/user/HistoricoAdocao/HistoricoAdocao';
import PetsFavoritos from './pages/user/PetsFavoritos/PetsFavoritos';
import Faq from './pages/ExFooter/Faq/Faq';
import ServicoConsumidor from './pages/ExFooter/ServicoConsumidor/ServicoConsumidor';
import ContateNos from './pages/ExFooter/ContateNos/ContateNos';
import PoliticaPrivacidade from './pages/ExFooter/PoliticaPrivacidade/PoliticaPrivacidade';
import Feed from './pages/info/Feed/Feed';
import Depoimentos from './pages/ExFooter/Depoimentos/Depoimentos';
import Apoiadores from './pages/ExFooter/Apoiadores/Apoiadores';
import MatchPage from './pages/user/MatchPage/MatchPage';
import AdminPage from './pages/admin/AdminPage';
import { AuthProvider } from './contexts/AuthContext';
import OngProfile from './pages/ong/OngProfile/OngProfile';
import DirectMessages from './components/DirectMessages/DirectMessages';
import AccountType from './pages/auth/AccountType/AccountType';
import AddPet from './pages/pet/AddPet/AddPet';
import Doacoes from './pages/info/Doacoes/Doacoes';
import './App.css';

function App() {
    return (
        <AuthProvider>
            <div className="App">
                <Header />
                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/adotar" element={<Adotar />} />
                        <Route path="/sobre" element={<Sobre />} />
                        <Route path="/account-type" element={<AccountType />} />
                        <Route path="/register/:type" element={<Cadastro />} />
                        <Route path="/login" element={<Login />} />
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
                        <Route path="/feed" element={<Feed />} />
                        <Route path="/depoimentos" element={<Depoimentos />} />
                        <Route path="/apoiadores" element={<Apoiadores />} />
                        <Route path="/matchpage" element={<MatchPage />} />
                        <Route path="/admin" element={<AdminPage />} />
                        <Route path="/ong/perfil" element={<OngProfile />} />
                        <Route path="/messages" element={<DirectMessages />} />
                        <Route path="/pets/add" element={<CadastroPet />} />
                        <Route path="/doacoes" element={<Doacoes />} />
                    </Routes>
                </main>
                <BackButton />
                <Footer />
            </div>
        </AuthProvider>
    );
}

export default App;
