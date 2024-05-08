// src/App.js
// teste miruna
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import IndexPage from './pages/IndexPage';
import CadastroPage from './pages/CadastroPage';
import LoginPage from './pages/LoginPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<LoginPage />} />
                <Route path="/cadastro" element={<CadastroPage />} />
            </Routes>
        </Router>
    );
}

export default App;
