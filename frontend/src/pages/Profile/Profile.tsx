import { useAuth } from "@/contexts/AuthContext";

export function ProfilePage() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div>
      <h1>{user.nome}</h1>
      <p style={{ color: "var(--color-text-secondary)" }}>{user.email}</p>
      <p style={{ color: "var(--color-text-secondary)" }}>@{user.login}</p>
      {user.biografia && <p style={{ marginTop: "1rem" }}>{user.biografia}</p>}
      <p style={{ color: "var(--color-text-muted)", marginTop: "2rem" }}>
        Edição de perfil, foto e avaliações — a implementar.
      </p>
    </div>
  );
}
