package com.disconnect.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

/**
 * Fábrica de Conexões responsável por gerenciar o ciclo de vida da comunicação
 * TCP/IP entre a JVM e o PostgreSQL.
 */
public class ConnectionFactory {

    // Constantes de conexão  (por enquanto tá hardcoded aqui)
    private static final String URL = "jdbc:postgresql://localhost:5432/disconnect_db";
    private static final String USER = "postgres";
    private static final String PASS = "uma_senha_qualquer";

    /**
     * Estabelece e retorna uma conexão física com o banco de dados.
     *
     * @return java.sql.Connection
     */
    public static Connection getConnection() {
        try {

            return DriverManager.getConnection(URL, USER, PASS);

        } catch (SQLException e) {

            throw new RuntimeException("Erro fatal de socket/autenticação ao conectar com o banco de dados: " + e.getMessage(), e);
        }
    }
}
