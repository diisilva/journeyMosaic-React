import React, { useState, useEffect } from 'react';
import './hospedagemForm.css';

function HospedagemForm({ hospedagem, onFormSubmit, onCancel }) {
    const [formData, setFormData] = useState({
        nome: '',
        endereco: '',
        valor: '',
        data_checkin: '',
        data_checkout: '',
        hora_checkin: '',
        hora_checkout: ''
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

        if (!formData.nome || !formData.endereco || !formData.valor || !formData.data_checkin || !formData.data_checkout || !formData.hora_checkin || !formData.hora_checkout) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        onFormSubmit(formData);
    };

    const handleCancel = () => {
        onCancel();
    };

    return (
        <div className="hospedagem-form-container">
            <form onSubmit={handleSubmit} className="hospedagem-form-group">
                <input type="text" className="hospedagem-form-control" placeholder="Nome" name="nome" value={formData.nome} onChange={handleChange} required />
                <input type="text" className="hospedagem-form-control" placeholder="Endereço" name="endereco" value={formData.endereco} onChange={handleChange} required />
                <input type="number" className="hospedagem-form-control" placeholder="Valor" name="valor" value={formData.valor} onChange={handleChange} required />
                <input type="date" className="hospedagem-form-control" placeholder="Data Check-in" name="data_checkin" value={formData.data_checkin} onChange={handleChange} required />
                <input type="date" className="hospedagem-form-control" placeholder="Data Check-out" name="data_checkout" value={formData.data_checkout} onChange={handleChange} required />
                <input type="time" className="hospedagem-form-control" placeholder="Hora Check-in" name="hora_checkin" value={formData.hora_checkin} onChange={handleChange} required />
                <input type="time" className="hospedagem-form-control" placeholder="Hora Check-out" name="hora_checkout" value={formData.hora_checkout} onChange={handleChange} required />
                <div className="hospedagem-form-actions">
                    <button type="submit" className="hospedagem-btn hospedagem-btn-primary">Salvar</button>
                    <button type="button" className="hospedagem-btn hospedagem-btn-secondary" onClick={handleCancel}>Cancelar</button>
                </div>
            </form>
        </div>
    );
}

export default HospedagemForm;
