import React, { useState } from "react";
import { UserRepositoryImpl } from "@/repositories/UserRepository";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeClosed } from "lucide-react";
import { Card } from "@/components/ui/card";
const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);

  function PasswordInput({
    placeholder,
    password,
    setPassword,
  }: {
    placeholder: string;
    password: any;
    setPassword: any;
  }): any {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className="relative w-full">
        <Input
          id={placeholder}
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e: any) => setPassword(e.target.value)}
          placeholder={placeholder}
          required
          className="pr-10"
        />

        <button
          type="button"
          onClick={() => setShowPassword((value) => !value)}
          aria-label={
            showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
          }
          className="absolute right-3 top-1/2 -translate-y-1/2 z-10 text-gray-500 hover:text-gray-700"
        >
          {showPassword ? (
            <Eye className="cursor-pointer" size={18} />
          ) : (
            <EyeClosed className="cursor-pointer" size={18} />
          )}
        </button>
      </div>
    );
  }

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
      <Card className="max-w-[24rem] py-0">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-[24rem] px-8 py-20 rounded-sm border-2"
          style={{
            borderColor: "var(--main)",
          }}
        >
          <h2 className="text-2xl mb-2 text-center font-bold">¡ÚNETE AHORA!</h2>

          <div className="bg-[var(--background)] p-4 mb-2">
            <label>Email</label>
            <p className="text-xs dark:text-[#b0b0c0] mb-2">
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

          <div className="bg-[var(--background)] p-4 mb-2">
            <label>Contraseña</label>
            <p className="text-xs dark:text-[#b0b0c0] mb-2">
              Usa al menos 6 caracteres. Incluye letras, números y un carácter
              especial.
            </p>

            {PasswordInput({
              placeholder: "Contraseña",
              password,
              setPassword,
            })}
          </div>

          <div className="bg-[var(--background)] p-4 mb-2">
            <label>Repite contraseña</label>
            <p className="text-xs text-[#b0b0c0] mb-2">
              Por favor, repite la contraseña para confirmar.
            </p>

            {PasswordInput({
              placeholder: "Confirmar Contraseña",
              password: confirmPassword,
              setPassword: setConfirmPassword,
            })}
          </div>

          <div className="bg-[var(--background)] p-4 mb-2">
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
          </div>

          <Button type="submit" className="w-full text-base">
            CREAR CUENTA
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Register;
