DROP TABLE IF EXISTS usuarios;

CREATE TABLE usuarios (
    id serial primary key,
    nome text NOT NULL,
    email text NOT NULL UNIQUE,
    senha text NOT NULL
);

DROP TABLE IF EXISTS Categorias;

CREATE TABLE Categorias (
    id serial primary key,
    descricao text
);

DROP TABLE IF EXISTS transacoes;

CREATE TABLE transacoes (
    id serial primary key,
    descricao text,
    valor integer NOT NULL,
    data timestamp NOT NULL,
    categoria_id integer NOT NULL,
    usuario_id integer NOT NULL,
    tipo text NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios (id),
    FOREIGN KEY (usuario_id) REFERENCES categorias (id)
);