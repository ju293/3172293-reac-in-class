// src/shared/layouts/navbar.jsx
import { useState } from "react";
import { Menu } from "lucide-react";
import {
  IconButton,
  SearchField,
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
} from "@/shared";
import logo from "@/assets/images/1-logo.png";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleSearch = (value) => {
    console.log("Buscar:", value);
  };

  const handleClear = () => {
    console.log("Campo limpiado");
  };

  const handleLogout = () => {
    // Elimina el token guardado en el Login
    sessionStorage.removeItem("token");
    // Redirige al inicio de sesión
    navigate("/auth/login");
  };

  return (
    <nav className="w-full bg-transparent border-b-2">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo de marca */}
          <div className="hidden sm:block items-center">
            <Link to="/dashboard/home" className="text-h1 font-heading">
              <img src={logo} alt="logo" className="h-12" />
            </Link>
          </div>

          {/* Links de navegación principales */}
          <ul className="hidden md:flex items-center gap-6">
            <li>
              <Link to="/dashboard/home" className="hover:text-primary transition">
                Inicio
              </Link>
            </li>
            <li>
              <Link to="/dashboard/userList" className="hover:text-primary transition">
                Usuarios
              </Link>
            </li>
            <li>
              <Link to="/auth/login" className="hover:text-primary transition">
                Iniciar Sesión
              </Link>
            </li>
          </ul>

          {/* Campo de búsqueda */}
          <div>
            <SearchField
              value={search}
              onChange={setSearch}
              onSubmit={handleSearch}
              onClear={handleClear}
              placeholder="Buscar productos..."
              size="md"
              variant="outlined"
              className="w-76"
            />
          </div>

          {/* Dropdown de opciones */}
          <div>
            <Dropdown className="z-15">
              <DropdownTrigger>
                <IconButton>
                  <Menu />
                </IconButton>
              </DropdownTrigger>

              <DropdownContent>
                <DropdownItem>
                  <Link to="/dashboard/home" className="block w-full">
                    Gestión de Productos
                  </Link>
                </DropdownItem>

                <DropdownItem>
                  <Link to="/dashboard/userCreate" className="block w-full">
                    Crear Usuarios
                  </Link>
                </DropdownItem>

                <DropdownItem>
                  <Link to="/dashboard/userList" className="block w-full">
                    Listar Usuarios
                  </Link>
                </DropdownItem>

                <DropdownItem onClick={handleLogout} className="text-red-500 cursor-pointer">
                  Cerrar Sesión
                </DropdownItem>
              </DropdownContent>
            </Dropdown>
          </div>
        </div>
      </div>
    </nav>
  );
}