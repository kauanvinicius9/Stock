CREATE DATABASE saep;

USE saep;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    email VARCHAR(100),
    senha VARCHAR(255)
);

CREATE TABLE produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    descricao TEXT,
    estoque_atual INT,
    estoque_minimo INT,
    peso DECIMAL(10,2),
    tamanho VARCHAR(50)
);

CREATE TABLE movimentacoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    produto_id INT,
    usuario_id INT,
    tipo ENUM('ENTRADA', 'SAIDA'),
    quantidade INT,
    data_movimentacao DATETIME,

    FOREIGN KEY (produto_id) REFERENCES produtos(id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);