import { NavLink } from "react-router-dom";
import styles from "./BottomNav.module.css";

const NAV_ITEMS = [
  { to: "/", icon: "home", label: "Início" },
  { to: "/search", icon: "search", label: "Pesquisar" },
  { to: "/events/create", icon: "add_box", label: "Criar Evento" },
  { to: "/events", icon: "event", label: "Eventos" },
  { to: "/profile", icon: "account_circle", label: "Perfil" },
] as const;

export function BottomNav() {
  return (
    <nav className={styles.nav}>
      {NAV_ITEMS.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === "/" || item.to === "/events"}
          className={({ isActive }) =>
            `${styles.item} ${isActive ? styles.active : ""}`
          }
          title={item.label}
        >
          <span className="material-symbols-outlined">{item.icon}</span>
        </NavLink>
      ))}
    </nav>
  );
}
