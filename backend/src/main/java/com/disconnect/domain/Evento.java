package com.disconnect.domain;

import java.time.LocalDateTime;
import java.util.List;

import com.disconnect.domain.enums.FrequenciaEvento;

public class Evento {

    private Integer id;
    private String nome;
    private LocalDateTime dataEvento;
    private String localizacao;
    private FrequenciaEvento frequencia;

    // Bruno, aqui sobre o relacionamento (1 Evento tem 1 Organizador) eu dei uma 'interpretada' no seu modelo relacional, dependendo, pode mudar
    private Usuario organizador;

    // Aqui nesse relacionamento (1 Evento tem Várias Categorias - M:N) também não sei se está exato
    private List<Modalidade> modalidades;

    private LocalDateTime dataCriacao;

    public Evento() {
    }

    public Evento(Integer id, String nome, LocalDateTime dataEvento, String localizacao, FrequenciaEvento frequencia, Usuario organizador) {
        this.id = id;
        this.nome = nome;
        this.dataEvento = dataEvento;
        this.localizacao = localizacao;
        this.frequencia = frequencia;
        this.organizador = organizador;
        this.dataCriacao = LocalDateTime.now();
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public LocalDateTime getDataEvento() {
        return dataEvento;
    }

    public void setDataEvento(LocalDateTime dataEvento) {
        this.dataEvento = dataEvento;
    }

    public String getLocalizacao() {
        return localizacao;
    }

    public void setLocalizacao(String localizacao) {
        this.localizacao = localizacao;
    }

    public FrequenciaEvento getFrequencia() {
        return frequencia;
    }

    public void setFrequencia(FrequenciaEvento frequencia) {
        this.frequencia = frequencia;
    }

    public Usuario getOrganizador() {
        return organizador;
    }

    public void setOrganizador(Usuario organizador) {
        this.organizador = organizador;
    }

    public List<Modalidade> getModalidades() {
        return modalidades;
    }

    public void setModalidades(List<Modalidade> modalidades) {
        this.modalidades = modalidades;
    }

    public LocalDateTime getDataCriacao() {
        return dataCriacao;
    }

    public void setDataCriacao(LocalDateTime dataCriacao) {
        this.dataCriacao = dataCriacao;
    }

}
