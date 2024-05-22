import React from 'react';
import GestaoTransporteForm from '../components/GestaoTransporteForm';
//import '../components/gestaoTransporte.css';

function GestaoTransportePage() {
    return (
        <div className="gestao-transporte-page">
            <div className="background-image"></div>
            <header className="header">
                <h1>Gestão de Transporte</h1>
            </header>
            <div className="container">
                <GestaoTransporteForm />
            </div>
        </div>
    );
}

export default GestaoTransportePage;
