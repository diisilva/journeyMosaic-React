import React, { useState } from 'react';
import './gestaoTransporte.css';
import logo from '../images/logo.png';

function GestaoTransporte() {
    const [tipoTransporte, setTipoTransporte] = useState('');
    const [formData, setFormData] = useState({
        numeroVoo: '',
        portaEmbarque: '',
        bagagem: '',
        empresa: '',
        hora: '',
        data: '',
        numeroLinha: '',
        plataformaEmbarque: '',
        restricoes: '',
        assento: '',
        numeroTrem: '',
        vagao: '',
        estacaoPartida: '',
        numeroAssento: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleTipoChange = (e) => {
        setTipoTransporte(e.target.value);
        setFormData({
            numeroVoo: '',
            portaEmbarque: '',
            bagagem: '',
            empresa: '',
            hora: '',
            data: '',
            numeroLinha: '',
            plataformaEmbarque: '',
            restricoes: '',
            assento: '',
            numeroTrem: '',
            vagao: '',
            estacaoPartida: '',
            numeroAssento: ''
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const endpoint = "http://localhost:4000/transporte";

        fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                tipoTransporte,
                ...formData
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Falha ao registrar transporte');
                }
                return response.json();
            })
            .then(data => {
                console.log('Success:', data);
                alert('Cadastro de transporte realizado com sucesso!');
                setTipoTransporte('');
                setFormData({
                    numeroVoo: '',
                    portaEmbarque: '',
                    bagagem: '',
                    empresa: '',
                    hora: '',
                    data: '',
                    numeroLinha: '',
                    plataformaEmbarque: '',
                    restricoes: '',
                    assento: '',
                    numeroTrem: '',
                    vagao: '',
                    estacaoPartida: '',
                    numeroAssento: ''
                });
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Erro ao cadastrar transporte. Tente novamente.');
            });
    };

    const renderFormFields = () => {
        switch (tipoTransporte) {
            case 'aviao':
                return (
                    <>
                        <input type="text" className="form-control" placeholder="Número do Voo" name="numeroVoo" value={formData.numeroVoo} onChange={handleChange} required />
                        <input type="text" className="form-control" placeholder="Porta de Embarque" name="portaEmbarque" value={formData.portaEmbarque} onChange={handleChange} required />
                        <input type="text" className="form-control" placeholder="Bagagem" name="bagagem" value={formData.bagagem} onChange={handleChange} required />
                    </>
                );
            case 'onibus':
                return (
                    <>
                        <input type="text" className="form-control" placeholder="Número da Linha" name="numeroLinha" value={formData.numeroLinha} onChange={handleChange} required />
                        <input type="text" className="form-control" placeholder="Plataforma de Embarque" name="plataformaEmbarque" value={formData.plataformaEmbarque} onChange={handleChange} required />
                        <input type="text" className="form-control" placeholder="Restrições" name="restricoes" value={formData.restricoes} onChange={handleChange} required />
                        <input type="text" className="form-control" placeholder="Assento" name="assento" value={formData.assento} onChange={handleChange} required />
                    </>
                );
            case 'trem':
                return (
                    <>
                        <input type="text" className="form-control" placeholder="Número do Trem" name="numeroTrem" value={formData.numeroTrem} onChange={handleChange} required />
                        <input type="text" className="form-control" placeholder="Vagão" name="vagao" value={formData.vagao} onChange={handleChange} required />
                        <input type="text" className="form-control" placeholder="Estação de Partida" name="estacaoPartida" value={formData.estacaoPartida} onChange={handleChange} required />
                        <input type="text" className="form-control" placeholder="Número do Assento" name="numeroAssento" value={formData.numeroAssento} onChange={handleChange} required />
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div className="gestao-container">
            <img src={logo} alt="Logo" className="logo" />
            <h2 className="text-center">Gestão de Transporte</h2>
            <form onSubmit={handleSubmit} className="form-group">
                <select className="form-control" value={tipoTransporte} onChange={handleTipoChange} required>
                    <option value="">Selecione o Tipo de Transporte</option>
                    <option value="aviao">Avião</option>
                    <option value="onibus">Ônibus</option>
                    <option value="trem">Trem</option>
                </select>
                {renderFormFields()}
                <input type="text" className="form-control" placeholder="Empresa" name="empresa" value={formData.empresa} onChange={handleChange} required />
                <input type="time" className="form-control" placeholder="Hora" name="hora" value={formData.hora} onChange={handleChange} required />
                <input type="date" className="form-control" placeholder="Data" name="data" value={formData.data} onChange={handleChange} required />
                <button type="submit" className="btn btn-primary btn-block">Cadastrar Transporte</button>
            </form>
        </div>
    );
}

export default GestaoTransporte;
