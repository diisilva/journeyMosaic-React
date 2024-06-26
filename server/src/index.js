const express = require('express');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const cors = require('cors');

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000'
}));

app.get('/', (req, res) => {
    res.send('Bem-vindo ao servidor do Journey Mosaic!');
});

// Rota para registrar um usuário
app.post('/register', async (req, res) => {
    const { nome, cpf_rg, email, senha } = req.body;

    try {
        const senhaHash = await bcrypt.hash(senha, 10);
        const result = await pool.query(
            'INSERT INTO usuario (nome, senha, email, cpf_rg) VALUES ($1, $2, $3, $4) RETURNING id_usuario, nome, email, cpf_rg',
            [nome, senhaHash, email, cpf_rg]
        );

        const usuario = result.rows[0];
        delete usuario.senha;
        res.status(201).json(usuario);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao registrar o usuário.');
    }
});

// Rota para login de usuário
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await pool.query('SELECT * FROM usuario WHERE email = $1', [email]);
        if (user.rows.length > 0) {
            const isValid = await bcrypt.compare(password, user.rows[0].senha);
            if (isValid) {
                res.json({ message: "Login successful", user: user.rows[0] });
            } else {
                res.status(401).json({ message: "Invalid credentials" });
            }
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

///////////////// VIAGEM ////////////////

// Adicionar viagem
app.post('/viagem', async (req, res) => {
    const { id_usuario, nome, destino, data_ida, data_volta } = req.body;
    
    // Logando os dados recebidos na requisição
    console.log('Recebido na requisição:', req.body);
    console.log('ID do usuário:', id_usuario);

    try {
        const result = await pool.query(
            'INSERT INTO viagem (id_usuario, nome, destino, data_ida, data_volta) VALUES ($1, $2, $3, $4, $5) RETURNING id_viagem, id_usuario, nome, destino, data_ida, data_volta',
            [id_usuario, nome, destino, data_ida, data_volta]
        );

        const viagem = result.rows[0];
        console.log('Viagem criada:', viagem);
        res.status(201).json(viagem);
    } catch (error) {
        console.error('Erro ao adicionar a viagem:', error);
        res.status(500).send('Erro ao adicionar a viagem.');
    }
});


// Listar viagens
app.get('/viagem', async (req, res) => {
    const { id_usuario } = req.query;
    let query = 'SELECT * FROM viagem';
    let params = [];

    if (id_usuario) {
        query += ' WHERE id_usuario = $1';
        params.push(id_usuario);
    }

    try {
        console.log('Query executada:', query, 'Parâmetros:', params); // Adicionando log
        const result = await pool.query(query, params);
        console.log('Resultado da consulta:', result.rows); // Adicionando log
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Erro ao buscar viagens:', error);
        res.status(500).send('Erro ao buscar viagens.');
    }
});


// Atualizar viagem
app.put('/viagem/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, destino, data_ida, data_volta } = req.body;

    try {
        const result = await pool.query(
            'UPDATE viagem SET nome = $1, destino = $2, data_ida = $3, data_volta = $4 WHERE id_viagem = $5 RETURNING *',
            [nome, destino, data_ida, data_volta, id]
        );

        if (result.rowCount === 0) {
            return res.status(404).send('Viagem não encontrada.');
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao atualizar a viagem.');
    }
});

// Excluir viagem
app.delete('/viagem/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query('DELETE FROM viagem WHERE id_viagem = $1', [id]);

        if (result.rowCount === 0) {
            return res.status(404).send('Viagem não encontrada.');
        }

        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao excluir a viagem.');
    }
});

///////////////// HOSPEDAGEM //////////////

// Adicionar hospedagem
// Adicionar hospedagem
app.post('/hospedagem', async (req, res) => {
    const { id_viagem, nome, endereco, valor, data_checkin, data_checkout, hora_checkin, hora_checkout } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO hospedagem (id_viagem, nome, endereco, valor, data_checkin, data_checkout, hora_checkin, hora_checkout) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id_hospedagem, id_viagem, nome, endereco, valor, data_checkin, data_checkout, hora_checkin, hora_checkout',
            [id_viagem, nome, endereco, valor, data_checkin, data_checkout, hora_checkin, hora_checkout]
        );

        const hospedagem = result.rows[0];
        res.status(201).json(hospedagem);
    } catch (error) {
        console.error('Erro ao adicionar a hospedagem:', error);
        res.status(500).send('Erro ao adicionar a hospedagem.');
    }
});

