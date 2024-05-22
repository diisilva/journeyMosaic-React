import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/viagens.css';
import logo from '../images/logo.png';

function ViagensPage() {
    const navigate = useNavigate();

    const handleAddNewTrip = () => {
        navigate('/gestao-transporte');
    };

    const handleViewTrips = () => {
        navigate('/minhas-viagens');
    };

    return (
        <div className="viagens-page">
            <div className="background-image"></div>
            <header className="header">
                <h1>Suas Viagens</h1>
            </header>
            <div className="container">
                <div className="logo-container">
                    <img src={logo} alt="Logo" className="logo" />
                </div>
                <div className="buttons-container">
                    <button className="btn btn-primary" onClick={handleViewTrips}>Minhas Viagens</button>
                    <button className="btn btn-secondary" onClick={handleAddNewTrip}>Adicionar Nova Viagem</button>
                </div>
            </div>
        </div>
    );
}

export default ViagensPage;
