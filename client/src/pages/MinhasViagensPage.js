import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../components/minhasViagens.css';
import logo from '../images/logo.png';

function MinhasViagensPage() {
    const [date, setDate] = useState(new Date());
    const navigate = useNavigate();

    const handleDateChange = (newDate) => {
        setDate(newDate);
        alert(`Visualizar viagens em: ${newDate}`);
    };

    const handleNavigate = (path) => {
        navigate(path);
    };

    return (
        <div className="minhas-viagens-page">
            <div className="background-image"></div>
            <header className="header">
                <h1>Minhas Viagens</h1>
            </header>
            <div className="container">
                <div className="logo-container">
                    <img src={logo} alt="Logo" className="logo" />
                </div>
                <div className="calendar-container">
                    <Calendar
                        onChange={handleDateChange}
                        value={date}
                        className="custom-calendar"
                    />
                </div>
                <div className="buttons-container">
                    <button className="viagens-btn viagens-btn-primary" onClick={() => handleNavigate('/gestao-transporte')}>
                        <i className="fas fa-car"></i> Transporte
                    </button>
                    <button className="viagens-btn viagens-btn-secondary" onClick={() => handleNavigate('/hospedagem')}>
                        <i className="fas fa-bed"></i> Hospedagem
                    </button>
                    <button className="viagens-btn viagens-btn-tertiary">
                        <i className="fas fa-calendar-check"></i> Atividades
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MinhasViagensPage;