// Listar hospedagens por id_viagem
app.get('/hospedagem/:id_viagem', async (req, res) => {
    const { id_viagem } = req.params;

    try {
        const result = await pool.query('SELECT * FROM hospedagem WHERE id_viagem = $1', [id_viagem]);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Erro ao buscar hospedagens:', error);
        res.status(500).send('Erro ao buscar hospedagens.');
    }
});


// Atualizar hospedagem
app.put('/hospedagem/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, endereco, valor, datacheckin, datacheckout, horacheckin, horacheckout } = req.body;

    try {
        const result = await pool.query(
            'UPDATE hospedagem SET nome = $1, endereco = $2, valor = $3, datacheckin = $4, datacheckout = $5, horacheckin = $6, horacheckout = $7 WHERE id_hospedagem = $8 RETURNING *',
            [nome, endereco, valor, datacheckin, datacheckout, horacheckin, horacheckout, id]
        );

        if (result.rowCount === 0) {
            return res.status(404).send('Hospedagem não encontrada.');
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao atualizar a hospedagem.');
    }
});

// Excluir hospedagem
app.delete('/hospedagem/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query('DELETE FROM hospedagem WHERE id_hospedagem = $1', [id]);

        if (result.rowCount === 0) {
            return res.status(404).send('Hospedagem não encontrada.');
        }

        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao excluir a hospedagem.');
    }
});

///////////////// TRANSPORTE //////////////

// Adicionar transporte
app.post('/transporte', async (req, res) => {
    const { tipoTransporte, id_viagem, numeroVoo, portaEmbarque, bagagem, empresa, hora, data, numeroLinha, plataformaEmbarque, restricoes, assento, numeroTrem, vagao, estacaoPartida, numeroAssento } = req.body;

    if (!id_viagem || !tipoTransporte) {
        return res.status(400).send('ID da viagem e tipo de transporte são obrigatórios.');
    }

    try {
        // Inserir transporte genérico
        const resultTransporte = await pool.query(
            'INSERT INTO transporte (tipo_transporte, id_viagem) VALUES ($1, $2) RETURNING id_transporte',
            [tipoTransporte, id_viagem]
        );
        
        const id_transporte = resultTransporte.rows[0].id_transporte;

        let query = '';
        let values = [];

        switch (tipoTransporte.toLowerCase()) {
            case 'aviao':
                query = 'INSERT INTO aviao (id_transporte, numero_voo, porta_embarque, bagagem, empresa, hora, data) VALUES ($1, $2, $3, $4, $5, $6, $7)';
                values = [id_transporte, numeroVoo, portaEmbarque, bagagem, empresa, hora, data];
                break;
            case 'onibus':
                query = 'INSERT INTO onibus (id_transporte, numerolinha, plataforma_embarque, restricoes, empresa, assento, hora, data) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
                values = [id_transporte, numeroLinha, plataformaEmbarque, restricoes, empresa, assento, hora, data];
                break;
            case 'trem':
                query = 'INSERT INTO trem (id_transporte, empresa, numero_trem, vagao, estacao_partida, numero_assento, hora, data) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
                values = [id_transporte, empresa, numeroTrem, vagao, estacaoPartida, numeroAssento, hora, data];
                break;
            default:
                return res.status(400).send('Tipo de transporte inválido.');
        }

        await pool.query(query, values);
        res.status(201).json({ id_transporte });
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao adicionar o transporte.');
    }
});

// Listar todos os transportes
app.get('/transporte', async (req, res) => {
    try {
        const resultAviao = await pool.query('SELECT *, \'aviao\' as tipoTransporte FROM aviao');
        const resultOnibus = await pool.query('SELECT *, \'onibus\' as tipoTransporte FROM onibus');
        const resultTrem = await pool.query('SELECT *, \'trem\' as tipoTransporte FROM trem');

        const transportes = [
            ...resultAviao.rows,
            ...resultOnibus.rows,
            ...resultTrem.rows
        ];

        res.status(200).json(transportes);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao buscar transportes.');
    }
});

// Listar transportes por tipo
app.get('/transporte/:tipo', async (req, res) => {
    const { tipo } = req.params;

    let query = '';

    switch (tipo) {
        case 'aviao':
            query = 'SELECT * FROM aviao';
            break;
        case 'onibus':
            query = 'SELECT * FROM onibus';
            break;
        case 'trem':
            query = 'SELECT * FROM trem';
            break;
        default:
            return res.status(400).send('Tipo de transporte inválido.');
    }

    try {
        const result = await pool.query(query);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao buscar transportes.');
    }
});

// Obter um transporte específico pelo ID e tipo
app.get('/transporte/:id/:tipo', async (req, res) => {
    const { id, tipo } = req.params;

    let query = '';

    switch (tipo) {
        case 'aviao':
            query = 'SELECT * FROM aviao WHERE id_transporte = $1';
            break;
        case 'onibus':
            query = 'SELECT * FROM onibus WHERE id_transporte = $1';
            break;
        case 'trem':
            query = 'SELECT * FROM trem WHERE id_transporte = $1';
            break;
        default:
            return res.status(400).send('Tipo de transporte inválido.');
    }

    try {
        const result = await pool.query(query, [id]);
        if (result.rows.length === 0) {
            return res.status(404).send('Transporte não encontrado.');
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao buscar transporte.');
    }
});

// Atualizar transporte
app.put('/transporte/:id/:tipo', async (req, res) => {
    const { id, tipo } = req.params;
    const { numeroVoo, portaEmbarque, bagagem, empresa, hora, data, numeroLinha, plataformaEmbarque, restricoes, assento, numeroTrem, vagao, estacaoPartida, numeroAssento } = req.body;

    console.log('Recebido na requisição:', req.body);
    console.log('ID do transporte:', id);
    console.log('Tipo do transporte:', tipo);

    let query = '';
    let values = [];

    switch (tipo) {
        case 'aviao':
            query = 'UPDATE aviao SET numero_voo = $1, porta_embarque = $2, bagagem = $3, empresa = $4, hora = $5, data = $6 WHERE id_transporte = $7 RETURNING *';
            values = [numeroVoo, portaEmbarque, bagagem, empresa, hora, data, id];
            break;
        case 'onibus':
            query = 'UPDATE onibus SET numerolinha = $1, plataforma_embarque = $2, restricoes = $3, empresa = $4, assento = $5, hora = $6, data = $7 WHERE id_transporte = $8 RETURNING *';
            values = [numeroLinha, plataformaEmbarque, restricoes, empresa, assento, hora, data, id];
            break;
        case 'trem':
            query = 'UPDATE trem SET empresa = $1, numero_trem = $2, vagao = $3, estacao_partida = $4, numero_assento = $5, hora = $6, data = $7 WHERE id_transporte = $8 RETURNING *';
            values = [empresa, numeroTrem, vagao, estacaoPartida, numeroAssento, hora, data, id];
            break;
        default:
            return res.status(400).send('Tipo de transporte inválido.');
    }

    try {
        const result = await pool.query(query, values);
        if (result.rowCount === 0) {
            return res.status(404).send('Transporte não encontrado.');
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao atualizar o transporte.');
    }
});

// Excluir transporte
app.delete('/transporte/:id/:tipo', async (req, res) => {
    const { id, tipo } = req.params;

    console.log('ID do transporte:', id);
    console.log('Tipo de transporte:', tipo);

    let query = '';

    switch (tipo) {
        case 'aviao':
            query = 'DELETE FROM aviao WHERE id_transporte = $1';
            break;
        case 'onibus':
            query = 'DELETE FROM onibus WHERE id_transporte = $1';
            break;
        case 'trem':
            query = 'DELETE FROM trem WHERE id_transporte = $1';
            break;
        default:
            return res.status(400).send('Tipo de transporte inválido.');
    }

    try {
        const result = await pool.query(query, [id]);
        if (result.rowCount === 0) {
            return res.status(404).send('Transporte não encontrado.');
        }
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao excluir o transporte.');
    }
});


app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

/////////////////ATIVIDADES//////////////

//adiciona atividade
app.post('/atividades', async (req, res) => {
    const { nome, data, descricao, endereco, valor } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO atividades (nome, data, descricao, endereco, valor) VALUES ($1, $2, $3, $4, $5) RETURNING id_atividade, nome, data, descricao, endereco, valor',
            [nome, data, descricao, endereco, valor]
        );

        const atividade = result.rows[0];
        res.status(201).json(atividade);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao adicionar a atividade.');
    }
});

//listar atividades
app.get('/atividades', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM atividades');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao buscar atividades.');
    }
});

//atualizar atividade
app.put('/atividades/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, data, descricao, endereco, valor } = req.body;

    try {
        const result = await pool.query(
            'UPDATE atividades SET nome = $1, data = $2, descricao = $3, endereco = $4, valor = $5 WHERE id_atividade = $6 RETURNING *',
            [nome, data, descricao, endereco, valor, id]
        );

        if (result.rowCount === 0) {
            return res.status(404).send('Atividade não encontrada.');
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao atualizar a atividade.');
    }
});

//excluir atividade
app.delete('/atividades/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query('DELETE FROM atividades WHERE id_atividade = $1', [id]);

        if (result.rowCount === 0) {
            return res.status(404).send('Atividade não encontrada.');
        }

        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao excluir a atividade.');
    }
});
