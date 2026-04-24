package com.disconnect.controller;

import static spark.Spark.get;
import static spark.Spark.post;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.disconnect.dto.EventoRequestDTO;
import com.disconnect.dto.EventoResponseDTO;
import com.disconnect.service.EventoService;
import com.google.gson.Gson;

public class EventoController {

    private final EventoService eventoService;
    private final Gson gson;

    public EventoController(EventoService eventoService, Gson gson) {
        this.eventoService = eventoService;
        this.gson = gson;
    }

    public void registerRoutes() {
        post("/api/eventos", (request, response) -> {
            response.type("application/json");

            try {
                String organizadorParam = request.queryParams("organizadorId");
                if (organizadorParam == null || organizadorParam.isBlank()) {
                    throw new IllegalArgumentException("O parametro organizadorId e obrigatorio.");
                }

                EventoRequestDTO dto = gson.fromJson(request.body(), EventoRequestDTO.class);
                if (dto == null) {
                    throw new IllegalArgumentException("Corpo da requisicao invalido.");
                }

                Integer organizadorId = Integer.parseInt(organizadorParam);
                EventoResponseDTO responseDto = new EventoResponseDTO(eventoService.criarEvento(organizadorId, dto));
                response.status(201);
                return gson.toJson(responseDto);
            } catch (IllegalArgumentException e) {
                response.status(400);
                return errorJson(e.getMessage());
            } catch (Exception e) {
                e.printStackTrace();
                response.status(500);
                return errorJson("Erro interno do servidor.");
            }
        });

        get("/api/eventos", (request, response) -> {
            response.type("application/json");

            try {
                String organizadorParam = request.queryParams("organizadorId");
                List<EventoResponseDTO> responseDtos;

                if (organizadorParam != null && !organizadorParam.isBlank()) {
                    Integer organizadorId = Integer.parseInt(organizadorParam);
                    responseDtos = eventoService.listarPorOrganizador(organizadorId).stream()
                            .map(EventoResponseDTO::new)
                            .collect(Collectors.toList());
                } else {
                    responseDtos = eventoService.listarTodos().stream()
                            .map(EventoResponseDTO::new)
                            .collect(Collectors.toList());
                }

                response.status(200);
                return gson.toJson(responseDtos);
            } catch (IllegalArgumentException e) {
                response.status(400);
                return errorJson(e.getMessage());
            } catch (Exception e) {
                e.printStackTrace();
                response.status(500);
                return errorJson("Erro interno do servidor.");
            }
        });

        get("/api/eventos/:id", (request, response) -> {
            response.type("application/json");

            try {
                Integer id = Integer.parseInt(request.params(":id"));
                EventoResponseDTO responseDto = new EventoResponseDTO(eventoService.buscarPorId(id));
                response.status(200);
                return gson.toJson(responseDto);
            } catch (IllegalArgumentException e) {
                response.status(400);
                return errorJson(e.getMessage());
            } catch (RuntimeException e) {
                response.status(404);
                return errorJson(e.getMessage());
            }
        });
    }

    private String errorJson(String message) {
        return gson.toJson(Map.of("erro", message));
    }
}