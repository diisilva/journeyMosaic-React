// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage'; // Importe o HomePage
import CadastroPage from './pages/CadastroPage';
import LoginPage from './pages/LoginPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<HomePage />} /> {/* Altere a rota inicial para HomePage */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/cadastro" element={<CadastroPage />} />
            </Routes>
        </Router>
    );
}

export default App;
