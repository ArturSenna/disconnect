import { useEffect, useMemo, useRef, useState } from "react";
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
  title: string;
  initial?: Evento;
  onSubmit: (dto: CreateEventoDTO) => Promise<void>;
  submitLabel: string;
  successMessage: string;
  errorMessage: string;
  redirectTo: string;
}

const FREQUENCIAS: { value: FrequenciaEvento; label: string }[] = [
  { value: "UNICO", label: "Evento Único" },
  { value: "SEMANAL", label: "Semanal" },
  { value: "MENSAL", label: "Mensal" },
];

const DIAS_SEMANA = [
  { short: "Seg", value: "Segunda-feira" },
  { short: "Ter", value: "Terça-feira" },
  { short: "Qua", value: "Quarta-feira" },
  { short: "Qui", value: "Quinta-feira" },
  { short: "Sex", value: "Sexta-feira" },
  { short: "Sáb", value: "Sábado" },
  { short: "Dom", value: "Domingo" },
] as const;

const DEFAULT_NIVEIS = ["Iniciante", "Intermediário", "Avançado"];

interface CategoriaAgrupada {
  nome: string;
  modalidades: Array<{
    id: number;
    nome: string;
    niveis: string[];
  }>;
}

interface ToastState {
  message: string;
  type: "success" | "error" | "warning";
}

function agruparCategorias(categorias: Categoria[]): CategoriaAgrupada[] {
  const grouped = new Map<string, CategoriaAgrupada>();

  categorias.forEach((categoria) => {
    const existing = grouped.get(categoria.nome);

    if (existing) {
      existing.modalidades.push({
        id: categoria.id,
        nome: categoria.modalidade,
        niveis: DEFAULT_NIVEIS,
      });
      return;
    }

    grouped.set(categoria.nome, {
      nome: categoria.nome,
      modalidades: [
        {
          id: categoria.id,
          nome: categoria.modalidade,
          niveis: DEFAULT_NIVEIS,
        },
      ],
    });
  });

  return Array.from(grouped.values());
}

function splitDateTime(dateTime?: string) {
  if (!dateTime) {
    return { date: "", time: "" };
  }

  const parsed = new Date(dateTime);

  return {
    date: parsed.toISOString().split("T")[0],
    time: parsed.toTimeString().slice(0, 5),
  };
}

function parseDiasDoMes(value: string) {
  const parts = value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  const dias = parts.map((item) => Number.parseInt(item, 10));
  const invalid = dias.some((dia) => Number.isNaN(dia) || dia < 1 || dia > 31);

  return {
    dias: dias.filter((dia) => !Number.isNaN(dia)),
    invalid,
  };
}

