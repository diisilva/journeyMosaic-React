import React, { useState, useEffect } from 'react';
import './atividades.css';
//
function AtividadesForm({ atividade, onFormSubmit, onCancel }) {
    const [formData, setFormData] = useState({
        nome: '', // Nome da atividade
        data: '', // Data
        descricao: '', // Descrição
        endereco: '', // Endereço
        valor: '' // Valor
    });

    useEffect(() => {
        if (atividade) {
            setFormData(atividade);
        }
    }, [atividade]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.nome || !formData.data || !formData.descricao || !formData.endereco || !formData.valor) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        const endpoint = "http://localhost:4000/atividades";

        fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nome: formData.nome,
                data: formData.data,
                descricao: formData.descricao,
                endereco: formData.endereco,
                valor: formData.valor
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Falha ao adicionar atividade');
                }
                return response.json();
            })
            .then(data => {
                console.log('Success:', data);
                alert('Atividade adicionada com sucesso!');
                setFormData({
                    nome: '',
                    data: '',
                    descricao: '',
                    endereco: '',
                    valor: ''
                });
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Erro ao adicionar. Tente novamente.');
            });
            onFormSubmit(formData);
    };

    const handleCancel = () => {
        onCancel();
    };

    return (
        <div className="login-container">
            {/*
            <img src={logo} alt="Journey Mosaic" className="logo" />
            <h2 className="text-center">Atividades</h2>
            */}
            <form onSubmit={handleSubmit} className="form-group">
                <input type="text" className="form-control" placeholder="Nome da Atividade" name="nome" value={formData.nome} onChange={handleChange} required />
                <input type="text" className="form-control" placeholder="Data 00/00/0000" name="data" value={formData.data} onChange={handleChange} required />
                <input type="text" className="form-control" placeholder="Descrição" name="descricao" value={formData.descricao} onChange={handleChange} required />
                <input type="text" className="form-control" placeholder="Endereço" name="endereco" value={formData.endereco} onChange={handleChange} required />
                <input type="text" className="form-control" placeholder="Valor" name="valor" value={formData.valor} onChange={handleChange} required />
                <div className="form-actions">
                    <button type="submit" className="btn btn-primary">Salvar</button>
                    <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancelar</button>
                </div>
            </form>
        </div>
    );
}

export default AtividadesForm;
