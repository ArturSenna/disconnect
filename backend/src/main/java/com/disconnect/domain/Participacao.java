package com.disconnect.domain;

import java.time.LocalDateTime;

import com.disconnect.domain.enums.StatusParticipacao;

public class Participacao {

    private Integer id;
    private Usuario convidado; // Quem está pedindo para entrar
    private Evento evento;     // Em qual evento
    private StatusParticipacao status;
    private LocalDateTime dataSolicitacao;

    public Participacao() {
    }

    public Participacao(Usuario convidado, Evento evento) {
        this.convidado = convidado;
        this.evento = evento;
        this.status = StatusParticipacao.PENDENTE; // Status padrão ao criar 
        this.dataSolicitacao = LocalDateTime.now();
    }

    public void aprovar() {
        this.status = StatusParticipacao.APROVADO;
    }

    public void recusar() {
        this.status = StatusParticipacao.RECUSADO;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Usuario getConvidado() {
        return convidado;
    }

    public void setConvidado(Usuario convidado) {
        this.convidado = convidado;
    }

    public Evento getEvento() {
        return evento;
    }

    public void setEvento(Evento evento) {
        this.evento = evento;
    }

    public StatusParticipacao getStatus() {
        return status;
    }

    public void setStatus(StatusParticipacao status) {
        this.status = status;
    }

    public LocalDateTime getDataSolicitacao() {
        return dataSolicitacao;
    }

    public void setDataSolicitacao(LocalDateTime dataSolicitacao) {
        this.dataSolicitacao = dataSolicitacao;
    }

}
