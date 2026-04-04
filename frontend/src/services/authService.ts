import type { Usuario, LoginDTO, CreateUsuarioDTO } from "@/types";
import { mockUsuarios } from "@/mocks/data";

// Simulated delay to mimic network calls
const delay = (ms = 400) => new Promise((r) => setTimeout(r, ms));

export const authService = {
  async login(credentials: LoginDTO): Promise<Usuario> {
    await delay();
    const user = mockUsuarios.find((u) => u.login === credentials.login);
    if (!user) throw new Error("Usuário ou senha inválidos.");
    // In the real API, password validation happens server-side
    return { ...user };
  },

  async register(data: CreateUsuarioDTO): Promise<Usuario> {
    await delay();
    const exists = mockUsuarios.find(
      (u) => u.login === data.login || u.email === data.email,
    );
    if (exists) throw new Error("Usuário já existe.");
    const newUser: Usuario = {
      id: mockUsuarios.length + 1,
      nome: data.nome,
      email: data.email,
      login: data.login,
      idade: data.idade,
      biografia: data.biografia,
      dataCriacao: new Date().toISOString(),
    };
    mockUsuarios.push(newUser);
    return { ...newUser };
  },
};
