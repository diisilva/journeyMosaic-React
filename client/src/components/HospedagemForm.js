import React, { useState } from 'react';
import './hospedagem.css';
import logo from '../images/logo.png';
import backgroundImage from '../images/image1.png';

function HospedagemForm() {
    const [formData, setFormData] = useState({
        nome: '', //nome
        endereco: '', // endereco
        datacheckin: '', //checkin
        datacheckout: '', //checkout
        horacheckin: '', //checkin
        horacheckout: '', //checkout
        valor: '' //valor
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.nome || !formData.endereco || !formData.datacheckin || !formData.datacheckout || !formData.horacheckin || !formData.horacheckout || !formData.valor) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        const endpoint = "http://localhost:4000/register";

        fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nome: formData.nome,
                endereco: formData.endereco,
                datacheckin: formData.datacheckin,
                datacheckout: formData.datacheckout,
                horacheckin: formData.horacheckin,
                horacheckout: formData.horacheckout,
                valor: formData.valor
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
                    datacheckin: '',
                    datacheckout: '',
                    horacheckin: '',
                    horacheckout: '',
                    valor: ''
                });
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Erro ao adicionar. Tente novamente.');
            });
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
                <input type="text" className="form-control" placeholder=" Data Check-in 00/00/0000" name="datacheckin" value={formData.datacheckin} onChange={handleChange} required />
                <input type="text" className="form-control" placeholder=" Data Check-out 00/00/0000" name="datacheckout" value={formData.datacheckout} onChange={handleChange} required />
                <input type="text" className="form-control" placeholder=" Hora Check-in 00:00" name="horacheckin" value={formData.horacheckin} onChange={handleChange} required />
                <input type="text" className="form-control" placeholder=" Hora Check-out 00:00" name="horacheckout" value={formData.horacheckout} onChange={handleChange} required />
                <input type="text" className="form-control" placeholder="Valor" name="valor" value={formData.valor} onChange={handleChange} required />
                <button type="submit" className="btn btn-primary btn-block">Salvar</button>
            </form>
        </div>
    );
}

export default HospedagemForm;