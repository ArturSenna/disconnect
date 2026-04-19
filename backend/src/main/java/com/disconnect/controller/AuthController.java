package com.disconnect.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.time.LocalDateTime;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.disconnect.domain.Usuario;
import com.disconnect.dto.LoginDTO;
import com.disconnect.dto.UsuarioResponseDTO;
import com.disconnect.service.UsuarioService;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonDeserializer;
import com.google.gson.JsonPrimitive;
import com.google.gson.JsonSerializer;

@WebServlet("/api/login")
public class AuthController extends HttpServlet {

    private UsuarioService usuarioService;
    private Gson gson;

    @Override
    public void init() throws ServletException {
        this.usuarioService = new UsuarioService();
        this.gson = new GsonBuilder()
                .registerTypeAdapter(LocalDateTime.class, (JsonSerializer<LocalDateTime>) (src, typeOfSrc, context) -> new JsonPrimitive(src.toString()))
                .registerTypeAdapter(LocalDateTime.class, (JsonDeserializer<LocalDateTime>) (json, typeOfT, context) -> LocalDateTime.parse(json.getAsString()))
                .create();
    }

    private void setAccessControlHeaders(HttpServletResponse resp) {
        resp.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
        resp.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
        resp.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    }

    @Override
    protected void doOptions(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        setAccessControlHeaders(resp);
        resp.setStatus(HttpServletResponse.SC_OK);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        setAccessControlHeaders(resp);
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        try {
            BufferedReader reader = req.getReader();
            // Transforma o JSON no LoginDTO
            LoginDTO loginDTO = gson.fromJson(reader, LoginDTO.class);

            // Passa pelo Service
            Usuario usuarioLogado = usuarioService.autenticar(loginDTO.getLogin(), loginDTO.getSenha());

            // Devolve o DTO limpo e sem a senha (Status 200 OK)
            UsuarioResponseDTO dto = new UsuarioResponseDTO(usuarioLogado);
            resp.setStatus(HttpServletResponse.SC_OK);
            resp.getWriter().write(gson.toJson(dto));

        } catch (IllegalArgumentException e) {

            // Erro 401 Unauthorized (Credenciais Inválidas)
            resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            resp.getWriter().write("{\"erro\": \"" + e.getMessage() + "\"}");
        } catch (Exception e) {
            e.printStackTrace();
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            resp.getWriter().write("{\"erro\": \"Erro interno do servidor.\"}");
        }
    }
}
