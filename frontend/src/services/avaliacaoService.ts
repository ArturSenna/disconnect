import type { Avaliacao, CreateAvaliacaoDTO } from "@/types";

const BACKEND_UNAVAILABLE_MESSAGE =
  "Avaliacoes ainda nao estao disponiveis no backend.";

export const avaliacaoService = {
  async listByEvento(eventoId: number): Promise<Avaliacao[]> {
    void eventoId;
    return [];
  },

  async create(
    dto: CreateAvaliacaoDTO,
    avaliadorId: number,
  ): Promise<Avaliacao> {
    void dto;
    void avaliadorId;
    throw new Error(BACKEND_UNAVAILABLE_MESSAGE);
  },
};
