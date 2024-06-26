import React, { useState, useEffect } from 'react';
import GestaoTransporteForm from '../components/GestaoTransporteForm';
import MeusTransportes from '../components/MeusTransportes';
import '../components/gestaoTransporte.css';

function GestaoTransportePage() {
    const [currentView, setCurrentView] = useState('home');
    const [editingTransporte, setEditingTransporte] = useState(null);
    const [idUsuario, setIdUsuario] = useState(null);
    const [idViagem, setIdViagem] = useState(null);

    useEffect(() => {
        const idUsuarioFromStorage = localStorage.getItem('id_usuario');
        const idViagemFromStorage = localStorage.getItem('id_viagem');
        console.log('ID do usuário recuperado do localStorage:', idUsuarioFromStorage);
        console.log('ID da viagem recuperado do localStorage:', idViagemFromStorage);
        setIdUsuario(idUsuarioFromStorage);
        setIdViagem(idViagemFromStorage);
    }, []);

    const handleSave = (transporte) => {
        const endpoint = transporte.id ? `http://localhost:4000/transporte/${transporte.id}/${transporte.tipoTransporte}` : 'http://localhost:4000/transporte';
        const method = transporte.id ? 'PUT' : 'POST';

        fetch(endpoint, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(transporte)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Falha ao registrar transporte');
                }
                return response.json();
            })
            .then(data => {
                alert('Operação realizada com sucesso!');
                setCurrentView('home');
                setEditingTransporte(null);
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Erro ao processar transporte. Tente novamente.');
            });
    };

    const handleDelete = (id, tipoTransporte) => {
        if (window.confirm('Tem certeza que deseja excluir este transporte?')) {
            fetch(`http://localhost:4000/transporte/${id}/${tipoTransporte}`, {
                method: 'DELETE'
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Falha ao excluir transporte');
                    }
                    setCurrentView('home');
                })
                .catch(error => {
                    console.error('Erro ao excluir transporte:', error);
                    alert('Erro ao excluir transporte. Tente novamente.');
                });
        }
    };

    return (
        <div className="gestao-transporte-page">
            <header className="header">
                <h1>Gestão de Transporte</h1>
            </header>
            <div className="container">
                {currentView === 'home' && (
                    <div className="buttons-container">
                        <button className="btn btn-primary" onClick={() => setCurrentView('create')}>Cadastrar Novo Transporte</button>
                        <button className="btn btn-secondary" onClick={() => setCurrentView('view')}>Meus Transportes</button>
                    </div>
                )}
                {currentView === 'create' && (
                    <GestaoTransporteForm onSave={handleSave} idUsuario={idUsuario} idViagem={idViagem} />
                )}
                {currentView === 'view' && (
                    <MeusTransportes onDelete={handleDelete} />
                )}
            </div>
        </div>
    );
}

export default GestaoTransportePage;
