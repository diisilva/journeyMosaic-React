import React from 'react';
import HospedagemForm from '../components/HospedagemForm';
import '../components/hospedagem.css';
import logo from '../images/logo.png';

function HospedagemPage() {
    return (

        <div className="hospedagem-page">
            <header className="header">
                <img src={logo} alt="Journey Mosaic" className="logo" />
            </header>
            <div className="container">
                <HospedagemForm />
            </div>

        </div>
    );
}

export default HospedagemPage;
