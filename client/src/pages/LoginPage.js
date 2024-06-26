import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/index.css';
import logo from '../images/logo.png';
import backgroundImage from '../images/image1.png';

function LoginPage() {
    const backgroundStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        height: '100vh',
    };

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        const endpoint = "http://localhost:4000/login";

        fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        })
            .then(response => {
                if (!response.ok) throw new Error('Login failed');
                return response.json();
            })
            .then(data => {
                localStorage.setItem('id_usuario', data.user.id_usuario); // Salvando o ID do usuário no localStorage
                navigate('/viagens');
            })
            .catch(error => {
                console.error('Login failed:', error);
                alert('Login failed. Please check your credentials and try again.');
            });
    };

    return (
        <div style={backgroundStyle} className="bg">
            <header className="header">
                <h1 className="text-center text-light mb-4">Bem vindo ao Journey Mosaic, seu planejador de viagens.</h1>
            </header>
            <div className="login-container">
                <img src={logo} alt="Journey Mosaic" className="logo" />
                <h2 className="text-center text-light">Journey Mosaic</h2>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="E-mail"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Senha"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                    <p className="text-center text-light">
                        <a href="#" className="text-light">Esqueci minha senha</a>
                    </p>
                    <Link to="/cadastro" className="btn btn-secondary">Cadastre-se</Link>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
