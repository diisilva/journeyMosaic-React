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
