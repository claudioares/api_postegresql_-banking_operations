const { query: bancoDeDados } = require('../bancodedados/Config.BG/conexao');
const jwt = require('jsonwebtoken');
const tokenUsuario = require('../bancodedados/token/token');


const filtroDeAltenticacao = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({
            mensagem: 'Não autorizado!'
        });
    };


    try {

        const token = authorization.replace('Bearer ', '').trim();

        const { id } = jwt.verify(token, tokenUsuario);

        const { rowCount, rows } = await bancoDeDados('select * from usuarios where id = $1', [id]);
        if (rowCount <= 0) {
            return res.status(401).json({
                mensagem: 'Não autorizado!'
            });
        };

        const [usuario] = rows;

        const {senha: _, ...dadosDoUsuario } = usuario;

        req.usuario = dadosDoUsuario;


        next();

    } catch (error) {
        return res.status(500).json({
            mensagem: `Erro interno: ${error.message}`
        });
    }
};


module.exports = {
    filtroDeAltenticacao
};