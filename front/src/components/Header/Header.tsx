import styles from "./Header.module.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>FastPc</div>

      <input
        type="text"
        className={styles.search}
        placeholder="Buscar componentes..."
      />

      <nav className={styles.nav}>
        <a href="/categorías">Categorías</a>
        <a href="/compatibilidad">Compatibilidad</a>
        <a href="/armar">Armar PC</a>
      </nav>

      <div className={styles.profile}>
        <Link to="/login" className={styles.profileLink}>
          <i className="fas fa-user-circle"></i>
        </Link>

        <Link to="/settings" className={styles.profileLink}>
          <i className="fas fa-cog" style={{ fontSize: "1.3rem" }}></i>
        </Link>
      </div>
    </header>
  );
};

export default Header;
