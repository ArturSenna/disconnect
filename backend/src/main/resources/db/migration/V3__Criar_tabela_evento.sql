CREATE TABLE
    evento (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(200) NOT NULL,
        data_evento TIMESTAMP NOT NULL,
        local VARCHAR(255) NOT NULL,
        frequencia VARCHAR(50),
        organizador_id INTEGER NOT NULL,
        data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_evento_organizador FOREIGN KEY (organizador_id) REFERENCES usuario (id) ON DELETE CASCADE
    );