export function EventForm({
  title,
  initial,
  onSubmit,
  submitLabel,
  successMessage,
  errorMessage,
  redirectTo,
}: EventFormProps) {
  const navigate = useNavigate();
  const { date: initialDate, time: initialTime } = splitDateTime(
    initial?.dataEvento,
  );

  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [nome, setNome] = useState(initial?.nome ?? "");
  const [descricao, setDescricao] = useState(initial?.descricao ?? "");
  const [local, setLocal] = useState(initial?.local ?? "");
  const [dataEvento, setDataEvento] = useState(initialDate);
  const [horarioEvento, setHorarioEvento] = useState(initialTime);
  const [frequencia, setFrequencia] = useState<FrequenciaEvento>(
    initial?.frequencia ?? "UNICO",
  );
  const [selectedCategoria, setSelectedCategoria] = useState("");
  const [selectedModalidadeId, setSelectedModalidadeId] = useState(
    initial?.categorias[0] ? String(initial.categorias[0].id) : "",
  );
  const [nivelDeHabilidade, setNivelDeHabilidade] = useState(
    initial?.nivelDeHabilidade ?? "",
  );
  const [diasDaSemana, setDiasDaSemana] = useState<string[]>(
    initial?.diasDaSemana ?? [],
  );
  const [diasDoMes, setDiasDoMes] = useState(
    initial?.diasDoMes?.join(", ") ?? "",
  );
  const [quantMinimaPessoas, setQuantMinimaPessoas] = useState(
    initial?.quantMinimaPessoas ? String(initial.quantMinimaPessoas) : "",
  );
  const [quantMaximaPessoas, setQuantMaximaPessoas] = useState(
    initial?.quantMaximaPessoas ? String(initial.quantMaximaPessoas) : "",
  );
  const [fotoUrl, setFotoUrl] = useState(initial?.fotoUrl ?? "");
  const [imagePreviewUrl, setImagePreviewUrl] = useState(
    initial?.fotoUrl ?? "",
  );
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const redirectTimeoutRef = useRef<number | null>(null);
  const maxParticipantsRef = useRef<HTMLInputElement>(null);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);

  const categoriasAgrupadas = useMemo(
    () => agruparCategorias(categorias),
    [categorias],
  );

  const modalidades = useMemo(
    () =>
      categoriasAgrupadas.find(
        (categoria) => categoria.nome === selectedCategoria,
      )?.modalidades ?? [],
    [categoriasAgrupadas, selectedCategoria],
  );

  const modalidadeSelecionada = useMemo(
    () =>
      modalidades.find(
        (modalidade) => String(modalidade.id) === selectedModalidadeId,
      ),
    [modalidades, selectedModalidadeId],
  );

  useEffect(() => {
    categoriaService
      .list()
      .then(setCategorias)
      .catch(() => {
        setToast({ message: "Erro ao carregar categorias", type: "error" });
      });
  }, []);

  useEffect(() => {
    if (!toast) {
      return undefined;
    }

    const timeout = window.setTimeout(() => setToast(null), 3000);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  useEffect(() => {
    return () => {
      if (redirectTimeoutRef.current !== null) {
        window.clearTimeout(redirectTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const maxInput = maxParticipantsRef.current;

    if (!maxInput) {
      return;
    }

    const min = Number.parseInt(quantMinimaPessoas, 10);
    const max = Number.parseInt(quantMaximaPessoas, 10);

    if (Number.isFinite(min) && Number.isFinite(max) && min > max) {
      maxInput.setCustomValidity(
        "O número máximo deve ser maior ou igual ao mínimo",
      );
      return;
    }

    maxInput.setCustomValidity("");
  }, [quantMinimaPessoas, quantMaximaPessoas]);

  useEffect(() => {
    if (!initial || !categoriasAgrupadas.length) {
      return;
    }

    const modalidadeNome =
      initial.modalidadeHobby ?? initial.categorias[0]?.modalidade ?? "";

    const categoriaInicial = categoriasAgrupadas.find((categoria) =>
      categoria.modalidades.some(
        (modalidade) => modalidade.nome === modalidadeNome,
      ),
    );

    if (!categoriaInicial) {
      return;
    }

    setSelectedCategoria(categoriaInicial.nome);

    const modalidadeInicial = categoriaInicial.modalidades.find(
      (modalidade) => modalidade.nome === modalidadeNome,
    );

    if (modalidadeInicial) {
      setSelectedModalidadeId(String(modalidadeInicial.id));
    }
  }, [categoriasAgrupadas, initial]);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setToast({
        message: "A imagem deve ter no máximo 5MB",
        type: "warning",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setImagePreviewUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);

    setUploading(true);
    try {
      const url = await uploadImage(file);
      setFotoUrl(url);
      setToast({ message: "Imagem carregada com sucesso!", type: "success" });
    } catch {
      setToast({
        message: "Erro ao fazer upload da imagem",
        type: "error",
      });
    } finally {
      setUploading(false);
    }
  }

  function toggleDiaSemana(dia: string) {
    setDiasDaSemana((previous) =>
      previous.includes(dia)
        ? previous.filter((value) => value !== dia)
        : [...previous, dia],
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const modalidadeId = Number.parseInt(selectedModalidadeId, 10);
    const minParticipantes = Number.parseInt(quantMinimaPessoas, 10);
    const maxParticipantes = Number.parseInt(quantMaximaPessoas, 10);
    const parsedDiasDoMes = parseDiasDoMes(diasDoMes);

    if (frequencia === "SEMANAL" && diasDaSemana.length === 0) {
      setToast({
        message: "Selecione pelo menos um dia da semana",
        type: "warning",
      });
      return;
    }

    if (frequencia === "MENSAL") {
      if (!diasDoMes.trim()) {
        setToast({ message: "Informe os dias do mês", type: "warning" });
        return;
      }

      if (parsedDiasDoMes.invalid) {
        setToast({
          message:
            "Dias do mês inválidos. Use números de 1 a 31 separados por vírgula",
          type: "warning",
        });
        return;
      }
    }

    if (!Number.isFinite(modalidadeId)) {
      setToast({
        message: "Selecione uma modalidade",
        type: "warning",
      });
      return;
    }

    if (!nivelDeHabilidade) {
      setToast({
        message: "Selecione o nível de habilidade",
        type: "warning",
      });
      return;
    }

    if (
      !Number.isFinite(minParticipantes) ||
      !Number.isFinite(maxParticipantes)
    ) {
      setToast({
        message: "Informe a quantidade mínima e máxima de participantes",
        type: "warning",
      });
      return;
    }

    if (minParticipantes > maxParticipantes) {
      setToast({
        message: "O número máximo deve ser maior ou igual ao mínimo",
        type: "warning",
      });
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit({
        nome: nome.trim(),
        descricao: descricao.trim(),
        dataEvento: new Date(`${dataEvento}T${horarioEvento}`).toISOString(),
        local: local.trim(),
        frequencia,
        categoriaIds: [modalidadeId],
        fotoUrl: fotoUrl || undefined,
        diasDaSemana: frequencia === "SEMANAL" ? diasDaSemana : [],
        diasDoMes: frequencia === "MENSAL" ? parsedDiasDoMes.dias : [],
        quantMinimaPessoas: minParticipantes,
        quantMaximaPessoas: maxParticipantes,
        participantesInscritos: initial?.participantesInscritos ?? 0,
        modalidadeHobby: modalidadeSelecionada?.nome,
        nivelDeHabilidade,
        status: initial?.status ?? "Ativo",
      });
      setToast({ message: successMessage, type: "success" });
      redirectTimeoutRef.current = window.setTimeout(() => {
        navigate(redirectTo);
      }, 2000);
      return;
    } catch {
      setToast({ message: errorMessage, type: "error" });
    }

    setSubmitting(false);
  }

  const minDate = new Date().toISOString().split("T")[0];

  return (
    <div className={styles.page}>
      <div className={styles.topBar}>
        <button
          type="button"
          className={styles.backButton}
          onClick={() => navigate(-1)}
        >
          <span className={`material-symbols-outlined ${styles.icon}`}>
            arrow_back
          </span>
          <span>Voltar</span>
        </button>
      </div>

      <main className={styles.mainContent}>
        <h1 className={styles.title}>{title}</h1>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Imagem do Evento</label>
            <div className={styles.imageUploadContainer}>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className={styles.hiddenInput}
                onChange={handleFileChange}
              />
              <button
                type="button"
                className={`${styles.imagePreview} ${imagePreviewUrl ? styles.imagePreviewHasImage : ""}`}
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
              >
                {imagePreviewUrl ? (
                  <img src={imagePreviewUrl} alt="Preview" />
                ) : (
                  <>
                    <span
                      className={`material-symbols-outlined ${styles.imageIcon}`}
                    >
                      image
                    </span>
                    <span>
                      {uploading
                        ? "Enviando imagem..."
                        : "Clique para adicionar uma imagem"}
                    </span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="eventoNome">
              Nome do Evento*
            </label>
            <input
              id="eventoNome"
              className={styles.formControl}
              type="text"
              placeholder="Ex: Pelada de Futebol no Sábado"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="eventoDescricao">
              Descrição*
            </label>
            <textarea
              id="eventoDescricao"
              className={styles.formControl}
              rows={4}
              placeholder="Descreva seu evento, o que os participantes devem saber..."
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              required
            />
          </div>

          <div className={styles.row}>
            <div className={styles.column}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="eventoCategoria">
                  Categoria*
                </label>
                <select
                  id="eventoCategoria"
                  className={styles.formControl}
                  value={selectedCategoria}
                  onChange={(e) => {
                    setSelectedCategoria(e.target.value);
                    setSelectedModalidadeId("");
                    setNivelDeHabilidade("");
                  }}
                  required
                >
                  <option value="">Selecione uma categoria</option>
                  {categoriasAgrupadas.map((categoria) => (
                    <option key={categoria.nome} value={categoria.nome}>
                      {categoria.nome}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className={styles.column}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="eventoModalidade">
                  Modalidade*
                </label>
                <select
                  id="eventoModalidade"
                  className={styles.formControl}
                  value={selectedModalidadeId}
                  onChange={(e) => {
                    setSelectedModalidadeId(e.target.value);
                    setNivelDeHabilidade("");
                  }}
                  disabled={!selectedCategoria}
                  required
                >
                  <option value="">Selecione uma modalidade</option>
                  {modalidades.map((modalidade) => (
                    <option key={modalidade.id} value={modalidade.id}>
                      {modalidade.nome}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="eventoNivel">
              Nível de Habilidade*
            </label>
            <select
              id="eventoNivel"
              className={styles.formControl}
              value={nivelDeHabilidade}
              onChange={(e) => setNivelDeHabilidade(e.target.value)}
              disabled={!modalidadeSelecionada}
              required
            >
              <option value="">Selecione o nível</option>
              {(modalidadeSelecionada?.niveis ?? []).map((nivel) => (
                <option key={nivel} value={nivel}>
                  {nivel}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="eventoLocal">
              Local*
            </label>
            <input
              id="eventoLocal"
              className={styles.formControl}
              type="text"
              placeholder="Ex: PUC Minas Coração Eucarístico, Prédio 34"
              value={local}
              onChange={(e) => setLocal(e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="eventoFrequencia">
              Frequência*
            </label>
            <select
              id="eventoFrequencia"
              className={styles.formControl}
              value={frequencia}
              onChange={(e) =>
                setFrequencia(e.target.value as FrequenciaEvento)
              }
              required
            >
              <option value="">Selecione a frequência</option>
              {FREQUENCIAS.map((freq) => (
                <option key={freq.value} value={freq.value}>
                  {freq.label}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.row}>
            <div className={styles.column}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="eventoData">
                  Data Inicial*
                </label>
                <input
                  id="eventoData"
                  className={styles.formControl}
                  type="date"
                  value={dataEvento}
                  onChange={(e) => setDataEvento(e.target.value)}
                  min={minDate}
                  required
                />
              </div>
            </div>

            <div className={styles.column}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="eventoHorario">
                  Horário*
                </label>
                <input
                  id="eventoHorario"
                  className={styles.formControl}
                  type="time"
                  value={horarioEvento}
                  onChange={(e) => setHorarioEvento(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          {frequencia === "SEMANAL" && (
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Dias da Semana*</label>
              <div className={styles.daysSelector}>
                {DIAS_SEMANA.map((dia) => {
                  const checked = diasDaSemana.includes(dia.value);

                  return (
                    <label
                      key={dia.value}
                      className={`${styles.dayCheckbox} ${checked ? styles.dayCheckboxChecked : ""}`}
                    >
                      <input
                        type="checkbox"
                        className={styles.hiddenCheckbox}
                        checked={checked}
                        onChange={() => toggleDiaSemana(dia.value)}
                      />
                      <span>{dia.short}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {frequencia === "MENSAL" && (
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="diasMes">
                Dias do Mês*
              </label>
              <input
                id="diasMes"
                className={styles.formControl}
                type="text"
                placeholder="Ex: 1, 15, 30 (separados por vírgula)"
                value={diasDoMes}
                onChange={(e) => setDiasDoMes(e.target.value)}
              />
              <small className={styles.formText}>
                Informe os dias do mês separados por vírgula (1-31)
              </small>
            </div>
          )}

          <div className={styles.row}>
            <div className={styles.column}>
              <div className={styles.formGroup}>
                <label
                  className={styles.formLabel}
                  htmlFor="eventoMinParticipantes"
                >
                  Mínimo de Participantes*
                </label>
                <input
                  id="eventoMinParticipantes"
                  className={styles.formControl}
                  type="number"
                  min={1}
                  placeholder="Ex: 5"
                  value={quantMinimaPessoas}
                  onChange={(e) => setQuantMinimaPessoas(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className={styles.column}>
              <div className={styles.formGroup}>
                <label
                  className={styles.formLabel}
                  htmlFor="eventoMaxParticipantes"
                >
                  Máximo de Participantes*
                </label>
                <input
                  ref={maxParticipantsRef}
                  id="eventoMaxParticipantes"
                  className={styles.formControl}
                  type="number"
                  min={1}
                  placeholder="Ex: 20"
                  value={quantMaximaPessoas}
                  onChange={(e) => setQuantMaximaPessoas(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <button
            className={styles.submitButton}
            type="submit"
            disabled={submitting}
          >
            <span className={`material-symbols-outlined ${styles.icon}`}>
              {submitting
                ? "hourglass_empty"
                : initial
                  ? "check_circle"
                  : "add_circle"}
            </span>
            {submitting
              ? initial
                ? "Salvando..."
                : "Criando..."
              : submitLabel}
          </button>
        </form>
      </main>

      {toast && (
        <div className={styles.toastContainer}>
          <div className={styles.toast} role="alert" aria-live="assertive">
            <div className={styles.toastHeader}>
              <span
                className={`material-symbols-outlined ${styles.toastIcon} ${
                  toast.type === "success"
                    ? styles.toastIconSuccess
                    : toast.type === "warning"
                      ? styles.toastIconWarning
                      : styles.toastIconError
                }`}
              >
                {toast.type === "success"
                  ? "check_circle"
                  : toast.type === "warning"
                    ? "warning"
                    : "error"}
              </span>
              <strong className={styles.toastTitle}>Notificação</strong>
              <button
                type="button"
                className={styles.toastClose}
                onClick={() => setToast(null)}
                aria-label="Fechar"
              >
                <span className={`material-symbols-outlined ${styles.icon}`}>
                  close
                </span>
              </button>
            </div>
            <div className={styles.toastBody}>{toast.message}</div>
          </div>
        </div>
      )}
    </div>
  );
}
