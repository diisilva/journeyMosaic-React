import React, { useState, useEffect } from 'react';
import HospedagemForm from '../components/HospedagemForm';
import '../components/hospedagemPage.css';
import logo from '../images/logo.png';

function HospedagemPage() {
    const [hospedagens, setHospedagens] = useState([]);
    const [editingHospedagem, setEditingHospedagem] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [currentView, setCurrentView] = useState('home');
    const [idViagem, setIdViagem] = useState(null);

    useEffect(() => {
        const idViagemFromStorage = localStorage.getItem('id_viagem');
        setIdViagem(idViagemFromStorage);

        if (idViagemFromStorage) {
            fetch(`http://localhost:4000/hospedagem/${idViagemFromStorage}`)
                .then(response => response.json())
                .then(data => setHospedagens(data))
                .catch(error => console.error('Erro ao buscar hospedagens:', error));
        }
    }, []);

    const handleEdit = (hospedagem) => {
        setEditingHospedagem(hospedagem);
        setShowForm(true);
    };

    const handleDelete = (id) => {
        fetch(`http://localhost:4000/hospedagem/${id}`, { method: 'DELETE' })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao excluir hospedagem');
                }
                setHospedagens(hospedagens.filter(h => h.id_hospedagem !== id));
            })
            .catch(error => console.error('Erro ao excluir hospedagem:', error));
    };

    const handleAdd = () => {
        setEditingHospedagem(null);
        setShowForm(true);
    };

    const handleFormSubmit = (newHospedagem) => {
        newHospedagem.id_viagem = idViagem; // Adiciona o id_viagem ao objeto de hospedagem

        if (editingHospedagem) {
            // Update existing hospedagem
            fetch(`http://localhost:4000/hospedagem/${editingHospedagem.id_hospedagem}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newHospedagem),
            })
                .then(response => response.json())
                .then(updatedHospedagem => {
                    setHospedagens(hospedagens.map(h => (h.id_hospedagem === updatedHospedagem.id_hospedagem ? updatedHospedagem : h)));
                    setShowForm(false);
                    setCurrentView('home');
                })
                .catch(error => console.error('Erro ao atualizar hospedagem:', error));
        } else {
            // Add new hospedagem
            fetch('http://localhost:4000/hospedagem', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newHospedagem),
            })
                .then(response => response.json())
                .then(addedHospedagem => {
                    setHospedagens([...hospedagens, addedHospedagem]);
                    setShowForm(false);
                    setCurrentView('home');
                })
                .catch(error => console.error('Erro ao adicionar hospedagem:', error));
        }
    };

    return (
        <div className="hospedagem-page">
        <header className="hospedagem-header">
            <h1>Gestão de Hospedagem</h1>
            <img src={logo} alt="Journey Mosaic" className="hospedagem-logo" />
        </header>
        <div className="hospedagem-container">
            {currentView === 'home' && (
                <div className="hospedagem-buttons-container">
                    <button className="hospedagem-btn hospedagem-btn-primary" onClick={() => setCurrentView('create')}>Cadastrar Nova Hospedagem</button>
                    <button className="hospedagem-btn hospedagem-btn-secondary" onClick={() => setCurrentView('view')}>Minhas Hospedagens</button>
                </div>
            )}
            {currentView === 'view' && (
                <div className="hospedagem-login-container">
                    <h2 className="hospedagem-text-center">Minhas Hospedagens</h2>
                    <table className="hospedagem-table">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Detalhes</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {hospedagens.map(hospedagem => (
                                <tr key={hospedagem.id_hospedagem}>
                                    <td>{hospedagem.nome}</td>
                                    <td>
                                        {Object.entries(hospedagem).map(([key, value]) => (
                                            key !== 'id_hospedagem' && key !== 'id_viagem' && (
                                                <p key={key}><strong>{key}:</strong> {value}</p>
                                            )
                                        ))}
                                    </td>
                                    <td>
                                        <div className="hospedagem-actions">
                                            <button onClick={() => handleEdit(hospedagem)} className="hospedagem-btn hospedagem-btn-warning">Editar</button>
                                            <button onClick={() => handleDelete(hospedagem.id_hospedagem)} className="hospedagem-btn hospedagem-btn-danger">Excluir</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            {currentView === 'create' && (
                <HospedagemForm hospedagem={editingHospedagem} onFormSubmit={handleFormSubmit} onCancel={() => setCurrentView('home')} />
            )}
            {showForm && (
                <HospedagemForm hospedagem={editingHospedagem} onFormSubmit={handleFormSubmit} onCancel={() => setShowForm(false)} />
            )}
        </div>
    </div>
    );
}

export default HospedagemPage;
