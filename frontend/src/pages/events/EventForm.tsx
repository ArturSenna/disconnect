import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import type {
  Categoria,
  FrequenciaEvento,
  CreateEventoDTO,
  Evento,
} from "@/types";
import { categoriaService } from "@/services/categoriaService";
import { uploadImage } from "@/services/cloudinaryService";
import styles from "./EventForm.module.css";

interface EventFormProps {
  initial?: Evento;
  onSubmit: (dto: CreateEventoDTO) => Promise<void>;
  submitLabel: string;
}

const FREQUENCIAS: { value: FrequenciaEvento; label: string }[] = [
  { value: "UNICO", label: "Único" },
  { value: "SEMANAL", label: "Semanal" },
  { value: "MENSAL", label: "Mensal" },
  { value: "ANUAL", label: "Anual" },
];

export function EventForm({ initial, onSubmit, submitLabel }: EventFormProps) {
  const navigate = useNavigate();

  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [nome, setNome] = useState(initial?.nome ?? "");
  const [local, setLocal] = useState(initial?.local ?? "");
  const [dataEvento, setDataEvento] = useState(
    initial ? initial.dataEvento.slice(0, 16) : "",
  );
  const [frequencia, setFrequencia] = useState<FrequenciaEvento>(
    initial?.frequencia ?? "UNICO",
  );
  const [selectedCats, setSelectedCats] = useState<number[]>(
    initial?.categorias.map((c) => c.id) ?? [],
  );
  const [fotoUrl, setFotoUrl] = useState(initial?.fotoUrl ?? "");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    categoriaService.list().then(setCategorias);
  }, []);

  function toggleCat(id: number) {
    setSelectedCats((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id],
    );
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setToast("A imagem deve ter no máximo 5 MB.");
      setTimeout(() => setToast(null), 3000);
      return;
    }

    setUploading(true);
    try {
      const url = await uploadImage(file);
      setFotoUrl(url);
    } catch {
      setToast("Erro ao enviar imagem.");
      setTimeout(() => setToast(null), 3000);
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!nome.trim() || !local.trim() || !dataEvento || !selectedCats.length) {
      setToast("Preencha todos os campos obrigatórios.");
      setTimeout(() => setToast(null), 3000);
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit({
        nome: nome.trim(),
        dataEvento: new Date(dataEvento).toISOString(),
        local: local.trim(),
        frequencia,
        categoriaIds: selectedCats,
        fotoUrl: fotoUrl || undefined,
      });
    } catch {
      setToast("Erro ao salvar evento.");
      setTimeout(() => setToast(null), 3000);
    } finally {
      setSubmitting(false);
    }
  }

  // Minimum date = now
  const minDate = new Date().toISOString().slice(0, 16);

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

      <form className={styles.form} onSubmit={handleSubmit}>
        {/* Image upload */}
        <div className={styles.group}>
          <span className={styles.label}>Imagem do evento</span>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className={styles.hiddenInput}
            onChange={handleFileChange}
          />
          <button
            type="button"
            className={`${styles.imagePreview} ${fotoUrl ? styles.imagePreviewHasImage : ""}`}
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
          >
            {fotoUrl ? (
              <img src={fotoUrl} alt="Preview" />
            ) : (
              <div className={styles.imagePlaceholder}>
                <span className="material-symbols-outlined">
                  {uploading ? "hourglass_empty" : "add_photo_alternate"}
                </span>
                <span>
                  {uploading
                    ? "Enviando..."
                    : "Clique para adicionar uma imagem"}
                </span>
              </div>
            )}
          </button>
        </div>

        {/* Nome */}
        <div className={styles.group}>
          <label className={styles.label} htmlFor="ef-nome">
            Nome do evento *
          </label>
          <input
            id="ef-nome"
            className={styles.input}
            type="text"
            placeholder="Ex: Pelada no Sintético"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            maxLength={120}
            required
          />
        </div>

        {/* Local */}
        <div className={styles.group}>
          <label className={styles.label} htmlFor="ef-local">
            Local *
          </label>
          <input
            id="ef-local"
            className={styles.input}
            type="text"
            placeholder="Ex: Arena Society - Pampulha"
            value={local}
            onChange={(e) => setLocal(e.target.value)}
            maxLength={200}
            required
          />
        </div>

        {/* Date & Frequency */}
        <div className={styles.row}>
          <div className={styles.group}>
            <label className={styles.label} htmlFor="ef-data">
              Data e hora *
            </label>
            <input
              id="ef-data"
              className={styles.input}
              type="datetime-local"
              value={dataEvento}
              onChange={(e) => setDataEvento(e.target.value)}
              min={minDate}
              required
            />
          </div>

          <div className={styles.group}>
            <label className={styles.label} htmlFor="ef-freq">
              Frequência
            </label>
            <select
              id="ef-freq"
              className={styles.select}
              value={frequencia}
              onChange={(e) =>
                setFrequencia(e.target.value as FrequenciaEvento)
              }
            >
              {FREQUENCIAS.map((f) => (
                <option key={f.value} value={f.value}>
                  {f.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Categorias */}
        <div className={styles.group}>
          <span className={styles.label}>Categorias *</span>
          <div className={styles.chips}>
            {categorias.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`${styles.chip} ${selectedCats.includes(cat.id) ? styles.chipActive : ""}`}
                onClick={() => toggleCat(cat.id)}
              >
                {cat.modalidade}
              </button>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button className={styles.submit} type="submit" disabled={submitting}>
          <span className="material-symbols-outlined">
            {initial ? "save" : "add_circle"}
          </span>
          {submitting ? "Salvando..." : submitLabel}
        </button>
      </form>

      {toast && <div className={styles.toast}>{toast}</div>}
    </div>
  );
}
