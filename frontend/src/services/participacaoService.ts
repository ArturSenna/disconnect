import type { Participacao, CreateParticipacaoDTO } from "@/types";

const BACKEND_UNAVAILABLE_MESSAGE =
  "Participacoes ainda nao estao disponiveis no backend.";

export const participacaoService = {
  async listByEvento(eventoId: number): Promise<Participacao[]> {
    void eventoId;
    return [];
  },

  async listByUsuario(usuarioId: number): Promise<Participacao[]> {
    void usuarioId;
    return [];
  },

  async create(
    dto: CreateParticipacaoDTO,
    usuarioId: number,
  ): Promise<Participacao> {
    void dto;
    void usuarioId;
    throw new Error(BACKEND_UNAVAILABLE_MESSAGE);
  },

  async approve(id: number): Promise<Participacao> {
    void id;
    throw new Error(BACKEND_UNAVAILABLE_MESSAGE);
  },

  async reject(id: number): Promise<Participacao> {
    void id;
    throw new Error(BACKEND_UNAVAILABLE_MESSAGE);
  },
};
