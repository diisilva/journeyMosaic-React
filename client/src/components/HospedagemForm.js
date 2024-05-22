import React, { useState, useEffect } from 'react';
import './hospedagem.css';

function HospedagemForm({ hospedagem, onFormSubmit, onCancel }) {
    const [formData, setFormData] = useState({
        nome: '', //nome
        endereco: '', // endereco
        valor: '', //valor
        datacheckin: '', //checkin
        datacheckout: '', //checkout
        horacheckin: '', //checkin
        horacheckout: '' //checkout
    });

    useEffect(() => {
        if (hospedagem) {
            setFormData(hospedagem);
        }
    }, [hospedagem]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.nome || !formData.endereco || !formData.valor || !formData.datacheckin || !formData.datacheckout || !formData.horacheckin || !formData.horacheckout) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        const endpoint = "http://localhost:4000/hospedagem";

        fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nome: formData.nome,
                endereco: formData.endereco,
                valor: formData.valor,
                datacheckin: formData.datacheckin,
                datacheckout: formData.datacheckout,
                horacheckin: formData.horacheckin,
                horacheckout: formData.horacheckout
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Falha ao adicionar hospedagem');
                }
                return response.json();
            })
            .then(data => {
                console.log('Success:', data);
                alert('Hospedagem adicionada com sucesso!');
                setFormData({
                    nome: '',
                    endereco: '',
                    valor: '',
                    datacheckin: '',
                    datacheckout: '',
                    horacheckin: '',
                    horacheckout: ''
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
            <h2 className="text-center">Hospedagem</h2>
            */}
            <form onSubmit={handleSubmit} className="form-group">
                <input type="text" className="form-control" placeholder="Nome" name="nome" value={formData.nome} onChange={handleChange} required />
                <input type="text" className="form-control" placeholder="Endereço" name="endereco" value={formData.endereco} onChange={handleChange} required />
                <input type="text" className="form-control" placeholder="Valor" name="valor" value={formData.valor} onChange={handleChange} required />
                <input type="text" className="form-control" placeholder=" Data Check-in 00/00/0000" name="datacheckin" value={formData.datacheckin} onChange={handleChange} required />
                <input type="text" className="form-control" placeholder=" Data Check-out 00/00/0000" name="datacheckout" value={formData.datacheckout} onChange={handleChange} required />
                <input type="text" className="form-control" placeholder=" Hora Check-in 00:00" name="horacheckin" value={formData.horacheckin} onChange={handleChange} required />
                <input type="text" className="form-control" placeholder=" Hora Check-out 00:00" name="horacheckout" value={formData.horacheckout} onChange={handleChange} required />
                <div className="form-actions">
                    <button type="submit" className="btn btn-primary">Salvar</button>
                    <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancelar</button>
                </div>
            </form>
        </div>
    );
}

export default HospedagemForm;