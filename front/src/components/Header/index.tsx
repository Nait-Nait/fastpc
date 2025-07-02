import { LogIn, LogOut, User, UserCircle } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { UserRepositoryImpl } from "@/repositories/UserRepository";
import { useEffect, useState } from "react";

const logedDropdownItems = [
  <DropdownMenuItem
    onClick={async () => {
      const userRepo = new UserRepositoryImpl();
      await userRepo.logout();
      window.location.reload();
    }}
    className="cursor-pointer"
  >
    <LogOut />
    <span>Cerrar Sesión</span>
  </DropdownMenuItem>,
];

const logoutDropdownItems = [
  <DropdownMenuItem
    onClick={() => {
      window.location.href = "/login";
    }}
    className="cursor-pointer"
  >
    <LogIn />
    <a href="/login">Iniciar Sesión</a>
  </DropdownMenuItem>,
];

export default function NavigationMenuDemo() {
  const [logeado, setLogeado] = useState(false);
  const [loading, setLoading] = useState(true);
  const userRepo = new UserRepositoryImpl();

  useEffect(() => {
    const token = localStorage.getItem("login");
    if (token) {
      userRepo
        .verifyLogin(token)
        .then((res) => {
          setLogeado(res);
        })
        .catch((err) => {
          console.error("Error al verificar login:", err);
          setLogeado(false);
        });
    }

    setLoading(false);
  }, []);

  return (
    <header className="flex flex-row space-x-10 bg-transparent w-full pt-4 mb-10 pb-5 border-b-2 border-[var(--main)]">
      <div>
        <a href="/" className="text-3xl font-bold ps-24 md:block hidden ">
          FitMyRig
        </a>
      </div>
      <div className="flex md:flex-row flex-col space-y-5 space-x-10 justify-end">
        <Input
          className="md:w-[300px] md:mx-10 mx-auto"
          type="text"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              const inputValue = (e.target as HTMLInputElement).value;

              const params = new URLSearchParams(window.location.search);
              params.set("page", "0");
              params.set("search", inputValue);

              window.location.href = `/components?${params.toString()}`;
            }
          }}
          placeholder="Buscar"
        />

        <div className="flex flex-row space-x-5">
          <Button
            className="bg-[var(--foreground)] text-sm"
            onClick={() => {
              if (logeado) {
                window.location.href = "/price";
              } else {
                window.location.href = "/login";
              }
            }}
          >
            Cotización
          </Button>
          <Button
            className="bg-[var(--foreground)]"
            onClick={() => (window.location.href = "/components")}
          >
            Componentes
          </Button>
          <Button
            className="bg-[var(--main)]"
            onClick={() => (window.location.href = "/compatibility")}
          >
            Arma tu PC
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="shadow-[var(--shadow-inverted)]"
                variant="inverted"
              >
                <UserCircle />
                Cuenta
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuGroup>
                {/*<DropdownMenuLabel inset>Usuario</DropdownMenuLabel>*/}
                {loading && (
                  <DropdownMenuLabel inset>Cargando...</DropdownMenuLabel>
                )}
                {logeado ? logedDropdownItems : logoutDropdownItems}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
