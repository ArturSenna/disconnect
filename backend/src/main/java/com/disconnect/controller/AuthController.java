package com.disconnect.controller;

import com.disconnect.domain.Usuario;
import com.disconnect.dto.LoginDTO;
import com.disconnect.dto.UsuarioResponseDTO;
import com.disconnect.service.UsuarioService;
import com.google.gson.Gson;

import static spark.Spark.post;

public class AuthController {

    private final UsuarioService usuarioService;
    private final Gson gson;

    public AuthController(UsuarioService usuarioService, Gson gson) {
        this.usuarioService = usuarioService;
        this.gson = gson;
    }

    public void registerRoutes() {
        post("/api/login", (req, res) -> {
            try {
                LoginDTO loginDTO = gson.fromJson(req.body(), LoginDTO.class);

                Usuario usuarioLogado = usuarioService.autenticar(
                        loginDTO.getLogin(),
                        loginDTO.getSenha()
                );

                res.status(200);
                return gson.toJson(new UsuarioResponseDTO(usuarioLogado));

            } catch (IllegalArgumentException e) {
                res.status(401);
                return erro(e.getMessage());

            } catch (Exception e) {
                e.printStackTrace();
                res.status(500);
                return erro("Erro interno do servidor.");
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
