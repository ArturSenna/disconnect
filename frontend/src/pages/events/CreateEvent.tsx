import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { eventoService } from "@/services/eventoService";
import type { CreateEventoDTO } from "@/types";
import { EventForm } from "./EventForm";
import styles from "./EventForm.module.css";

export function CreateEventPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  async function handleCreate(dto: CreateEventoDTO) {
    if (!user) return;
    await eventoService.create(dto, user.id);
    navigate("/events");
  }

  return (
    <div>
      <h1 className={styles.title}>Criar evento</h1>
      <EventForm onSubmit={handleCreate} submitLabel="Criar evento" />
    </div>
  );
}
