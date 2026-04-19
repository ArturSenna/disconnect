package com.disconnect.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.disconnect.domain.Usuario;
import com.disconnect.dto.UsuarioResponseDTO;
import com.disconnect.service.UsuarioService;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonDeserializer;
import com.google.gson.JsonPrimitive;
import com.google.gson.JsonSerializer; // Sim, tem uma biblioteca chamada Gson com G KKKKK O cara que pensou nisso deve ter se sentido um Jên...Gênio. Mas enfim, ela serve pra traduzir Json. Nativamente o Java não traduz. Lembrem que o controller que converte o objeto java pro front em formato de Json já tratado e bonitinho

// Endpoint de rede para a entidade Usuario. Mapeia a URL base "/api/usuarios/*", para interceptar requisições do React.
@WebServlet("/api/usuarios/*")
public class UsuarioController extends HttpServlet {

    private UsuarioService usuarioService;
    private Gson gson;

    // O método init() é chamado pelo servidor (ex: Tomcat) quando ele "liga", porque o back que fica "ouvindo" e o front "chamando".
    @Override
    public void init() throws ServletException {
        this.usuarioService = new UsuarioService();
        this.gson = new GsonBuilder()
                .registerTypeAdapter(LocalDateTime.class, (JsonSerializer<LocalDateTime>) (src, typeOfSrc, context)
                        -> new JsonPrimitive(src.toString())) // Na hora de virar JSON, converte a data para String
                .registerTypeAdapter(LocalDateTime.class, (JsonDeserializer<LocalDateTime>) (json, typeOfT, context)
                        -> LocalDateTime.parse(json.getAsString())) // Na hora de ler o JSON, converte a String para Data
                .create();
    }

    private void setAccessControlHeaders(HttpServletResponse resp) {
        resp.setHeader("Access-Control-Allow-Origin", "http://localhost:5173"); // Permite que o Vite converse com o Java
        resp.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        resp.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    }

    // Navegadores fazem uma requisição OPTIONS "fantasma" antes de qualquer POST/PUT/DELETE.
    // O Controller precisa responder 200 OK para essa requisição fantasma.
    @Override
    protected void doOptions(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        setAccessControlHeaders(resp);
        resp.setStatus(HttpServletResponse.SC_OK);
    }

    // CREATE ('C' do Crud): POST /api/usuarios
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        setAccessControlHeaders(resp);
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        try {
            // Lê o JSON que veio do corpo (body) da requisição HTTP (enviado pelo React)
            BufferedReader reader = req.getReader();

            // Transforma o texto JSON da internet no objeto Java 'Usuario'
            Usuario usuarioDaRequisicao = gson.fromJson(reader, Usuario.class);

            // Entrega o objeto para o Service validar as regras de negócio
            Usuario usuarioCriado = usuarioService.registarUsuario(usuarioDaRequisicao);

            // Se deu certo, transforma o objeto de volta em JSON e envia com código 201 (Created)
            resp.setStatus(HttpServletResponse.SC_CREATED);
            UsuarioResponseDTO dto = new UsuarioResponseDTO(usuarioCriado);
            resp.getWriter().write(gson.toJson(dto));

        } catch (IllegalArgumentException e) {
            // Se o Service lançou o "Fail Fast" (ex: e-mail sem '@'), o Controller, devolve um Erro 400 avisando que a culpa é do usuário
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            resp.getWriter().write("{\"erro\": \"" + e.getMessage() + "\"}");
        } catch (Exception e) {
            // Se o banco de dados cair, devolvemos 500 (Internal Server Error)
            e.printStackTrace();
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            resp.getWriter().write("{\"erro\": \"Erro interno do servidor.\"}");
        }
    }

    // READ: GET ('R' do Crud) /api/usuarios/12  (Por ID)  OU   GET /api/usuarios?nome=Julia
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        setAccessControlHeaders(resp);
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        try {
            String pathInfo = req.getPathInfo(); // Pega o que vem depois de /api/usuarios/
            String nomeParam = req.getParameter("nome"); // Pega o que vem depois do ?nome=

            if (nomeParam != null && !nomeParam.trim().isEmpty()) {

                // Rota: Busca por Nome (O normal de pesquisar no Front)
                List<Usuario> resultados = usuarioService.buscarPorNome(nomeParam);
                resp.getWriter().write(gson.toJson(resultados));
                resp.setStatus(HttpServletResponse.SC_OK);

            } else if (pathInfo != null && pathInfo.length() > 1) {
                // Rota: Busca por ID (ex: extrai o '12' de "/12")
                Integer id = Integer.parseInt(pathInfo.substring(1));
                Usuario usuario = usuarioService.buscarPorId(id);
                resp.getWriter().write(gson.toJson(usuario));
                resp.setStatus(HttpServletResponse.SC_OK);

            } else {
                resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                resp.getWriter().write("{\"erro\": \"Forneça um ID na URL ou um parâmetro ?nome=\"}");
            }

        } catch (RuntimeException e) {
            // Se o Service não achar o usuário, devolvemos o clássico Erro 404 (Not Found)
            resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
            resp.getWriter().write("{\"erro\": \"" + e.getMessage() + "\"}");
        }
    }

    // UPDATE: PUT ('U' do Crud) /api/usuarios/12
    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        setAccessControlHeaders(resp);
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        try {
            String pathInfo = req.getPathInfo();
            if (pathInfo == null || pathInfo.length() <= 1) {
                throw new IllegalArgumentException("ID do utilizador é obrigatório para atualização.");
            }

            Integer id = Integer.parseInt(pathInfo.substring(1));
            BufferedReader reader = req.getReader();
            Usuario dadosAtualizados = gson.fromJson(reader, Usuario.class);

            Usuario usuarioSalvo = usuarioService.atualizarUsuario(id, dadosAtualizados);

            resp.setStatus(HttpServletResponse.SC_OK); // 200 OK
            resp.getWriter().write(gson.toJson(usuarioSalvo));

        } catch (IllegalArgumentException e) {
            // Cai aqui se o ID não for passado na URL (Erro do Front)
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST); // HTTP 400
            resp.getWriter().write("{\"erro\": \"" + e.getMessage() + "\"}");

        } catch (RuntimeException e) {
            // Cai aqui se o UsuarioService não encontrar o ID no banco
            resp.setStatus(HttpServletResponse.SC_NOT_FOUND); // HTTP 404
            resp.getWriter().write("{\"erro\": \"" + e.getMessage() + "\"}");
        }
    }

    // DELETE: ('D' do Crud) /api/usuarios/12
    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        setAccessControlHeaders(resp);
        resp.setContentType("application/json");

        try {
            String pathInfo = req.getPathInfo();
            if (pathInfo == null || pathInfo.length() <= 1) {
                throw new IllegalArgumentException("ID do utilizador é obrigatório para exclusão.");
            }

            Integer id = Integer.parseInt(pathInfo.substring(1));
            usuarioService.eliminarUsuario(id);

            resp.setStatus(HttpServletResponse.SC_NO_CONTENT); // Código 204: Deletado com sucesso, não há mais dados para exibir.

        } catch (RuntimeException e) {
            resp.setStatus(HttpServletResponse.SC_NOT_FOUND); // 404
            resp.getWriter().write("{\"erro\": \"" + e.getMessage() + "\"}");
        }
    }
}
