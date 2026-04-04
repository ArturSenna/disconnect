import type { Participacao, CreateParticipacaoDTO } from "@/types";
import { mockParticipacoes, mockUsuarios, mockEventos } from "@/mocks/data";

const delay = (ms = 400) => new Promise((r) => setTimeout(r, ms));

export const participacaoService = {
  async listByEvento(eventoId: number): Promise<Participacao[]> {
    await delay();
    return mockParticipacoes.filter((p) => p.evento.id === eventoId);
  },

  async listByUsuario(usuarioId: number): Promise<Participacao[]> {
    await delay();
    return mockParticipacoes.filter((p) => p.convidado.id === usuarioId);
  },

  async create(
    dto: CreateParticipacaoDTO,
    usuarioId: number,
  ): Promise<Participacao> {
    await delay();
    const convidado = mockUsuarios.find((u) => u.id === usuarioId)!;
    const evento = mockEventos.find((e) => e.id === dto.eventoId)!;
    const newPart: Participacao = {
      id: mockParticipacoes.length + 1,
      convidado,
      evento,
      status: "PENDENTE",
      dataSolicitacao: new Date().toISOString(),
    };
    mockParticipacoes.push(newPart);
    return { ...newPart };
  },

  async approve(id: number): Promise<Participacao> {
    await delay();
    const p = mockParticipacoes.find((x) => x.id === id);
    if (!p) throw new Error("Participação não encontrada.");
    p.status = "APROVADO";
    return { ...p };
  },

  async reject(id: number): Promise<Participacao> {
    await delay();
    const p = mockParticipacoes.find((x) => x.id === id);
    if (!p) throw new Error("Participação não encontrada.");
    p.status = "RECUSADO";
    return { ...p };
  },
};
