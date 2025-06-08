import React from "react";
import styles from "./Footer.module.css";
import { FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.columns}>
          <div className={styles.col}>
            <h4>CATEGORÍAS</h4>
            <ul>
              <li>
                <a href="/gpu">Tarjetas gráficas</a>
              </li>
              <li>
                <a href="/cpu">Procesadores</a>
              </li>
              <li>
                <a href="/motherboards">Placas madre</a>
              </li>
              <li>
                <a href="/ram">Memorias RAM</a>
              </li>
              <li>
                <a href="/storage">Almacenamiento</a>
              </li>
            </ul>
          </div>
          <div className={styles.col}>
            <h4>INFORMACIÓN</h4>
            <ul>
              <li>
                <a href="/blog">Blog</a>
              </li>
              <li>
                <a href="/reviews">Reviews</a>
              </li>
              <li>
                <a href="/guías">Guías</a>
              </li>
              <li>
                <a href="/faq">FAQ</a>
              </li>
            </ul>
          </div>
          <div className={styles.col}>
            <h4>MI CUENTA</h4>
            <ul>
              <li>
                <a href="/login">Iniciar sesión</a>
              </li>
              <li>
                <a href="/register">Registrarse</a>
              </li>
              <li>
                <a href="/orders">Mis pedidos</a>
              </li>
            </ul>
          </div>
          <div className={styles.col}>
            <h4>SOPORTE</h4>
            <ul>
              <li>
                <a href="/contact">Contacto</a>
              </li>
              <li>
                <a href="/warranty">Garantía</a>
              </li>
              <li>
                <a href="/soporte-tecnico">Soporte técnico</a>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.cta}>
          <a href="/newsletter" className={styles.ctaBtn}>
            SUSCRÍBETE AL NEWSLETTER
          </a>
          <p className={styles.supportText}>
            ¿Tienes alguna duda? <a href="/contact">Contáctanos</a>.
          </p>
          <div className={styles.social}>
            <a href="https://facebook.com" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="https://youtube.com" aria-label="YouTube">
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>

      <hr className={styles.divider} />

      <div className={styles.bottom}>
        <img src="/logo-fastpc.svg" alt="FastPc logo" className={styles.logo} />
        <span>
          © 2025 PCComponents. Todos los derechos reservados. Santiago, Chile.
        </span>
        <div className={styles.cert}>
          <img src="/icons/visa.svg" alt="Visa" />
          <img src="/icons/mastercard.svg" alt="Mastercard" />
          <img src="/icons/paypal.svg" alt="PayPal" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
