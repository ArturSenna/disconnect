package com.disconnect.domain;

public class Categoria {

    private Integer id;
    private String nome;
    private String modalidade;

    public Categoria() {
    }

    public Categoria(Integer id, String nome, String modalidade) {
        this.id = id;
        this.nome = nome;
        this.modalidade = modalidade;
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

    public String getModalidade() {
        return modalidade;
    }

    public void setModalidade(String modalidade) {
        this.modalidade = modalidade;
    }

}
