CREATE TABLE
    evento_categoria (
        evento_id INTEGER NOT NULL,
        categoria_id INTEGER NOT NULL,
        PRIMARY KEY (evento_id, categoria_id),
        CONSTRAINT fk_ec_evento FOREIGN KEY (evento_id) REFERENCES evento (id) ON DELETE CASCADE,
        CONSTRAINT fk_ec_categoria FOREIGN KEY (categoria_id) REFERENCES categoria (id) ON DELETE CASCADE
    );

CREATE TABLE
    participacao (
        id SERIAL PRIMARY KEY,
        usuario_id INTEGER NOT NULL,
        evento_id INTEGER NOT NULL,
        status VARCHAR(20) DEFAULT 'PENDENTE',
        data_solicitacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_part_usuario FOREIGN KEY (usuario_id) REFERENCES usuario (id) ON DELETE CASCADE,
        CONSTRAINT fk_part_evento FOREIGN KEY (evento_id) REFERENCES evento (id) ON DELETE CASCADE,
        CONSTRAINT uk_usuario_evento UNIQUE (usuario_id, evento_id)
    );

CREATE TABLE
    avaliacao (
        id SERIAL PRIMARY KEY,
        avaliador_id INTEGER NOT NULL,
        evento_id INTEGER NOT NULL,
        nota INTEGER NOT NULL CHECK (
            nota >= 1
            AND nota <= 5
        ),
        comentario TEXT,
        data_avaliacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_aval_usuario FOREIGN KEY (avaliador_id) REFERENCES usuario (id) ON DELETE CASCADE,
        CONSTRAINT fk_aval_evento FOREIGN KEY (evento_id) REFERENCES evento (id) ON DELETE CASCADE
    );