import React, { useState, useEffect } from 'react';
import HospedagemForm from '../components/HospedagemForm';
import '../components/hospedagem.css';
import logo from '../images/logo.png';

function HospedagemPage() {
    const [hospedagens, setHospedagens] = useState([]);
    const [editingHospedagem, setEditingHospedagem] = useState(null);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        fetch('http://localhost:4000/hospedagem')
            .then(response => response.json())
            .then(data => setHospedagens(data))
            .catch(error => console.error('Erro ao buscar hospedagens:', error));
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
                })
                .catch(error => console.error('Erro ao adicionar hospedagem:', error));
        }
    };

    const handleCancel = () => {
        setShowForm(false);
    };

    return (
        <div className="hospedagem-page">
            <header className="header">
                <img src={logo} alt="Journey Mosaic" className="logopequena" />
            </header>
            <div className="container">
                <div className="hospedagem-list">
                    {hospedagens.map(hospedagem => (
                        <div key={hospedagem.id_hospedagem} className="hospedagem-item">
                            <span>{hospedagem.nome}</span>
                            <button onClick={() => handleEdit(hospedagem)}>Editar</button>
                            <button onClick={() => handleDelete(hospedagem.id_hospedagem)}>Excluir</button>
                        </div>
                    ))}
                    <button className="botao" onClick={handleAdd}>Adicionar</button>
                </div>
                {showForm && <HospedagemForm hospedagem={editingHospedagem} onFormSubmit={handleFormSubmit} onCancel={handleCancel} />}
            </div>
        </div>
    );
}

export default HospedagemPage;
