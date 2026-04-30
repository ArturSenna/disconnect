package com.disconnect.controller;

import static spark.Spark.get;
import static spark.Spark.post;

import java.util.Map;

import com.disconnect.domain.Usuario;
import com.disconnect.dto.LoginDTO;
import com.disconnect.dto.UsuarioResponseDTO;
import com.disconnect.service.UsuarioService;
import com.google.gson.Gson;

public class AuthController {

    private final UsuarioService usuarioService;
    private final Gson gson;

    public AuthController(UsuarioService usuarioService, Gson gson) {
        this.usuarioService = usuarioService;
        this.gson = gson;
    }

    public void registerRoutes() {
        get("/api/login", (request, response) -> {
            response.type("application/json");
            response.status(405);
            return errorJson("Use POST /api/login para autenticar.");
        });

        post("/api/login", (request, response) -> {
            response.type("application/json");

            try {
                LoginDTO loginDTO = gson.fromJson(request.body(), LoginDTO.class);
                if (loginDTO == null) {
                    throw new IllegalArgumentException("Corpo da requisicao invalido.");
                }

                Usuario usuarioLogado = usuarioService.autenticar(loginDTO.getLogin(), loginDTO.getSenha());
                response.status(200);
                return gson.toJson(new UsuarioResponseDTO(usuarioLogado));
            } catch (IllegalArgumentException e) {
                response.status(401);
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
