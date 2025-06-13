import React, { useState } from "react";
import styles from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom"; // 👈 usamos esto para redirigir
// Si no tienes react-router-dom v6+, asegúrate de tenerlo instalado

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate(); // 👈 para redirigir después del login

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8888/api/v1/users/login", {
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

      alert("¡Inicio de sesión exitoso!");

      localStorage.setItem("token", data.token);
      navigate("/home");
    } catch (err: any) {
      alert(`Fallo en el login: ${data.message || err.message}`);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.title}>Bienvenid@ a FastPc</h2>
        <p className={styles.subtitle}>
          Por favor, ingresa tus datos para entrar al sitio
        </p>

        <div className={styles.formColumn}>
          <label htmlFor="email" className={styles.label}>
            Correo electrónico
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            placeholder="Email"
            required
          />
        </div>

        <div className={styles.formColumn}>
          <label htmlFor="password" className={styles.label}>
            Contraseña
          </label>
          <div className={styles.inputWrapper}>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              placeholder="Contraseña"
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

        <button type="submit" className={styles.button}>
          INICIAR SESIÓN
        </button>

        <div className={styles.loginBottom}>
          <div className={styles.links}>
            <p>
              <a href="#" className={styles.footerLink}>
                ¿No puedes conectarte?
              </a>
            </p>
          </div>

          <div className={styles.links}>
            <p className={styles.footerText}>¿No tienes una cuenta?</p>

            <Link to="/register" className={styles.footerLink}>
              Regístrate
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
