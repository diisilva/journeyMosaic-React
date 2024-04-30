import React from 'react';
import RegisterForm from '../components/RegistrationForm';
import '../components/cadastro.css';

function CadastroPage() {
    return (

        <div className="cadastro-page">
            <div className="background-image"></div>
            <header className="header">
                <h1>Sign up and plan the best trips of your life</h1>
            </header>
            <div className="container">
                <RegisterForm />
            </div>
        </div>
    );
}

export default CadastroPage;
