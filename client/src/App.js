// src/App.js
// teste miruna
// teste 2
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage'; // Importe o HomePage
import CadastroPage from './pages/CadastroPage';
import LoginPage from './pages/LoginPage';
import HospedagemPage from './pages/HospedagemPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<HomePage />} /> {/* Altere a rota inicial para HomePage */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/cadastro" element={<CadastroPage />} />
                <Route path="/hospedagem" element={<HospedagemPage />} />
            </Routes>
        </Router>
    );
}

export default App;
