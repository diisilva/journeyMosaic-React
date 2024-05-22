import React from 'react';
import RegisterForm from '../components/RegistrationForm';
import '../components/cadastro.css';

function CadastroPage() {
    return (

        <div className="cadastro-page">
            <div className="background-image"></div>
            <header className="header">
                <h1>Cadastre-se e planeje as melhores viagens da sua vida!</h1>
            </header>
            <div className="container">
                <RegisterForm />
            </div>
        </div>
    );
}

export default CadastroPage;
