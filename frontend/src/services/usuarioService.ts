import { api } from "./api";
import type { Usuario, UpdateUsuarioDTO } from "@/types";

export const usuarioService = {
  /**
   * Rota de Front-end (Service) para atualizar os dados do utilizador.
   * Dispara um PUT para /api/usuarios/{id} no Back-end Java.
   */
  async atualizarPerfil(
    id: number,
    dados: UpdateUsuarioDTO,
  ): Promise<Usuario> {
    return api.put<Usuario>(`/usuarios/${id}`, dados);
  },

  /**
   * Rota de Front-end (Service) para apagar a conta definitivamente.
   * Dispara um DELETE para /api/usuarios/{id} no Back-end Java.
   */
  async deletarConta(id: number): Promise<void> {
    return api.delete<void>(`/usuarios/${id}`);
  },
};
