import React, { useState } from 'react';
import './hospedagem.css';
import logo from '../images/logo.png';
import backgroundImage from '../images/image1.png';

function HospedagemForm() {
    const [formData, setFormData] = useState({
        nome: '', //nome
        endereco: '', // endereco
        checkin: '', //checkin
        checkout: '', //checkout
        valor: '' //valor
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.nome || !formData.endereco || !formData.checkin || !formData.checkout || !formData.valor) {
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
                endereco_rg: formData.endereco,
                checkin: formData.checkin,
                senha: formData.checkout
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
                    checkin: '',
                    checkout: '',
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
            <img src={logo} alt="Journey Mosaic" className="logo" />
            <h2 className="text-center">Hospedagem</h2>
            <form onSubmit={handleSubmit} className="form-group">
                <input type="text" className="form-control" placeholder="Nome" name="nome" value={formData.nome} onChange={handleChange} required />
                <input type="text" className="form-control" placeholder="Endereço" name="endereco" value={formData.endereco} onChange={handleChange} required />
                <input type="checkin" className="form-control" placeholder="Check-in 00/00/0000 00:00" name="checkin" value={formData.checkin} onChange={handleChange} required />
                <input type="checkout" className="form-control" placeholder="Check-out 00/00/0000 00:00" name="checkout" value={formData.checkout} onChange={handleChange} required />
                <input type="checkout" className="form-control" placeholder="Valor" name="valor" value={formData.valor} onChange={handleChange} required />
                <button type="submit" className="btn btn-primary btn-block">Salvar</button>
            </form>
        </div>
    );
}

export default HospedagemForm;