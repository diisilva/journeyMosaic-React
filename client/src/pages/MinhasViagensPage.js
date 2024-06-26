import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../components/minhasViagens.css';
import logo from '../images/logo.png';

function MinhasViagensPage() {
    const [date, setDate] = useState(new Date());
    const [viagens, setViagens] = useState([]);
    const [selectedViagem, setSelectedViagem] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const idUsuario = localStorage.getItem('id_usuario');
        if (idUsuario) {
            console.log('ID do usuário recuperado do localStorage:', idUsuario);
            fetch(`http://localhost:4000/viagem?id_usuario=${idUsuario}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Dados das viagens recebidos:', data);
                    setViagens(data);
                })
                .catch(error => console.error('Erro ao buscar viagens:', error));
        } else {
            console.error('ID do usuário não encontrado no localStorage');
        }
    }, []);

    const handleDateChange = (newDate) => {
        setDate(newDate);
        alert(`Visualizar viagens em: ${newDate}`);
    };

    const handleSelectViagem = (viagem) => {
        setSelectedViagem(viagem);
        localStorage.setItem('id_viagem', viagem.id_viagem);
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
                <div className="viagens-list-container">
                    {viagens.length > 0 ? (
                        viagens.map((viagem) => (
                            <div
                                key={viagem.id_viagem}
                                className={`viagem-item ${selectedViagem && selectedViagem.id_viagem === viagem.id_viagem ? 'selected' : ''}`}
                                onClick={() => handleSelectViagem(viagem)}
                            >
                                <h3>{viagem.nome}</h3>
                                <p>Destino: {viagem.destino}</p>
                                <p>Data de Ida: {new Date(viagem.data_ida).toLocaleDateString()}</p>
                                <p>Data de Volta: {new Date(viagem.data_volta).toLocaleDateString()}</p>
                            </div>
                        ))
                    ) : (
                        <p>Não há viagens cadastradas.</p>
                    )}
                </div>
                {selectedViagem && (
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
                )}
                <div className="calendar-container">
                    <Calendar
                        onChange={handleDateChange}
                        value={date}
                        className="custom-calendar"
                    />
                </div>
            </div>
        </div>
    );
}

export default MinhasViagensPage;
