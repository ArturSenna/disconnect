CREATE TABLE
    categoria (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(100) UNIQUE NOT NULL,
        modalidade VARCHAR(100)
    );