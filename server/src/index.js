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


app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

/////////////////HOSPEDAGEMM//////////////

//adiciona hospedagem
app.post('/hospedagem', async (req, res) => {
    const { nome, endereco, valor, datacheckin, datacheckout, horacheckin, horacheckout} = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO hospedagem (nome, endereco, valor, datacheckin, datacheckout, horacheckin, horacheckout) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id_hospedagem, nome, endereco, valor, datacheckin, datacheckout, horacheckin, horacheckout',
            [nome, endereco, valor, datacheckin, datacheckout, horacheckin, horacheckout]
        );

        const hospedagem = result.rows[0];
        res.status(201).json(hospedagem);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao adicionar a hospedagem.');
    }
});

//listar hospedagens
app.get('/hospedagem', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM hospedagem');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao buscar hospedagens.');
    }
});

//atualizar hospedagem a
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

//excluir hospedagem
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
