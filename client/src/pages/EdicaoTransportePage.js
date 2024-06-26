import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import GestaoTransporteForm from '../components/GestaoTransporteForm';

function EdicaoTransportePage() {
    const { id, tipo } = useParams(); // Adicionando tipo de transporte aos parâmetros
    const [transporte, setTransporte] = useState(null);

    useEffect(() => {
        console.log(`Fetching transporte with id: ${id} and tipo: ${tipo}`);
        fetch(`http://localhost:4000/transporte/${id}/${tipo}`)
            .then(response => response.json())
            .then(data => setTransporte(data))
            .catch(error => console.error('Erro ao buscar transporte:', error));
    }, [id, tipo]);

    const handleSave = (updatedTransporte) => {
        console.log(`Updating transporte with id: ${id} and tipo: ${tipo}`);
        fetch(`http://localhost:4000/transporte/${id}/${tipo}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedTransporte)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Falha ao atualizar transporte');
                }
                return response.json();
            })
            .then(() => {
                alert('Transporte atualizado com sucesso!');
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Erro ao atualizar transporte. Tente novamente.');
            });
    };

    return (
        <div className="gestao-transporte-page">
            <header className="header">
                <h1>Editar Transporte</h1>
            </header>
            <div className="container">
                {transporte && (
                    <GestaoTransporteForm onSave={handleSave} initialData={transporte} isEditing={true} />
                )}
            </div>
        </div>
    );
}

export default EdicaoTransportePage;
