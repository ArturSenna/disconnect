import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { usuarioService } from "@/services/usuarioService";
import styles from "./Profile.module.css";

export function EditProfilePage() {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nome: user?.nome ?? "",
    email: user?.email ?? "",
    idade: user?.idade ? String(user.idade) : "",
    biografia: user?.biografia ?? "",
    urlFoto: user?.urlFoto ?? "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (!user) {
    return null;
  }

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setForm((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");

    const idade = form.idade.trim()
      ? Number.parseInt(form.idade, 10)
      : undefined;
    if (form.idade.trim() && (!Number.isFinite(idade) || idade < 12)) {
      setError("Informe uma idade válida a partir de 12 anos.");
      return;
    }

    setSubmitting(true);
    try {
      const updatedUser = await usuarioService.atualizarPerfil(user.id, {
        nome: form.nome.trim(),
        email: form.email.trim(),
        idade,
        biografia: form.biografia.trim(),
        urlFoto: form.urlFoto.trim() || undefined,
      });
      updateUser(updatedUser);
      navigate("/profile");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro ao atualizar perfil.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className={styles.page}>
      <div className={styles.formHeader}>
        <Link to="/profile" className={styles.backLink}>
          <span className="material-symbols-outlined">arrow_back</span>
          Voltar
        </Link>
        <h1>Editar perfil</h1>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        {error && <p className={styles.error}>{error}</p>}

        <label>
          Nome
          <input
            type="text"
            name="nome"
            value={form.nome}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          E-mail
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Idade
          <input
            type="number"
            name="idade"
            min="12"
            value={form.idade}
            onChange={handleChange}
          />
        </label>

        <label>
          URL da foto
          <input
            type="url"
            name="urlFoto"
            value={form.urlFoto}
            onChange={handleChange}
            placeholder="https://..."
          />
        </label>

        <label>
          Biografia
          <textarea
            name="biografia"
            rows={5}
            value={form.biografia}
            onChange={handleChange}
            maxLength={300}
          />
        </label>

        <button
          type="submit"
          className={styles.primaryButton}
          disabled={submitting}
        >
          <span className="material-symbols-outlined">save</span>
          {submitting ? "Salvando..." : "Salvar alterações"}
        </button>
      </form>
    </main>
  );
}
