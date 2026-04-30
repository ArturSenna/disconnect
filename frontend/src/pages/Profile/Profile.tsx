import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { usuarioService } from "@/services/usuarioService";
import type { Usuario } from "@/types";
import styles from "./Profile.module.css";

function getInitials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export function ProfilePage() {
  const { user } = useAuth();
  const { id } = useParams<{ id: string }>();
  const [profile, setProfile] = useState<Usuario | null>(user);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const profileId = id ? Number(id) : user?.id;
  const isOwnProfile = user !== null && profileId === user.id;

  useEffect(() => {
    if (!profileId) {
      return;
    }

    if (isOwnProfile) {
      setProfile(user);
      setNotFound(false);
      return;
    }

    setLoading(true);
    usuarioService
      .buscarPorId(profileId)
      .then((usuario) => {
        setProfile(usuario ?? null);
        setNotFound(!usuario);
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [isOwnProfile, profileId, user]);

  if (loading) {
    return <p className={styles.status}>Carregando perfil...</p>;
  }

  if (notFound || !profile) {
    return <p className={styles.status}>Perfil não encontrado.</p>;
  }

  const formattedDate = profile.dataCriacao
    ? new Date(profile.dataCriacao).toLocaleDateString("pt-BR")
    : null;

  return (
    <main className={styles.page}>
      <section className={styles.header}>
        <div className={styles.avatar}>
          {profile.urlFoto ? (
            <img src={profile.urlFoto} alt={profile.nome} />
          ) : (
            getInitials(profile.nome)
          )}
        </div>

        <div className={styles.identity}>
          <h1>{profile.nome}</h1>
          <p>@{profile.login}</p>
          {isOwnProfile && profile.email && <p>{profile.email}</p>}
        </div>
      </section>

      <section className={styles.details}>
        {profile.biografia ? (
          <p className={styles.bio}>{profile.biografia}</p>
        ) : (
          <p className={styles.emptyBio}>
            Este perfil ainda não tem biografia.
          </p>
        )}

        <div className={styles.metaGrid}>
          {profile.idade && (
            <div className={styles.metaItem}>
              <span className="material-symbols-outlined">cake</span>
              <div>
                <strong>{profile.idade} anos</strong>
                <small>Idade</small>
              </div>
            </div>
          )}

          {formattedDate && (
            <div className={styles.metaItem}>
              <span className="material-symbols-outlined">calendar_month</span>
              <div>
                <strong>{formattedDate}</strong>
                <small>Na plataforma desde</small>
              </div>
            </div>
          )}
        </div>
      </section>

      {isOwnProfile && (
        <section className={styles.actions}>
          <Link to="/profile/edit" className={styles.primaryButton}>
            <span className="material-symbols-outlined">edit</span>
            Editar perfil
          </Link>
          <Link to="/profile/delete" className={styles.dangerButton}>
            <span className="material-symbols-outlined">delete</span>
            Apagar conta
          </Link>
        </section>
      )}
    </main>
  );
}
