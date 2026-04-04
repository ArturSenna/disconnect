import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { eventoService } from "@/services/eventoService";
import type { Evento, CreateEventoDTO } from "@/types";
import { EventForm } from "./EventForm";
import styles from "./EventForm.module.css";

export function EditEventPage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [evento, setEvento] = useState<Evento | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    eventoService.getById(Number(id)).then((ev) => {
      if (!ev) {
        navigate("/events", { replace: true });
        return;
      }
      // Only the organizer can edit
      if (user && ev.organizador.id !== user.id) {
        navigate(`/events/${id}`, { replace: true });
        return;
      }
      setEvento(ev);
      setLoading(false);
    });
  }, [id, user, navigate]);

  async function handleUpdate(dto: CreateEventoDTO) {
    if (!evento) return;
    await eventoService.update(evento.id, dto);
    navigate(`/events/${evento.id}`);
  }

  if (loading) {
    return <p style={{ color: "var(--color-text-muted)" }}>Carregando...</p>;
  }

  return (
    <div>
      <h1 className={styles.title}>Editar evento</h1>
      <EventForm
        initial={evento!}
        onSubmit={handleUpdate}
        submitLabel="Salvar alterações"
      />
    </div>
  );
}
