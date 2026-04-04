import type { Avaliacao, CreateAvaliacaoDTO } from "@/types";
import { mockAvaliacoes, mockUsuarios, mockEventos } from "@/mocks/data";

const delay = (ms = 400) => new Promise((r) => setTimeout(r, ms));

export const avaliacaoService = {
  async listByEvento(eventoId: number): Promise<Avaliacao[]> {
    await delay();
    return mockAvaliacoes.filter((a) => a.evento.id === eventoId);
  },

  async create(
    dto: CreateAvaliacaoDTO,
    avaliadorId: number,
  ): Promise<Avaliacao> {
    await delay();
    const avaliador = mockUsuarios.find((u) => u.id === avaliadorId)!;
    const evento = mockEventos.find((e) => e.id === dto.eventoId)!;
    const newAval: Avaliacao = {
      id: mockAvaliacoes.length + 1,
      avaliador,
      evento,
      nota: dto.nota,
      comentario: dto.comentario,
      dataAvaliacao: new Date().toISOString(),
    };
    mockAvaliacoes.push(newAval);
    return { ...newAval };
  },
};
