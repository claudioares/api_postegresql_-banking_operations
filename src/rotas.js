const express = require('express');
const { 
    cadastrarUsuario,
    obterPerfilDoUsuario
} = require('./controladores/usuario');
const {
    filtroDeAltenticacao
} = require('./intermediarios/autenticacao');
const login = require('./controladores/login');


const rotas = express();

rotas.post('/usuario', cadastrarUsuario);
rotas.post('/login', login);

rotas.use(filtroDeAltenticacao); //a partir daqui todas as rotas passaraõ pelo filtro

rotas.get('/usuario', obterPerfilDoUsuario);



module.exports = rotas;
