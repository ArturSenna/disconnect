package com.disconnect.service;

import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Objects;

import com.disconnect.dao.EventoDAO;
import com.disconnect.dao.UsuarioDAO;
import com.disconnect.domain.Evento;
import com.disconnect.domain.Modalidade;
import com.disconnect.domain.Usuario;
import com.disconnect.dto.EventoRequestDTO;

public class EventoService {

    private final EventoDAO eventoDAO;
    private final UsuarioDAO usuarioDAO;

    public EventoService() {
        this.eventoDAO = new EventoDAO();
        this.usuarioDAO = new UsuarioDAO();
    }

    public Evento criarEvento(Integer organizadorId, EventoRequestDTO dto) {
        if (organizadorId == null || organizadorId <= 0) {
            throw new IllegalArgumentException("O ID do organizador e obrigatorio.");
        }

        if (dto == null) {
            throw new IllegalArgumentException("Os dados do evento sao obrigatorios.");
        }

        Usuario organizador = usuarioDAO.buscarPorId(organizadorId);
        if (organizador == null) {
            throw new IllegalArgumentException("Organizador nao encontrado.");
        }

        String nome = requireText(dto.getNome(), "O nome do evento e obrigatorio.");
        String descricao = requireText(dto.getDescricao(), "A descricao do evento e obrigatoria.");
        String local = requireText(dto.getLocal(), "O local do evento e obrigatorio.");

        if (dto.getFrequencia() == null) {
            throw new IllegalArgumentException("A frequencia do evento e obrigatoria.");
        }

        LocalDateTime dataEvento = parseDataEvento(dto.getDataEvento());
        if (!dataEvento.isAfter(LocalDateTime.now())) {
            throw new IllegalArgumentException("A data do evento deve ser futura.");
        }

        Integer quantMinima = requirePositiveInteger(dto.getQuantMinimaPessoas(), "A quantidade minima de participantes e obrigatoria.");
        Integer quantMaxima = requirePositiveInteger(dto.getQuantMaximaPessoas(), "A quantidade maxima de participantes e obrigatoria.");

        if (quantMinima > quantMaxima) {
            throw new IllegalArgumentException("A quantidade maxima deve ser maior ou igual a minima.");
        }

        List<Integer> modalidadeIds = sanitizeModalidadeIds(dto.getCategoriaIds());
        if (modalidadeIds.isEmpty()) {
            throw new IllegalArgumentException("Selecione ao menos uma modalidade.");
        }

        List<Modalidade> modalidades = eventoDAO.buscarModalidadesPorIds(modalidadeIds);
        if (modalidades.size() != modalidadeIds.size()) {
            throw new IllegalArgumentException("Uma ou mais modalidades informadas nao existem.");
        }

        if (dto.getFrequencia().name().equals("SEMANAL") && (dto.getDiasDaSemana() == null || dto.getDiasDaSemana().isEmpty())) {
            throw new IllegalArgumentException("Eventos semanais precisam informar ao menos um dia da semana.");
        }

        if (dto.getFrequencia().name().equals("MENSAL") && (dto.getDiasDoMes() == null || dto.getDiasDoMes().isEmpty())) {
            throw new IllegalArgumentException("Eventos mensais precisam informar ao menos um dia do mes.");
        }

        Evento evento = new Evento();
        evento.setNome(nome);
        evento.setDescricao(descricao);
        evento.setDataEvento(dataEvento);
        evento.setLocalizacao(local);
        evento.setFrequencia(dto.getFrequencia());
        evento.setUrlFoto(trimToNull(dto.getFotoUrl()));
        evento.setDiasDaSemana(dto.getDiasDaSemana() != null ? new ArrayList<>(dto.getDiasDaSemana()) : new ArrayList<>());
        evento.setDiasDoMes(dto.getDiasDoMes() != null ? new ArrayList<>(dto.getDiasDoMes()) : new ArrayList<>());
        evento.setQuantMinimaPessoas(quantMinima);
        evento.setQuantMaximaPessoas(quantMaxima);
        evento.setNivelDeHabilidade(requireText(dto.getNivelDeHabilidade(), "O nivel de habilidade e obrigatorio."));
        evento.setStatus(trimToNull(dto.getStatus()) != null ? dto.getStatus().trim() : "Ativo");
        evento.setOrganizador(organizador);
        evento.setModalidades(modalidades);
        return eventoDAO.inserir(evento, modalidadeIds);
    }

    public Evento buscarPorId(Integer id) {
        if (id == null || id <= 0) {
            throw new IllegalArgumentException("O ID do evento fornecido e invalido.");
        }

        Evento evento = eventoDAO.buscarPorId(id);
        if (evento == null) {
            throw new RuntimeException("Evento com o ID " + id + " nao foi encontrado.");
        }

        return evento;
    }

    public List<Evento> listarTodos() {
        return eventoDAO.listarTodos();
    }

    public List<Evento> listarPorOrganizador(Integer organizadorId) {
        if (organizadorId == null || organizadorId <= 0) {
            throw new IllegalArgumentException("O ID do organizador fornecido e invalido.");
        }
        return eventoDAO.listarPorOrganizador(organizadorId);
    }

    private String requireText(String value, String message) {
        if (value == null || value.trim().isEmpty()) {
            throw new IllegalArgumentException(message);
        }
        return value.trim();
    }

    private Integer requirePositiveInteger(Integer value, String message) {
        if (value == null || value <= 0) {
            throw new IllegalArgumentException(message);
        }
        return value;
    }

    private String trimToNull(String value) {
        if (value == null || value.trim().isEmpty()) {
            return null;
        }
        return value.trim();
    }

    private LocalDateTime parseDataEvento(String value) {
        if (value == null || value.isBlank()) {
            throw new IllegalArgumentException("A data do evento e obrigatoria.");
        }

        try {
            return OffsetDateTime.parse(value).toLocalDateTime();
        } catch (DateTimeParseException ignored) {
        }

        try {
            return LocalDateTime.parse(value);
        } catch (DateTimeParseException e) {
            throw new IllegalArgumentException("Formato de data do evento invalido.");
        }
    }

    private List<Integer> sanitizeModalidadeIds(List<Integer> categoriaIds) {
        if (categoriaIds == null) {
            return new ArrayList<>();
        }

        return categoriaIds.stream()
                .filter(Objects::nonNull)
                .collect(java.util.stream.Collectors.collectingAndThen(
                        java.util.stream.Collectors.toCollection(LinkedHashSet::new),
                        ArrayList::new));
    }
}