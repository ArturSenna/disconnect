import type { Categoria } from "@/types";
import { mockCategorias } from "@/mocks/data";

const delay = (ms = 400) => new Promise((r) => setTimeout(r, ms));

export const categoriaService = {
  async list(): Promise<Categoria[]> {
    await delay();
    return [...mockCategorias];
  },

  async getByNome(nome: string): Promise<Categoria[]> {
    await delay();
    return mockCategorias.filter(
      (c) => c.nome.toLowerCase() === nome.toLowerCase(),
    );
  },
};
