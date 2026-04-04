import { useEffect, useState } from "react";
import type { Evento } from "@/types";
import { eventoService } from "@/services/eventoService";
import { EventCard } from "@/components/EventCard";
import styles from "./Home.module.css";

export function HomePage() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    eventoService.list().then((data) => {
      setEventos(data);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <h1 className={styles.title}>Eventos disponíveis</h1>

      {loading ? (
        <p className={styles.loading}>Carregando...</p>
      ) : (
        <div className={styles.grid}>
          {eventos.map((evento) => (
            <EventCard key={evento.id} evento={evento} />
          ))}
        </div>
      )}
    </div>
  );
}
