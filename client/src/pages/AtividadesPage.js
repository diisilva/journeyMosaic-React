import React, { useState, useEffect } from 'react';
import AtividadesForm from '../components/AtividadesForm';
import '../components/atividades.css';
import logo from '../images/logo.png';

function AtividadesPage() {
    const [atividades, setAtividades] = useState([]);
    const [editingAtividade, setEditingAtividade] = useState(null);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        fetch('http://localhost:4000/atividades')
            .then(response => response.json())
            .then(data => setAtividades(data))
            .catch(error => console.error('Erro ao buscar atividades:', error));
    }, []);

    const handleEdit = (atividade) => {
        setEditingAtividade(atividade);
        setShowForm(true);
    };

    const handleDelete = (id) => {
        fetch(`http://localhost:4000/atividades/${id}`, { method: 'DELETE' })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao excluir atividade');
                }
                setAtividades(atividades.filter(a => a.id_atividade !== id));
            })
            .catch(error => console.error('Erro ao excluir atividade:', error));
    };

    const handleAdd = () => {
        setEditingAtividade(null);
        setShowForm(true);
    };

    const handleFormSubmit = (newAtividade) => {
        if (editingAtividade) {
            // Update existing atividade
            fetch(`http://localhost:4000/atividades/${editingAtividade.id_atividade}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newAtividade),
            })
                .then(response => response.json())
                .then(updatedAtividade => {
                    setAtividades(atividades.map(a => (a.id_atividade === updatedAtividade.id_atividade ? updatedAtividade : a)));
                    setShowForm(false);
                })
                .catch(error => console.error('Erro ao atualizar atividade:', error));
        } else {
            // Add new atividade
            fetch('http://localhost:4000/atividades', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newAtividade),
            })
                .then(response => response.json())
                .then(addedAtividade => {
                    setAtividades([...atividades, addedAtividade]);
                    setShowForm(false);
                })
                .catch(error => console.error('Erro ao adicionar atividade:', error));
        }
    };

    const handleCancel = () => {
        setShowForm(false);
    };

    return (
        <div className="atividades-page">
            <header className="header">
                <img src={logo} alt="Journey Mosaic" className="logopequena" />
            </header>
            <div className="container">
                <div className="login-container">
                    {atividades.map(atividade => (
                        <div key={atividade.id_atividade} className="atividade-item">
                            <span>{atividade.nome}</span>
                            <button onClick={() => handleEdit(atividade)}>Editar</button>
                            <button onClick={() => handleDelete(atividade.id_atividade)}>Excluir</button>
                        </div>
                    ))}
                    <button className="botao" onClick={handleAdd}>Adicionar</button>
                </div>
                {showForm && <AtividadesForm atividade={editingAtividade} onFormSubmit={handleFormSubmit} onCancel={handleCancel} />}
            </div>
        </div>
    );
}

export default AtividadesPage;
