// --- Enums ---

export type FrequenciaEvento = "UNICO" | "SEMANAL" | "MENSAL" | "ANUAL";

export type StatusParticipacao = "PENDENTE" | "APROVADO" | "RECUSADO";

// --- Entities ---

export interface Usuario {
  id: number;
  nome: string;
  login: string;
  idade?: number;
  biografia?: string;
  urlFoto?: string;
  dataCriacao: string;
}

export interface Categoria {
  id: number;
  nome: string;
  modalidade: string;
}

export interface Evento {
  id: number;
  nome: string;
  dataEvento: string; // ISO date string
  local: string;
  frequencia: FrequenciaEvento;
  fotoUrl?: string; // Cloudinary image URL
  organizador: Usuario;
  categorias: Categoria[];
  dataCriacao: string;
}

export interface Participacao {
  id: number;
  convidado: Usuario;
  evento: Evento;
  status: StatusParticipacao;
  dataSolicitacao: string;
}

export interface Avaliacao {
  id: number;
  avaliador: Usuario;
  evento: Evento;
  nota: number; // 1-5
  comentario?: string;
  dataAvaliacao: string;
}

// --- DTOs (for create/update forms) ---

export interface CreateUsuarioDTO {
  nome: string;
  email: string;
  login: string;
  senha: string;
  idade?: number;
  biografia?: string;
  urlFoto?: string;
  isAdmin?: boolean;
}

export interface UpdateUsuarioDTO {
  nome?: string;
  email?: string;
  idade?: number;
  biografia?: string;
}

export interface LoginDTO {
  login: string;
  senha: string;
}

export interface CreateEventoDTO {
  nome: string;
  dataEvento: string;
  local: string;
  frequencia: FrequenciaEvento;
  categoriaIds: number[];
  fotoUrl?: string;
}

export interface UpdateEventoDTO {
  nome?: string;
  dataEvento?: string;
  local?: string;
  frequencia?: FrequenciaEvento;
  categoriaIds?: number[];
  fotoUrl?: string;
}

export interface CreateAvaliacaoDTO {
  eventoId: number;
  nota: number;
  comentario?: string;
}

export interface CreateParticipacaoDTO {
  eventoId: number;
}

// --- API response wrappers ---

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
}
