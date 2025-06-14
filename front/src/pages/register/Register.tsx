import React, { useState } from "react";
import { UserRepositoryImpl } from "@/repositories/UserRepository";
import { Button } from "@/components/ui/button";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Input } from "@/components/ui/input";
const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
      const userRepo = new UserRepositoryImpl();

      await userRepo.createUser(email, password);

      alert("¡Usuario registrado con éxito!");

      window.location.href = "/login";
    } catch (err: any) {
      alert(`Fallo en el registro: ${err.message}`);
    }
  };

  return (
    <div className="flex flex-row justify-center">
      <div className="flex gap-10 items-start">
        <form
          onSubmit={handleSubmit}
          className="w-[450px] p-10 rounded-[10px] text-white border-2 shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
          style={{
            background: "linear-gradient(145deg, #3a3a50, #2b2b3f)",
            fontFamily: "Arial, sans-serif",
            borderColor: "#9b5de5",
          }}
        >
          <h2 className="text-[28px] mb-8 text-center font-bold">
            ¡ÚNETE AHORA!
          </h2>

          <div className="bg-[#2b2b3f] p-[15px] rounded-[6px] mb-5">
            {/* TODO: Email (para recordar ubicación) */}
            <label>Email</label>
            <p className="text-xs text-[#b0b0c0] mb-2">
              Necesitarás este email para conectarte en el futuro.
            </p>

            <Input
              type="email"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* TODO: Input contraseña (para recordar ubicación) */}

          <div className="bg-[#2b2b3f] p-[15px] rounded-[6px] mb-5">
            <label>Contraseña</label>
            <p className="text-xs text-[#b0b0c0] mb-2">
              Usa al menos 6 caracteres. Incluye letras, números y un carácter
              especial.
            </p>

            <div className="relative w-full">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                required
                className="pr-10"
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

          {/* TODO: Input repetir contraseña (para recordar ubicación) */}
          <div className="bg-[#2b2b3f] p-[15px] rounded-[6px] mb-5">
            <label>Repite contraseña</label>

            <div className="relative w-full">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirmar contraseña"
                required
                className="pr-10"
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword((v) => !v)}
                aria-label={
                  showConfirmPassword
                    ? "Ocultar contraseña"
                    : "Mostrar contraseña"
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? (
                  <FaEye size={18} />
                ) : (
                  <FaEyeSlash size={18} />
                )}
              </button>
            </div>
          </div>

          <div className="bg-[#2b2b3f] p-[15px] rounded-[6px] mb-5">
            <label className="flex items-center text-sm">
              <input
                type="checkbox"
                className="w-auto mr-2"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                required
              />
              Acepto Términos y Condiciones, Política de Privacidad y Cookies
            </label>

            <label className="flex items-center text-sm">
              <input
                type="checkbox"
                className="w-auto mr-2"
                checked={acceptNews}
                onChange={(e) => setAcceptNews(e.target.checked)}
              />
              ¡Quiero recibir novedades y noticias!
            </label>
          </div>

          <Button
            type="submit"
            className="block mx-auto uppercase font-semibold tracking-wide px-10 text-base

"
          >
            ¡VAMOS A CREAR UNA CUENTA!
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Register;
