import { api } from "./api";
import { Usuario } from "@/types";

export const adminService = {
  listarUsuarios(): Promise<Usuario[]> {
    return api.get<Usuario[]>("/admin/usuarios");
  },
};
