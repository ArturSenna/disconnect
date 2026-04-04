import { useState } from "react";
import type { Evento } from "@/types";
import { eventoService } from "@/services/eventoService";
import { EventCard } from "@/components/EventCard";
import styles from "./Search.module.css";

export function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Evento[]>([]);
  const [searched, setSearched] = useState(false);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const data = await eventoService.search(query);
    setResults(data);
    setSearched(true);
  }

  return (
    <div>
      <h1 className={styles.title}>Buscar eventos</h1>

      <form onSubmit={handleSearch} className={styles.searchBar}>
        <input
          type="text"
          className={styles.input}
          placeholder="Buscar por nome, local ou modalidade..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className={styles.btn}>
          <span className="material-symbols-outlined">search</span>
        </button>
      </form>

      {searched && results.length === 0 && (
        <p className={styles.empty}>Nenhum evento encontrado.</p>
      )}

      <div className={styles.grid}>
        {results.map((evento) => (
          <EventCard key={evento.id} evento={evento} />
        ))}
      </div>
    </div>
  );
}
