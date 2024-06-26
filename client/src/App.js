// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CadastroPage from './pages/CadastroPage';
import LoginPage from './pages/LoginPage';
import GestaoTransportePage from './pages/GestaoTransportePage';
import ViagensPage from './pages/ViagensPage';
import CadastroViagemPage from './pages/CadastroViagemPage';
import MinhasViagensPage from './pages/MinhasViagensPage';
import HospedagemPage from './pages/HospedagemPage';
import EdicaoTransportePage from './pages/EdicaoTransportePage'; // Import the new page
import AtividadesPage from './pages/AtividadesPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/cadastro" element={<CadastroPage />} />
                <Route path="/gestao-transporte" element={<GestaoTransportePage />} />
                <Route path="/viagens" element={<ViagensPage />} />
                <Route path="/cadastro-viagem" element={<CadastroViagemPage />} />
                <Route path="/minhas-viagens" element={<MinhasViagensPage />} />
                <Route path="/hospedagem" element={<HospedagemPage />} />
                <Route path="/editar/:id/:tipo" element={<EdicaoTransportePage />} /> {/* Add the new route */}
                <Route path="/atividades" element={<AtividadesPage />} />
            </Routes>
        </Router>
    );
}

export default App;
