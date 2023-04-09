const {
    query:bancoDeDados
} = require('../bancodedados/Config.BG/conexao');
const bcrypt = require('bcrypt');

const cadastrarUsuario = async (req, res) => {
    const {
        nome,
        email,
        senha
    } = req.body;


    if (!nome || !email || !senha) {
        return res.status(400).json({
            mensagem: 'Todos os campos são obrigatórios'
        });
    }

    try {
        
        const usuario = await bancoDeDados(
            'select * from usuarios where email = $1', [email]
            );
            
            
            if (usuario.rowCount > 0) {
                return res.status(400).json({
                    mensagem: 'Já existe um usuário cadastrado com esse email!'
                });
            };
            
            const senhaCriptografada = await bcrypt.hash(senha, 10);
            // construir a query de cadastro
            const queryDeCadastro = 'insert into usuarios(nome, email, senha) values ($1, $2, $3) returning *';
        
            const parametrosDeCadastro = [nome, email, senhaCriptografada];
            const usuarioCadastrado = await bancoDeDados(queryDeCadastro, parametrosDeCadastro);
            
            if (usuarioCadastrado.rowCount <= 0) {
                return res.status(500).json({
                    mensagem: `Erro interno: ${error.message}`
                });
            };
            
            const { senha: _, ...cadastro } = usuarioCadastrado.rows[0];
            
            return res.status(201).json(
                cadastro
                );
                
            } catch (error) {
                return res.status(500).json({
                    mensagem: `Erro interno: ${error.message}`
                });
            };
};
        
const obterPerfilDoUsuario = async (req, res) => {
    return res.json(req.usuario);
}

        
module.exports = {
    cadastrarUsuario,
    obterPerfilDoUsuario
};