import type { Evento } from "@/types";
import { Link } from "react-router-dom";
import styles from "./EventCard.module.css";

interface EventCardProps {
  evento: Evento;
}

export function EventCard({ evento }: EventCardProps) {
  const date = new Date(evento.dataEvento);
  const formattedDate = date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
  });
  const formattedTime = date.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const bgStyle = evento.fotoUrl
    ? {
        backgroundImage: `linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.55)), url('${evento.fotoUrl}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : undefined;

  return (
    <Link to={`/events/${evento.id}`} className={styles.card} style={bgStyle}>
      <span className={styles.badge}>{evento.categorias[0]?.modalidade}</span>
      <div className={styles.content}>
        <h3 className={styles.title}>{evento.nome}</h3>
        <p className={styles.location}>
          <span className="material-symbols-outlined">location_on</span>
          {evento.local}
        </p>
        <p className={styles.date}>
          <span className="material-symbols-outlined">calendar_today</span>
          {formattedDate} &bull; {formattedTime}
        </p>
      </div>
    </Link>
  );
}
