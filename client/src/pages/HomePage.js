// src/pages/HomePage.js
import React from 'react';
import '../css/HomePage.css';
import { useNavigate } from 'react-router-dom';

import logo from '../images/Journey_Mosaic_home/logo.png';
import startButton from '../images/Journey_Mosaic_home/comece_agora.png';
import ellipse2 from '../images/Journey_Mosaic_home/ellipse_2.png';
import ellipse3 from '../images/Journey_Mosaic_home/ellipse_3.png';
import mainImage from '../images/Journey_Mosaic_home/image_17.png';
import loginLink from '../images/Journey_Mosaic_home/possui_uma_conta.png';
import description from '../images/Journey_Mosaic_home/no_Journey_voca_sera_capaz_.png';
import slogan from '../images/Journey_Mosaic_home/seu_aplicativo_de_gerenciamento_de_viagens_facil.png';
import nextTrip from '../images/Journey_Mosaic_home/sua_proxima_viagem_esta_proxima.png';
import backgroundImage from '../images/Journey_Mosaic_home/Subtract.png';
import removeBackground from '../images/Journey_Mosaic_home/remove_background_project1.png';

const HomePage = () => {
    const navigate = useNavigate();

    const handleStartClick = () => {
        navigate('/cadastro');
    };

    const handleLoginClick = () => {
        navigate('/login');
    };

    return (
        <div className="homepage">
            <div className="subtract" style={{ backgroundImage: `url(${backgroundImage})` }} />
            <div className="rectangle-44" />
            <div className="rectangle-39" />
            <div className="journey-logo">
                <img src={logo} alt="Journey Mosaic" />
            </div>
            <div className="rectangle-40" />
            <div className="rectangle-43" />
            <div className="clique-aqui" onClick={handleLoginClick}>Clique aqui</div>
            <div className="subtract-1" />
            <div className="ellipse-2" style={{ backgroundImage: `url(${ellipse2})` }} />
            <div className="ellipse-3" style={{ backgroundImage: `url(${ellipse3})` }} />
            <div className="journey-title">Journey Mosaic</div>
            <div className="rectangle-4" />
            <div className="comece-agora" onClick={handleStartClick}>Comece agora!</div>
            <div className="rectangle-42" />
            <div className="rectangle-45" />
            <div className="description">
                No Journey você será capaz de criar um planejamento completo para sua viagem, incluindo transportes, hospedagens e até as atividades que você está pensando em fazer!
            </div>
            <div className="main-image">
                <img src={mainImage} alt="Minhas viagens" />
            </div>
            <div className="slogan">
                Seu aplicativo de gerenciamento de viagens fácil, rápido e melhor de tudo, totalmente de grátis!
            </div>
            <div className="login-link">Já possuí uma conta?</div>
            <div className="remove-bg">
                <img src={removeBackground} alt="Remove background project" />
            </div>
            <div className="next-trip">
                Sua viagem está próxima!
            </div>
        </div>
    );
};

export default HomePage;
