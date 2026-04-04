CREATE TABLE
    usuario (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(150) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        login VARCHAR(50) UNIQUE NOT NULL,
        senha VARCHAR(255) NOT NULL,
        idade INTEGER,
        biografia TEXT,
        data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );