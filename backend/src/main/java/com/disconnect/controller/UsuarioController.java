package com.disconnect.controller;

import java.util.List;
import java.util.stream.Collectors;

import com.disconnect.domain.Usuario;
import com.disconnect.dto.UsuarioResponseDTO;
import com.disconnect.service.UsuarioService;
import com.google.gson.Gson;

import static spark.Spark.delete;
import static spark.Spark.get;
import static spark.Spark.post;
import static spark.Spark.put;

public class UsuarioController {

    private final UsuarioService usuarioService;
    private final Gson gson;

    public UsuarioController(UsuarioService usuarioService, Gson gson) {
        this.usuarioService = usuarioService;
        this.gson = gson;
    }

    public void registerRoutes() {

        post("/api/usuarios", (req, res) -> {
            try {
                Usuario usuarioDaRequisicao = gson.fromJson(req.body(), Usuario.class);

                Usuario usuarioCriado = usuarioService.registarUsuario(usuarioDaRequisicao);

                res.status(201);
                return gson.toJson(new UsuarioResponseDTO(usuarioCriado));

            } catch (IllegalArgumentException e) {
                res.status(400);
                return erro(e.getMessage());

            } catch (Exception e) {
                e.printStackTrace();
                res.status(500);
                return erro("Erro interno do servidor.");
            }
        });

        get("/api/usuarios/:id", (req, res) -> {
            try {
                Integer id = Integer.parseInt(req.params(":id"));

                Usuario usuario = usuarioService.buscarPorId(id);

                res.status(200);
                return gson.toJson(new UsuarioResponseDTO(usuario));

            } catch (NumberFormatException e) {
                res.status(400);
                return erro("ID inválido.");

            } catch (RuntimeException e) {
                res.status(404);
                return erro(e.getMessage());
            }
        });

        get("/api/usuarios", (req, res) -> {
            try {
                String nome = req.queryParams("nome");

                if (nome == null || nome.trim().isEmpty()) {
                    res.status(400);
                    return erro("Forneça o parâmetro ?nome=");
                }

                List<Usuario> usuarios = usuarioService.buscarPorNome(nome);

                List<UsuarioResponseDTO> resposta = usuarios.stream()
                        .map(UsuarioResponseDTO::new)
                        .collect(Collectors.toList());

                res.status(200);
                return gson.toJson(resposta);

            } catch (IllegalArgumentException e) {
                res.status(400);
                return erro(e.getMessage());

            } catch (RuntimeException e) {
                res.status(500);
                return erro("Erro ao buscar usuários.");
            }
        });

        put("/api/usuarios/:id", (req, res) -> {
            try {
                Integer id = Integer.parseInt(req.params(":id"));

                Usuario dadosAtualizados = gson.fromJson(req.body(), Usuario.class);

                Usuario usuarioSalvo = usuarioService.atualizarUsuario(id, dadosAtualizados);

                res.status(200);
                return gson.toJson(new UsuarioResponseDTO(usuarioSalvo));

            } catch (NumberFormatException e) {
                res.status(400);
                return erro("ID inválido.");

            } catch (IllegalArgumentException e) {
                res.status(400);
                return erro(e.getMessage());

            } catch (RuntimeException e) {
                res.status(404);
                return erro(e.getMessage());
            }
        });

        delete("/api/usuarios/:id", (req, res) -> {
            try {
                Integer id = Integer.parseInt(req.params(":id"));

                usuarioService.eliminarUsuario(id);

                res.status(204);
                return "";

            } catch (NumberFormatException e) {
                res.status(400);
                return erro("ID inválido.");

            } catch (RuntimeException e) {
                res.status(404);
                return erro(e.getMessage());
            }
        });
    }

    private String erro(String mensagem) {
        return gson.toJson(new MensagemErro(mensagem));
    }

    private static class MensagemErro {

        private final String erro;

        private MensagemErro(String erro) {
            this.erro = erro;
        }
    }
}
