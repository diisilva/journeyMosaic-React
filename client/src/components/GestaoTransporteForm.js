import React, { useState, useEffect } from 'react';
import './gestaoTransporte.css';

function GestaoTransporteForm({ onSave, initialData = {}, isEditing = false, idUsuario, idViagem }) {
    const [tipoTransporte, setTipoTransporte] = useState(initialData.tipoTransporte || '');
    const [formData, setFormData] = useState({
        numeroVoo: initialData.numeroVoo || '',
        portaEmbarque: initialData.portaEmbarque || '',
        bagagem: initialData.bagagem || '',
        empresa: initialData.empresa || '',
        hora: initialData.hora || '',
        data: initialData.data || '',
        numeroLinha: initialData.numeroLinha || '',
        plataformaEmbarque: initialData.plataformaEmbarque || '',
        restricoes: initialData.restricoes || '',
        assento: initialData.assento || '',
        numeroTrem: initialData.numeroTrem || '',
        vagao: initialData.vagao || '',
        estacaoPartida: initialData.estacaoPartida || '',
        numeroAssento: initialData.numeroAssento || ''
    });

    useEffect(() => {
        if (isEditing && initialData) {
            setTipoTransporte(initialData.tipoTransporte);
            setFormData({
                numeroVoo: initialData.numeroVoo || '',
                portaEmbarque: initialData.portaEmbarque || '',
                bagagem: initialData.bagagem || '',
                empresa: initialData.empresa || '',
                hora: initialData.hora || '',
                data: initialData.data || '',
                numeroLinha: initialData.numeroLinha || '',
                plataformaEmbarque: initialData.plataformaEmbarque || '',
                restricoes: initialData.restricoes || '',
                assento: initialData.assento || '',
                numeroTrem: initialData.numeroTrem || '',
                vagao: initialData.vagao || '',
                estacaoPartida: initialData.estacaoPartida || '',
                numeroAssento: initialData.numeroAssento || ''
            });
        }
        console.log('ID do usuário:', idUsuario);
        console.log('ID da viagem:', idViagem);
    }, [isEditing, initialData, idUsuario, idViagem]);

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
        onSave({
            id: initialData.id_transporte,
            id_usuario: idUsuario,
            id_viagem: idViagem,
            tipoTransporte,
            ...formData
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
            <h2 className="text-center">{isEditing ? 'Editar Transporte' : 'Cadastrar Transporte'}</h2>
            <form onSubmit={handleSubmit} className="form-group">
                <select className="form-control" value={tipoTransporte} onChange={handleTipoChange} required disabled={isEditing}>
                    <option value="">Selecione o Tipo de Transporte</option>
                    <option value="aviao">Avião</option>
                    <option value="onibus">Ônibus</option>
                    <option value="trem">Trem</option>
                </select>
                {tipoTransporte && renderFormFields()}
                {tipoTransporte && (
                    <>
                        <input type="text" className="form-control" placeholder="Empresa" name="empresa" value={formData.empresa} onChange={handleChange} required />
                        <input type="time" className="form-control" placeholder="Hora" name="hora" value={formData.hora} onChange={handleChange} required />
                        <input type="date" className="form-control" placeholder="Data" name="data" value={formData.data} onChange={handleChange} required />
                    </>
                )}
                <button type="submit" className="btn btn-primary btn-block">{isEditing ? 'Atualizar Transporte' : 'Cadastrar Transporte'}</button>
            </form>
        </div>
    );
}

export default GestaoTransporteForm;
