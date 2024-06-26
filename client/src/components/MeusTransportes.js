import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './gestaoTransporte.css';

function MeusTransportes({ onDelete }) {
    const [transportes, setTransportes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:4000/transporte')
            .then(response => response.json())
            .then(data => setTransportes(data))
            .catch(error => console.error('Erro ao buscar transportes:', error));
    }, []);

    const handleEdit = (id, tipoTransporte) => {
        navigate(`/editar/${id}/${tipoTransporte}`);
    };

    const handleDelete = (id, tipoTransporte) => {
        onDelete(id, tipoTransporte);
    };

    return (
        <div className="gestao-container">
            <h2 className="text-center">Meus Transportes</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Tipo</th>
                        <th>Detalhes</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {transportes.map(transporte => (
                        <tr key={transporte.id_transporte}>
                            <td>{transporte.tipoTransporte}</td>
                            <td>
                                {Object.entries(transporte).map(([key, value]) => (
                                    key !== 'id_transporte' && key !== 'tipoTransporte' && (
                                        <p key={key}><strong>{key}:</strong> {value}</p>
                                    )
                                ))}
                            </td>
                            <td>
                                <div className="actions">
                                    <button onClick={() => handleEdit(transporte.id_transporte, transporte.tipoTransporte)} className="btn btn-warning">Editar</button>
                                    <button onClick={() => handleDelete(transporte.id_transporte, transporte.tipoTransporte)} className="btn btn-danger">Excluir</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default MeusTransportes;
