import React, { useState } from "react";
import styles from "./Register.module.css";

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [publicProfile, setPublicProfile] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptNews, setAcceptNews] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
      const res = await fetch("http://localhost:8888/api/v1/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await res.json();

      alert("¡Usuario registrado con éxito!");

      localStorage.setItem("token", data.token);
    } catch (err: any) {
      alert(`Fallo en el registro: ${data.message || err.message}`);
    }
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
