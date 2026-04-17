CREATE TABLE
    Usuario (
        Id_usuario SERIAL, -- aqui é SERIAL, não int Bruno, porque o postgresql completa/incrementa os ids "automaticamente".
        Nome varchar(100) NOT NULL,
        Email varchar(100) UNIQUE NOT NULL,
        Senha varchar(30) NOT NULL,
        Idade int,
        Bio varchar(300),
        Url_foto varchar(300),
        Is_admin boolean DEFAULT false -- aqui acho que precisa pra minha tarefa de acesso administrativo, mas não tenho certeza
    );

CREATE TABLE
    Evento (
        Id_evento SERIAL, -- também serial (todo id (que não seja fk) tem que ser incrementado pelo SGBD automaticamente)
        Nome varchar(100) NOT NULL,
        Data_evento date NOT NULL,
        Localizacao varchar(100) NOT NULL,
        Frequencia varchar(20),
        Id_organizador int NOT NULL
    );

CREATE TABLE
    Categoria (
        Id_categoria SERIAL,
        Nivel varchar(20),
        Favoritar boolean,
        Modalidade varchar(20),
        Nome varchar(100) NOT NULL
    );

CREATE TABLE
    Categoria_evento (Id_evento int, Id_categoria int);

CREATE TABLE
    Participacao (
        Id_evento int,
        Id_usuario int,
        Status varchar(20) DEFAULT 'PENDENTE'
    );

CREATE TABLE
    Avaliacao (
        Id_evento int,
        Id_usuario_avaliador int,
        Id_usuario_avaliado int,
        Aperfil int,
        Aevento int
    );

------------------- Definição das chaves primarias ----------------------
ALTER TABLE Usuario ADD CONSTRAINT pk_usuario PRIMARY KEY (Id_usuario);

ALTER TABLE Evento ADD CONSTRAINT pk_evento PRIMARY KEY (Id_evento);

ALTER TABLE Categoria ADD CONSTRAINT pk_categoria PRIMARY KEY (Id_categoria);

ALTER TABLE Categoria_evento ADD CONSTRAINT pk_categoria_evento PRIMARY KEY (Id_evento, Id_categoria);

ALTER TABLE Participacao ADD CONSTRAINT pk_participacao PRIMARY KEY (Id_evento, Id_usuario);

ALTER TABLE Avaliacao ADD CONSTRAINT pk_avaliacao PRIMARY KEY (
    Id_evento,
    Id_usuario_avaliador,
    Id_usuario_avaliado
);

------------------------- Fim da definição das primarias --------------------
------------------------- Definição das estrangeiras ------------------------
ALTER TABLE Evento ADD CONSTRAINT fk_evento_usuario FOREIGN KEY (Id_organizador) REFERENCES Usuario (Id_usuario) ON DELETE CASCADE; -- coloquei ON DELETE CASCADE porque se você apaga o Usuario que cria o evento, automaticamente vai apagar aquele evento

ALTER TABLE Categoria_evento ADD CONSTRAINT fk_categoria_evento FOREIGN KEY (Id_evento) REFERENCES Evento (Id_evento) ON DELETE CASCADE; -- aqui também, apagou o evento, apaga a relação dele com Categoria

ALTER TABLE Categoria_evento ADD CONSTRAINT fk_evento_categoria FOREIGN KEY (Id_categoria) REFERENCES Categoria (Id_categoria) ON DELETE CASCADE;

ALTER TABLE Participacao ADD CONSTRAINT fk_participacao_evento FOREIGN KEY (Id_evento) REFERENCES Evento (Id_evento) ON DELETE CASCADE;

ALTER TABLE Participacao ADD CONSTRAINT fk_participacao_usuario FOREIGN KEY (Id_usuario) REFERENCES Usuario (Id_usuario) ON DELETE CASCADE;

ALTER TABLE Avaliacao ADD CONSTRAINT fk_avaliacao_evento FOREIGN KEY (Id_evento) REFERENCES Evento (Id_evento) ON DELETE CASCADE;

ALTER TABLE Avaliacao ADD CONSTRAINT fk_avaliador FOREIGN KEY (Id_usuario_avaliador) REFERENCES Usuario (Id_usuario);

ALTER TABLE Avaliacao ADD CONSTRAINT fk_avaliado FOREIGN KEY (Id_usuario_avaliado) REFERENCES Usuario (Id_usuario);

------------------------- Fim da definição das estrangeiras --------------------