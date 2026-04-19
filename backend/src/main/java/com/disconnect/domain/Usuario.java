package com.disconnect.domain;

import java.time.LocalDateTime;

public class Usuario {

    private Integer id;
    private String nome;
    private String email;
    private String login;
    private String senha;
    private Integer idade;
    private String biografia;
    private String urlFoto;
    private Boolean IsAdmin;
    private LocalDateTime dataCriacao;

    public Usuario() {
    }

    public Usuario(Integer id, String nome, String email, String login, String senha, Integer idade, String biografia, String urlFoto, Boolean isAdmin) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.login = login;
        this.senha = senha;
        this.idade = idade;
        this.biografia = biografia;
        this.urlFoto = urlFoto;
        this.IsAdmin = isAdmin;
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public Integer getIdade() {
        return idade;
    }

    public void setIdade(Integer idade) {
        this.idade = idade;
    }

    public String getBiografia() {
        return biografia;
    }

    public void setBiografia(String biografia) {
        this.biografia = biografia;
    }

    public String getUrlFoto() {
        return urlFoto;
    }

    public void setUrlFoto(String urlFoto) {
        this.urlFoto = urlFoto;
    }

    public Boolean getIsAdmin() {
        return IsAdmin;
    }

    public void setIsAdmin(Boolean isAdmin) {
        IsAdmin = isAdmin;
    }

    public LocalDateTime getDataCriacao() {
        return dataCriacao;
    }

    public void setDataCriacao(LocalDateTime dataCriacao) {
        this.dataCriacao = dataCriacao;
    }

}
