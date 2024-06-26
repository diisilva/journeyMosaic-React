import React, { useState } from 'react';
import '../components/cadastroViagem.css';

function CadastroViagemForm() {
    const [nome, setNome] = useState('');
    const [destino, setDestino] = useState('');
    const [dataIda, setDataIda] = useState('');
    const [dataVolta, setDataVolta] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const idUsuario = localStorage.getItem('id_usuario');
        console.log('ID do usuário recuperado do localStorage:', idUsuario);

        const viagem = { id_usuario: idUsuario, nome, destino, data_ida: dataIda, data_volta: dataVolta };
        console.log('Dados da viagem a ser enviados:', viagem);

        fetch('http://localhost:4000/viagem', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(viagem)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
            // Redirecionar ou mostrar mensagem de sucesso
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    return (
        <div className="cadastro-viagem-page">
            <header className="cadastro-viagem-header">
                <h1>Cadastro de Nova Viagem</h1>
            </header>
            <div className="cadastro-viagem-form-container">
                <form onSubmit={handleSubmit}>
                    <div className="cadastro-viagem-form-group">
                        <label htmlFor="nome">Nome:</label>
                        <input type="text" id="nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
                    </div>
                    <div className="cadastro-viagem-form-group">
                        <label htmlFor="destino">Destino:</label>
                        <input type="text" id="destino" value={destino} onChange={(e) => setDestino(e.target.value)} required />
                    </div>
                    <div className="cadastro-viagem-form-group">
                        <label htmlFor="dataIda">Data de Ida:</label>
                        <input type="date" id="dataIda" value={dataIda} onChange={(e) => setDataIda(e.target.value)} required />
                    </div>
                    <div className="cadastro-viagem-form-group">
                        <label htmlFor="dataVolta">Data de Volta:</label>
                        <input type="date" id="dataVolta" value={dataVolta} onChange={(e) => setDataVolta(e.target.value)} required />
                    </div>
                    <button type="submit" className="cadastro-viagem-btn-primary">Cadastrar Viagem</button>
                </form>
            </div>
        </div>
    );
}

export default CadastroViagemForm;
