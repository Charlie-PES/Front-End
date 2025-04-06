import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import Adotar from './pages/Adotar';
import Sobre from './pages/Sobre';
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/adotar" element={<Adotar />} />
                    <Route path="/sobre" element={<Sobre />} />
                </Routes>
                <Footer />  {}
            </div>
        </Router>
    );
}

export default App;
