package com.disconnect.dto;

import java.time.LocalDateTime;

import com.disconnect.domain.Usuario;

// O DTO iltra dados sensíveis e manda apenas o necessário para o front. É a mesma coisa de Usuario.java só que com atributos a menos
public class UsuarioResponseDTO {

    private Integer id;
    private String nome;
    private String email;
    private String login; // O "@username"
    private Integer idade;
    private String biografia;
    private String urlFoto;
    private LocalDateTime dataCriacao;

    public UsuarioResponseDTO() {
    }

    public UsuarioResponseDTO(Usuario usuario) {
        this.id = usuario.getId();
        this.nome = usuario.getNome();
        this.email = usuario.getEmail();
        this.login = usuario.getLogin();
        this.idade = usuario.getIdade();
        this.biografia = usuario.getBiografia();
        this.urlFoto = usuario.getUrlFoto();
        this.dataCriacao = usuario.getDataCriacao();
    }

    public Integer getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public String getEmail() {
        return email;
    }

    public String getLogin() {
        return login;
    }

    public Integer getIdade() {
        return idade;
    }

    public String getBiografia() {
        return biografia;
    }

    public String getUrlFoto() {
        return urlFoto;
    }

    public LocalDateTime getDataCriacao() {
        return dataCriacao;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public void setIdade(Integer idade) {
        this.idade = idade;
    }

    public void setBiografia(String biografia) {
        this.biografia = biografia;
    }

    public void setUrlFoto(String urlFoto) {
        this.urlFoto = urlFoto;
    }

    public void setDataCriacao(LocalDateTime dataCriacao) {
        this.dataCriacao = dataCriacao;
    }
}
