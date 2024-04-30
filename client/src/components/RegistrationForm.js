import React, { useState } from 'react';
import './cadastro.css';
import logo from '../images/logo.png';
import backgroundImage from '../images/image1.png';

function RegisterForm() {
    const [formData, setFormData] = useState({
        fullname: '',
        cpf: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.fullname || !formData.cpf || !formData.email || !formData.password || !formData.confirmPassword) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            alert("As senhas não coincidem.");
            return;
        }

        const endpoint = "http://localhost:4000/register";

        fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nome: formData.fullname,
                cpf_rg: formData.cpf,
                email: formData.email,
                senha: formData.password
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Falha ao registrar usuário');
                }
                return response.json();
            })
            .then(data => {
                console.log('Success:', data);
                alert('Cadastro realizado com sucesso!');
                setFormData({
                    fullname: '',
                    cpf: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                });
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Erro ao cadastrar. Tente novamente.');
            });
    };

    return (
        <div className="login-container">
            <img src={logo} alt="Journey Mosaic" className="logo" />
            <h2 className="text-center">Cadastro</h2>
            <form onSubmit={handleSubmit} className="form-group">
                <input type="text" className="form-control" placeholder="Nome completo" name="fullname" value={formData.fullname} onChange={handleChange} required />
                <input type="text" className="form-control" placeholder="CPF" name="cpf" value={formData.cpf} onChange={handleChange} required />
                <input type="email" className="form-control" placeholder="E-mail" name="email" value={formData.email} onChange={handleChange} required />
                <input type="password" className="form-control" placeholder="Senha" name="password" value={formData.password} onChange={handleChange} required />
                <input type="password" className="form-control" placeholder="Confirmar senha" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
                <button type="submit" className="btn btn-primary btn-block">Cadastre-se</button>
            </form>
        </div>
    );
}

export default RegisterForm;
