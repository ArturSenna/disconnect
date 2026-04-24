import { useAuth } from "@/contexts/AuthContext";
import { eventoService } from "@/services/eventoService";
import type { CreateEventoDTO } from "@/types";
import { EventForm } from "./EventForm";

export function CreateEventPage() {
  const { user } = useAuth();

  async function handleCreate(dto: CreateEventoDTO) {
    if (!user) {
      throw new Error("Usuário não autenticado.");
    }
    await eventoService.create(dto, user.id);
  }

  return (
    <EventForm
      title="Criar Novo Evento"
      onSubmit={handleCreate}
      submitLabel="Criar Evento"
      successMessage="Evento criado com sucesso!"
      errorMessage="Erro ao criar evento. Tente novamente."
      redirectTo="/events"
    />
  );
}
