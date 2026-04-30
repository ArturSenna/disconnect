import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import type { Evento, Participacao } from "@/types";
import { useAuth } from "@/contexts/AuthContext";
import { eventoService } from "@/services/eventoService";
import { participacaoService } from "@/services/participacaoService";
import styles from "./EventDetails.module.css";

function getInitials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

const FREQ_LABELS: Record<string, string> = {
  UNICO: "Único",
  SEMANAL: "Semanal",
  MENSAL: "Mensal",
  ANUAL: "Anual",
};

export function EventDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [evento, setEvento] = useState<Evento | null>(null);
  const [participacoes, setParticipacoes] = useState<Participacao[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    if (!id) return;
    const eventoId = Number(id);

    Promise.all([
      eventoService.getById(eventoId),
      participacaoService.listByEvento(eventoId),
    ])
      .then(([ev, parts]) => {
        if (!ev) {
          setError(true);
          return;
        }
        setEvento(ev);
        setParticipacoes(parts);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [id]);

  const isOrganizer = user !== null && evento?.organizador.id === user.id;
  const isPast = evento ? new Date(evento.dataEvento) < new Date() : false;

  const confirmed = participacoes.filter((p) => p.status === "APROVADO");
  const pending = participacoes.filter((p) => p.status === "PENDENTE");

  const alreadyJoined = participacoes.some((p) => p.convidado.id === user?.id);

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }

  async function handleJoin() {
    if (!evento || !user) return;
    try {
      await participacaoService.create({ eventoId: evento.id }, user.id);
      showToast("Solicitação enviada!");
      const parts = await participacaoService.listByEvento(evento.id);
      setParticipacoes(parts);
    } catch (error) {
      showToast(
        error instanceof Error
          ? error.message
          : "Erro ao solicitar participação.",
      );
    }
  }

  async function handleApprove(partId: number) {
    try {
      await participacaoService.approve(partId);
      showToast("Participante aprovado!");
      const parts = await participacaoService.listByEvento(evento!.id);
      setParticipacoes(parts);
    } catch (error) {
      showToast(
        error instanceof Error
          ? error.message
          : "Erro ao aprovar participação.",
      );
    }
  }

  async function handleReject(partId: number) {
    try {
      await participacaoService.reject(partId);
      showToast("Participante recusado.");
      const parts = await participacaoService.listByEvento(evento!.id);
      setParticipacoes(parts);
    } catch (error) {
      showToast(
        error instanceof Error
          ? error.message
          : "Erro ao recusar participação.",
      );
    }
  }

  async function handleDelete() {
    if (!evento) return;
    await eventoService.remove(evento.id);
    navigate("/events", { replace: true });
  }

  // --- Render states ---
  if (loading) {
    return (
      <div className={styles.loading}>
        <p>Carregando detalhes do evento...</p>
      </div>
    );
  }

  if (error || !evento) {
    return (
      <div className={styles.error}>
        <span className="material-symbols-outlined">error</span>
        <p>Evento não encontrado.</p>
      </div>
    );
  }

  const date = new Date(evento.dataEvento);
  const formattedDate = date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const formattedTime = date.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={styles.page}>
      <button
        type="button"
        className={styles.backBtn}
        onClick={() => navigate(-1)}
      >
        <span className="material-symbols-outlined">arrow_back</span>
        Voltar
      </button>

      <div className={styles.card}>
        {/* Event image */}
        {evento.fotoUrl && (
          <div className={styles.imageContainer}>
            <img
              src={evento.fotoUrl}
              alt={evento.nome}
              className={styles.image}
            />
          </div>
        )}

        {/* Header */}
        <div className={styles.header}>
          <div
            className={`${styles.statusBadge} ${isPast ? styles.statusPast : ""}`}
          >
            <span className={styles.statusDot} />
            {isPast ? "Encerrado" : "Ativo"}
          </div>

          <h1 className={styles.title}>{evento.nome}</h1>

          <div className={styles.organizer}>
            <span className="material-symbols-outlined">person</span>
            Organizado por{" "}
            <Link
              to={`/profile/${evento.organizador.id}`}
              className={styles.organizerName}
            >
              {evento.organizador.nome}
            </Link>
          </div>
        </div>

        {/* Meta info */}
        <div className={styles.meta}>
          <div className={styles.metaItem}>
            <span className="material-symbols-outlined">calendar_today</span>
            <div>
              <span className={styles.metaLabel}>Data e hora</span>
              <span className={styles.metaValue}>
                {formattedDate} às {formattedTime}
              </span>
            </div>
          </div>

          <div className={styles.metaItem}>
            <span className="material-symbols-outlined">location_on</span>
            <div>
              <span className={styles.metaLabel}>Local</span>
              <span className={styles.metaValue}>{evento.local}</span>
            </div>
          </div>

          <div className={styles.metaItem}>
            <span className="material-symbols-outlined">repeat</span>
            <div>
              <span className={styles.metaLabel}>Frequência</span>
              <span className={styles.metaValue}>
                {FREQ_LABELS[evento.frequencia] ?? evento.frequencia}
              </span>
            </div>
          </div>

          <div className={styles.metaItem}>
            <span className="material-symbols-outlined">group</span>
            <div>
              <span className={styles.metaLabel}>Participantes</span>
              <span className={styles.metaValue}>{confirmed.length}</span>
            </div>
          </div>
        </div>

        {/* Categories */}
        {evento.categorias.length > 0 && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>
              <span className="material-symbols-outlined">sell</span>
              Categorias
            </h3>
            <div className={styles.categories}>
              {evento.categorias.map((c) => (
                <span key={c.id} className={styles.catBadge}>
                  {c.modalidade}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Confirmed participants */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>
            <span className="material-symbols-outlined">people</span>
            Participantes confirmados
            <span className={styles.countBadge}>{confirmed.length}</span>
          </h3>

          {confirmed.length === 0 ? (
            <div className={styles.emptySmall}>
              <span className="material-symbols-outlined">person_off</span>
              <p>Nenhum participante confirmado ainda</p>
            </div>
          ) : (
            <div className={styles.participantList}>
              {confirmed.map((p) => (
                <Link
                  key={p.id}
                  to={`/profile/${p.convidado.id}`}
                  className={styles.participantCard}
                >
                  <div className={styles.avatar}>
                    {getInitials(p.convidado.nome)}
                  </div>
                  <div>
                    <div className={styles.participantName}>
                      {p.convidado.nome}
                    </div>
                    <div className={styles.participantLogin}>
                      @{p.convidado.login}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Pending participants (organizer only) */}
        {isOrganizer && pending.length > 0 && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>
              <span className="material-symbols-outlined">hourglass_empty</span>
              Participantes pendentes
              <span className={styles.countBadge}>{pending.length}</span>
            </h3>

            <div className={styles.participantList}>
              {pending.map((p) => (
                <div key={p.id} className={styles.participantCard}>
                  <div className={styles.avatar}>
                    {getInitials(p.convidado.nome)}
                  </div>
                  <div>
                    <div className={styles.participantName}>
                      {p.convidado.nome}
                    </div>
                    <div className={styles.participantLogin}>
                      @{p.convidado.login}
                    </div>
                  </div>
                  <div className={styles.pendingActions}>
                    <button
                      className={styles.approveBtn}
                      onClick={() => handleApprove(p.id)}
                      title="Aprovar"
                    >
                      <span className="material-symbols-outlined">check</span>
                    </button>
                    <button
                      className={styles.rejectBtn}
                      onClick={() => handleReject(p.id)}
                      title="Recusar"
                    >
                      <span className="material-symbols-outlined">close</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className={styles.actions}>
          {isOrganizer ? (
            <>
              <Link
                to={`/events/${evento.id}/edit`}
                className={styles.primaryBtn}
              >
                <span className="material-symbols-outlined">edit</span>
                Editar
              </Link>
              <button
                className={styles.dangerBtn}
                onClick={() => setConfirmDelete(true)}
              >
                <span className="material-symbols-outlined">delete</span>
                Excluir
              </button>
            </>
          ) : !alreadyJoined && !isPast ? (
            <button className={styles.primaryBtn} onClick={handleJoin}>
              <span className="material-symbols-outlined">person_add</span>
              Participar
            </button>
          ) : alreadyJoined ? (
            <div className={styles.primaryBtn} style={{ cursor: "default" }}>
              <span className="material-symbols-outlined">check_circle</span>
              Você já participa
            </div>
          ) : null}
        </div>
      </div>

      {/* Delete confirmation modal */}
      {confirmDelete && (
        <div
          className={styles.overlay}
          onClick={() => setConfirmDelete(false)}
          role="presentation"
        >
          <div
            className={styles.confirmBox}
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Excluir evento?</h3>
            <p>
              Tem certeza que deseja excluir &ldquo;{evento.nome}&rdquo;? Esta
              ação não pode ser desfeita.
            </p>
            <div className={styles.confirmActions}>
              <button
                className={styles.secondaryBtn}
                onClick={() => setConfirmDelete(false)}
              >
                Cancelar
              </button>
              <button className={styles.dangerBtn} onClick={handleDelete}>
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && <div className={styles.toast}>{toast}</div>}
    </div>
  );
}
