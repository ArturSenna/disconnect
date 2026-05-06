import { useEffect, useState } from "react";
import { Usuario } from "@/types";
import { adminService } from "@/services/adminService";
import styles from "./AdminDashboard.module.css";

export function AdminDashboardPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    async function carregarUsuarios() {
      try {
        setLoading(true);
        const dados = await adminService.listarUsuarios();
        setUsuarios(dados);
      } catch (error) {
        setErro(
          error instanceof Error ? error.message : "Erro ao carregar usuários.",
        );
      } finally {
        setLoading(false);
      }
    }

    carregarUsuarios();
  }, []);

  if (loading) {
    return <p>Carregando painel administrativo...</p>;
  }

  if (erro) {
    return <p>{erro}</p>;
  }

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h1>Painel administrativo</h1>
        <p>Gerencie informações sensíveis da plataforma.</p>
      </header>

      <div className={styles.card}>
        <h2>Usuários cadastrados</h2>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Login</th>
                <th>E-mail</th>
                <th>Tipo</th>
              </tr>
            </thead>

            <tbody>
              {usuarios.map((usuario) => (
                <tr key={usuario.id}>
                  <td>{usuario.id}</td>
                  <td>{usuario.nome}</td>
                  <td>{usuario.login}</td>
                  <td>{usuario.email ?? "-"}</td>
                  <td>{usuario.isAdmin ? "Admin" : "Usuário comum"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
