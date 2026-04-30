package com.disconnect.controller;

import static spark.Spark.delete;
import static spark.Spark.get;
import static spark.Spark.post;
import static spark.Spark.put;

import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import com.disconnect.domain.Usuario;
import com.disconnect.dto.UsuarioResponseDTO;
import com.disconnect.service.UsuarioService;
import com.google.gson.Gson;

public class UsuarioController {

    private final UsuarioService usuarioService;
    private final Gson gson;

    public UsuarioController(UsuarioService usuarioService, Gson gson) {
        this.usuarioService = usuarioService;
        this.gson = gson;
    }

    public void registerRoutes() {
        post("/api/usuarios", (request, response) -> {
            response.type("application/json");

            try {
                Usuario usuarioDaRequisicao = gson.fromJson(request.body(), Usuario.class);
                if (usuarioDaRequisicao == null) {
                    throw new IllegalArgumentException("Corpo da requisicao invalido.");
                }

                Usuario usuarioCriado = usuarioService.registarUsuario(usuarioDaRequisicao);
                response.status(201);
                return gson.toJson(new UsuarioResponseDTO(usuarioCriado));
            } catch (IllegalArgumentException e) {
                response.status(400);
                return errorJson(e.getMessage());
            } catch (Exception e) {
                e.printStackTrace();
                response.status(500);
                return errorJson("Erro interno do servidor.");
            }
        });

        get("/api/usuarios", (request, response) -> {
            response.type("application/json");

            try {
                String nomeParam = request.queryParams("nome");
                if (nomeParam == null || nomeParam.trim().isEmpty()) {
                    response.status(400);
                    return errorJson("Forneca um parametro ?nome=");
                }

                List<UsuarioResponseDTO> resultados = usuarioService.buscarPorNome(nomeParam).stream()
                        .map(UsuarioResponseDTO::new)
                        .collect(Collectors.toList());
                response.status(200);
                return gson.toJson(resultados);
            } catch (IllegalArgumentException e) {
                response.status(400);
                return errorJson(e.getMessage());
            } catch (Exception e) {
                e.printStackTrace();
                response.status(500);
                return errorJson("Erro interno do servidor.");
            }
        });

        get("/api/usuarios/:id", (request, response) -> {
            response.type("application/json");

            try {
                Integer id = Integer.parseInt(request.params(":id"));
                Usuario usuario = usuarioService.buscarPorId(id);
                response.status(200);
                return gson.toJson(new UsuarioResponseDTO(usuario));
            } catch (IllegalArgumentException e) {
                response.status(400);
                return errorJson(e.getMessage());
            } catch (NoSuchElementException e) {
                response.status(404);
                return errorJson(e.getMessage());
            } catch (Exception e) {
                e.printStackTrace();
                response.status(500);
                return errorJson("Erro interno do servidor.");
            }
        });

        put("/api/usuarios/:id", (request, response) -> {
            response.type("application/json");

            try {
                Integer id = Integer.parseInt(request.params(":id"));
                Usuario dadosAtualizados = gson.fromJson(request.body(), Usuario.class);
                if (dadosAtualizados == null) {
                    throw new IllegalArgumentException("Corpo da requisicao invalido.");
                }

                Usuario usuarioSalvo = usuarioService.atualizarUsuario(id, dadosAtualizados);
                response.status(200);
                return gson.toJson(new UsuarioResponseDTO(usuarioSalvo));
            } catch (IllegalArgumentException e) {
                response.status(400);
                return errorJson(e.getMessage());
            } catch (NoSuchElementException e) {
                response.status(404);
                return errorJson(e.getMessage());
            } catch (Exception e) {
                e.printStackTrace();
                response.status(500);
                return errorJson("Erro interno do servidor.");
            }
        });

        delete("/api/usuarios/:id", (request, response) -> {
            response.type("application/json");

            try {
                Integer id = Integer.parseInt(request.params(":id"));
                usuarioService.eliminarUsuario(id);
                response.status(204);
                return "";
            } catch (IllegalArgumentException e) {
                response.status(400);
                return errorJson(e.getMessage());
            } catch (NoSuchElementException e) {
                response.status(404);
                return errorJson(e.getMessage());
            } catch (Exception e) {
                e.printStackTrace();
                response.status(500);
                return errorJson("Erro interno do servidor.");
            }
        });
    }

    private String errorJson(String message) {
        return gson.toJson(Map.of("erro", message));
    }
}
