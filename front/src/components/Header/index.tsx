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
    onClick={() => {
      window.location.href = "/perfil";
    }}
    className="cursor-pointer"
  >
    <User />
    <span>Perfil</span>
  </DropdownMenuItem>,
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
          placeholder="Buscar"
        />
        <div className="flex flex-row space-x-5">
          <Button className="bg-[var(--secondary-background)] dark:text-white text-sm">
            Categorias
          </Button>
          <Button className="bg-[var(--secondary-background)] dark:text-white">
            Componentes
          </Button>
          <Button className="bg-[var(--secondary-background)] dark:text-white">
            Arma tu PC
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarFallback>
                  <UserCircle />
                </AvatarFallback>
              </Avatar>
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
