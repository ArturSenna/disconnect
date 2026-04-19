// Aponta direto para o Back-end. Tanto Jetty ou Tomcat
const BASE_URL = "http://localhost:8080/api";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    // Tratamento de erros do nosso Controller Java
    let errorMessage = `HTTP Error ${res.status}`;
    try {
      // Tenta ler o JSON {"erro": "mensagem"} que foi criado no Java
      const errorData = await res.json();
      if (errorData.erro) {
        errorMessage = errorData.erro;
      }
    } catch (e) {
      // Se não for JSON, tipo se for pq o servidor caiu, pega o texto puro
      const body = await res.text();
      if (body) errorMessage = body;
    }

    // Lança a exceção que o componente React vai capturar
    throw new Error(errorMessage);
  }

  // Se for o DELETE, devolve vazio sem tentar ler JSON
  if (res.status === 204) return undefined as T;

  return res.json() as Promise<T>;
}

export const api = {
  get: <T>(path: string) => request<T>(path),

  post: <T>(path: string, body: unknown) =>
    request<T>(path, { method: "POST", body: JSON.stringify(body) }),

  put: <T>(path: string, body: unknown) =>
    request<T>(path, { method: "PUT", body: JSON.stringify(body) }),

  patch: <T>(path: string, body: unknown) =>
    request<T>(path, { method: "PATCH", body: JSON.stringify(body) }),

  delete: <T>(path: string) => request<T>(path, { method: "DELETE" }),
};
