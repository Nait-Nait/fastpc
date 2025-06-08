import React, { useState } from "react";
import styles from "./Register.module.css";

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [birthday, setBirthday] = useState({ day: "", month: "", year: "" });
  const [publicProfile, setPublicProfile] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptNews, setAcceptNews] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      email,
      password,
      confirmPassword,
      birthday,
      publicProfile,
      acceptTerms,
      acceptNews,
    });
  };

  const renderDays = () => {
    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    return days.map((day) => <option key={day}>{day}</option>);
  };

  const renderMonths = () => {
    const months = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];
    return months.map((month, index) => (
      <option key={index} value={month}>
        {month}
      </option>
    ));
  };

  const renderYears = () => {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
    return years.map((year) => <option key={year}>{year}</option>);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h2 className={styles.title}>¡ÚNETE AHORA!</h2>

          <div className={styles.labelGroup}>
            {/* TODO: Email (para recordar ubicación) */}
            <label>Email</label>
            <p className={styles.helperText}>
              Necesitarás este email para conectarte en el futuro.
            </p>
            <input
              className={styles.input}
              type="email"
              value={email}
              placeholder=""
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {/* TODO: Input contraseña (para recordar ubicación) */}
          <div className={styles.labelGroup}>
            <label>Contraseña</label>
            <p className={styles.helperText}>
              Usa al menos 6 caracteres. Incluye letras, números y un carácter
              especial.
            </p>
            <div className={styles.passwordWrapper}>
              <input
                className={styles.input}
                type={showPassword ? "text" : "password"}
                value={password}
                placeholder=""
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className={styles.eyeButton}
                onClick={() => setShowPassword((v) => !v)}
                aria-label={
                  showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                }
              >
                <i
                  className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                ></i>
              </button>
            </div>
          </div>

          {/* TODO: Input repetir contraseña (para recordar ubicación) */}
          <div className={styles.labelGroup}>
            <label>Repite contraseña</label>
            <div className={styles.passwordWrapper}>
              <input
                className={styles.input}
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                placeholder=""
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className={styles.eyeButton}
                onClick={() => setShowConfirmPassword((v) => !v)}
                aria-label={
                  showConfirmPassword
                    ? "Ocultar contraseña"
                    : "Mostrar contraseña"
                }
              >
                <i
                  className={`fas ${
                    showConfirmPassword ? "fa-eye-slash" : "fa-eye"
                  }`}
                ></i>
              </button>
            </div>
          </div>
          {/* TODO: Cumpleaños (para recordar ubicación) */}
          <div className={styles.labelGroup}>
            <label>Cumpleaños</label>
            <p className={styles.helperText}>
              Por favor, introduce tu fecha de nacimiento real. Usaremos esta
              información para enviarte cupones de oferta especiales en tu
              cumpleaños. Nunca haremos pública tu fecha de nacimiento ni la
              compartiremos con terceros. Asegúrate de ingresar una fecha válida
              para poder disfrutar de estos beneficios.
            </p>
            <div className={styles.birthdaySelects}>
              <select
                className={styles.select}
                value={birthday.day}
                onChange={(e) =>
                  setBirthday({ ...birthday, day: e.target.value })
                }
                required
              >
                <option value="">Día</option>
                {renderDays()}
              </select>
              <select
                className={styles.select}
                value={birthday.month}
                onChange={(e) =>
                  setBirthday({ ...birthday, month: e.target.value })
                }
                required
              >
                <option value="">Mes</option>
                {renderMonths()}
              </select>
              <select
                className={styles.select}
                value={birthday.year}
                onChange={(e) =>
                  setBirthday({ ...birthday, year: e.target.value })
                }
                required
              >
                <option value="">Año</option>
                {renderYears()}
              </select>
            </div>
          </div>

          <div className={styles.labelGroup}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                className={styles.checkbox}
                checked={publicProfile}
                onChange={(e) => setPublicProfile(e.target.checked)}
              />
              Haz mi perfil público
            </label>

            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                className={styles.checkbox}
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                required
              />
              Acepto Términos y Condiciones, Política de Privacidad y Cookies
            </label>

            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                className={styles.checkbox}
                checked={acceptNews}
                onChange={(e) => setAcceptNews(e.target.checked)}
              />
              ¡Quiero recibir novedades y noticias!
            </label>
          </div>

          <button type="submit" className={styles.submitButton}>
            ¡HECHO! ¡VAMOS A CREAR UNA CUENTA!
          </button>
        </form>

        {/* TODO: Panel de redes sociales (para recordar ubicación) */}
        <div className={styles.socialBox}>
          <h3>O PUEDES ELEGIR OTRA FORMA DE REGISTRARTE</h3>
          <button className={`${styles.socialButton} ${styles.facebook}`}>
            <i
              className="fab fa-facebook-f"
              style={{ marginRight: "10px" }}
            ></i>
            FACEBOOK
          </button>
          <button className={`${styles.socialButton} ${styles.google}`}>
            <i className="fab fa-google" style={{ marginRight: "10px" }}></i>
            GOOGLE
          </button>
          <button className={`${styles.socialButton} ${styles.apple}`}>
            <i className="fab fa-apple" style={{ marginRight: "10px" }}></i>
            APPLE
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
