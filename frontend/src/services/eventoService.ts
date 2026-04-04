import type { Evento, CreateEventoDTO, UpdateEventoDTO } from "@/types";
import { mockEventos, mockCategorias, mockUsuarios } from "@/mocks/data";

const delay = (ms = 400) => new Promise((r) => setTimeout(r, ms));

export const eventoService = {
  async list(): Promise<Evento[]> {
    await delay();
    return [...mockEventos];
  },

  async getById(id: number): Promise<Evento | undefined> {
    await delay();
    return mockEventos.find((e) => e.id === id);
  },

  async listByOrganizador(organizadorId: number): Promise<Evento[]> {
    await delay();
    return mockEventos.filter((e) => e.organizador.id === organizadorId);
  },

  async create(dto: CreateEventoDTO, organizadorId: number): Promise<Evento> {
    await delay();
    const organizador = mockUsuarios.find((u) => u.id === organizadorId)!;
    const categorias = mockCategorias.filter((c) =>
      dto.categoriaIds.includes(c.id),
    );
    const newEvento: Evento = {
      id: mockEventos.length + 1,
      nome: dto.nome,
      dataEvento: dto.dataEvento,
      local: dto.local,
      frequencia: dto.frequencia,
      fotoUrl: dto.fotoUrl,
      organizador,
      categorias,
      dataCriacao: new Date().toISOString(),
    };
    mockEventos.push(newEvento);
    return { ...newEvento };
  },

  async update(id: number, dto: UpdateEventoDTO): Promise<Evento> {
    await delay();
    const idx = mockEventos.findIndex((e) => e.id === id);
    if (idx === -1) throw new Error("Evento não encontrado.");
    const updated = { ...mockEventos[idx], ...dto };
    if (dto.categoriaIds) {
      updated.categorias = mockCategorias.filter((c) =>
        dto.categoriaIds!.includes(c.id),
      );
    }
    mockEventos[idx] = updated;
    return { ...updated };
  },

  async remove(id: number): Promise<void> {
    await delay();
    const idx = mockEventos.findIndex((e) => e.id === id);
    if (idx !== -1) mockEventos.splice(idx, 1);
  },

  async search(query: string): Promise<Evento[]> {
    await delay();
    const q = query.toLowerCase();
    return mockEventos.filter(
      (e) =>
        e.nome.toLowerCase().includes(q) ||
        e.local.toLowerCase().includes(q) ||
        e.categorias.some(
          (c) =>
            c.modalidade.toLowerCase().includes(q) ||
            c.nome.toLowerCase().includes(q),
        ),
    );
  },
};
