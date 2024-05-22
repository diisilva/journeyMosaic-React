// src/App.js
// teste miruna
// teste 2
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage'; // Importe o HomePage
import CadastroPage from './pages/CadastroPage';
import LoginPage from './pages/LoginPage';
import GestaoTransportePage from './pages/GestaoTransportePage'; // Importe o GestaoTransportePage
import ViagensPage from './pages/ViagensPage'; // Importe o ViagensPage
import MinhasViagensPage from './pages/MinhasViagensPage'; // Importe o MinhasViagensPage

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<HomePage />} /> {/* Altere a rota inicial para HomePage */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/cadastro" element={<CadastroPage />} />
                <Route path="/gestao-transporte" element={<GestaoTransportePage />} /> {/* Nova rota */}
                <Route path="/viagens" element={<ViagensPage />} /> {/* Nova rota para viagens */}
                <Route path="/minhas-viagens" element={<MinhasViagensPage />} /> {/* Nova rota para minhas viagens */}
            </Routes>
        </Router>
    );
}

export default App;