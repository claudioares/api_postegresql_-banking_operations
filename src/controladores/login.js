const {
    query:bancoDeDados
} = require('../bancodedados/Config.BG/conexao');
const tokenUsuario = require('../bancodedados/token/token');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({
            mensagem: 'Email e Senha são obrigatórios!'
        });
    }
    
    try {
        // recuperando os dados do usuario do banco de dados
        const { rowCount, rows } = await bancoDeDados('select * from usuarios where email = $1', [email]);
        if (rowCount <= 0) {
            return res.status(400).json({
                mensagem: 'Email ou Senha incorreto!'
            });
        }
        // 

        const [usuario] = rows;

        // validar senha
        const validarSenha = await bcrypt.compare(senha, usuario.senha);
        if (!validarSenha) {
            return res.status(400).json({
                mensagem: 'Email ou Senha incorreto!'
            });
        };
        //
        const token = jwt.sign({ id: usuario.id },  tokenUsuario , { expiresIn: '8h' });
        
        const {senha: _, ...dadosDoUsuario } = usuario;

        return res.status(200).json({
            usuario: dadosDoUsuario,
            token
        });

    } catch (error) {
        return res.status(500).json({
            mensagem: `Erro interno: ${error.message}`
        });
    }
}

module.exports = login;