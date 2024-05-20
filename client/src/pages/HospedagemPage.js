import React from 'react';
import HospedagemForm from '../components/HospedagemForm';
import '../components/hospedagem.css';

function HospedagemPage() { 
    return (

        <div className="hospedagem-page"> 
            <div className="background-image"></div>
            <header className="header">
                <h1>HOSPEDAGEM</h1>
            </header>
            <div className="container">
                <HospedagemForm />
            </div>
        </div>
    );
}

export default HospedagemPage;
