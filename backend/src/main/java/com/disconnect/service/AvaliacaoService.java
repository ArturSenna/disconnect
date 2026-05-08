
package com.disconnect.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;

import com.disconnect.dao.AvaliacaoDAO;
import com.disconnect.domain.Avaliacao;


public class AvaliacaoService {

   
    private AvaliacaoDAO avaliacaoDAO;

    public AvaliacaoService() {
        this.avaliacaoDAO = new AvaliacaoDAO();
    }

  
    public Avaliacao registrarAvaliacao(Avaliacao avaliacao) {
     

        if (avaliacao.getAvaliador() == null || avaliacao.getAvaliador().getId() == null) {
            throw new IllegalArgumentException("A avaliação deve obrigatoriamente estar associada a um avaliador (Usuário).");
        }

        if (avaliacao.getEvento() == null || avaliacao.getEvento().getId() == null) {
            throw new IllegalArgumentException("A avaliação deve obrigatoriamente estar associada a um Evento.");
        }

        if (avaliacao.getNota() == null || avaliacao.getNota() < 1 || avaliacao.getNota() > 5) {
            throw new IllegalArgumentException("A nota da avaliação deve ser um valor entre 1 e 5.");
        }
        
        
        if (avaliacao.getDataAvaliacao() == null) {
            avaliacao.setDataAvaliacao(LocalDateTime.now());
        }

        if (avaliacao.getComentario() != null) {
        
            String comentarioLimpo = avaliacao.getComentario().trim(); 
            
           
            if (comentarioLimpo.isEmpty()) {
                avaliacao.setComentario(null);
            } else if (comentarioLimpo.length() > 250) { 
               
                throw new IllegalArgumentException("O comentário não pode exceder 250 caracteres.");
            } else {
              
                avaliacao.setComentario(comentarioLimpo);
            }
        }

      
        return avaliacaoDAO.inserir(avaliacao);
    }


    public Avaliacao buscarPorId(Integer id) {
        if (id == null || id <= 0) {
            throw new IllegalArgumentException("O ID da avaliação fornecido é inválido.");
        }

        Avaliacao avaliacaoEncontrada = avaliacaoDAO.buscarPorId(id);

        if (avaliacaoEncontrada == null) {
            throw new NoSuchElementException("Avaliação com o ID " + id + " não foi encontrada na base de dados.");
        }

        return avaliacaoEncontrada;
    }

   
    public List<Avaliacao> buscarPorEvento(Integer idEvento) {
        
        if (idEvento == null || idEvento <= 0) {
            throw new IllegalArgumentException("O ID do evento fornecido é inválido.");
        }

    
        List<Avaliacao> resultados = avaliacaoDAO.buscarPorEvento(idEvento);

     
        return resultados;
    }

    public Avaliacao atualizarAvaliacao(Integer id, Avaliacao dadosAtualizados) {
   
        Avaliacao avaliacaoExistente = this.buscarPorId(id);

       
        if (dadosAtualizados.getNota() != null) {
            if (dadosAtualizados.getNota() < 1 || dadosAtualizados.getNota() > 5) {
                throw new IllegalArgumentException("A nova nota da avaliação deve ser um valor entre 1 e 5.");
            }
            avaliacaoExistente.setNota(dadosAtualizados.getNota());
        }

       
        if (dadosAtualizados.getComentario() != null) {
            avaliacaoExistente.setComentario(dadosAtualizados.getComentario());
        }

  
        avaliacaoExistente.setDataAvaliacao(LocalDateTime.now());

       
        boolean sucesso = avaliacaoDAO.atualizar(avaliacaoExistente);

        if (!sucesso) {
            throw new RuntimeException("Falha interna ao tentar atualizar os dados da avaliação.");
        }

        return avaliacaoExistente;
    }

   
    public void eliminarAvaliacao(Integer id) {
  
        this.buscarPorId(id);

        boolean sucesso = avaliacaoDAO.deletar(id);

        if (!sucesso) {
            throw new RuntimeException("Falha ao eliminar a avaliação. Tente novamente mais tarde.");
        }
    }
}