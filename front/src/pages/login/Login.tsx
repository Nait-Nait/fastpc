import React, { useState } from "react";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";
import { UserRepositoryImpl } from "@/repositories/UserRepository";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const userRepo = new UserRepositoryImpl();

      await userRepo.login(email, password);

      alert("Inicio de Sesion Exitoso!");

      window.location.href = "/";
    } catch (err: any) {
      alert(`Fallo en el login: ${err.message}`);
    }
  };

  return (
    <div className="flex flex-row justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[370px] flex flex-col items-center rounded-[15px] px-8 py-20 shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
        style={{
          background: "linear-gradient(145deg, #3a3a50, #2b2b3f)",
        }}
      >
        <h2 className="text-2xl text-center font-medium text-white">
          Bienvenid@ a FitMyRig
        </h2>

        <p className="text-center text-[#b0b0c0] mb-6">
          Por favor, ingresa tus datos para entrar al sitio
        </p>

        <div className="flex flex-col items-start w-full max-w-[360px]">
          <label
            htmlFor="email"
            className="mt-4 mb-1 text-sm font-medium text-[#aaaaaa] w-full max-w-[250px] text-left"
          >
            Correo Electrónico
          </label>

          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </div>

        <div className="flex flex-col items-start w-full max-w-[360px]">
          <label
            htmlFor="email"
            className="mt-4 mb-1 text-sm font-medium text-[#aaaaaa] w-full max-w-[250px] text-left"
          >
            Contraseña
          </label>

          <div className="relative w-full ">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              required
              className="pr-10" // espacio a la derecha para el ícono
            />

            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={
                showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
            </button>
          </div>
        </div>

        <Button type="submit" className="mt-5 mb-5">
          INICIAR SESIÓN
        </Button>

        <div>
          <div className="flex flex-col items-center gap-1 mt-4">
            <p>
              <a
                href="#"
                className="text-base leading-[1.2] underline hover:no-underline hover:text-white focus:text-white active:text-white visited:text-white transition-colors"
              >
                ¿No puedes conectarte?
              </a>
            </p>
          </div>

          <div className="flex flex-col items-center gap-1 mt-4">
            <p className="text-base leading-[1.2] text-[#cccccc] m-0 p-0">
              ¿No tienes una cuenta?
            </p>

            <Link
              to="/register"
              className="text-base leading-[1.2] underline hover:no-underline hover:text-white focus:text-white active:text-white visited:text-white transition-colors"
            >
              Regístrate
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
