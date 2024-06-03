"use client";
import useAuth from "@/app/(auth)/hooks/useAuth";
import Image from "next/image";

const NavBar = () => {
  const { handlerLogout } = useAuth();

  return (
    <nav className="flex flex-col justify-between items-center shadow bg-gray-800 sticky z-10 top-0">
      <div className="flex items-center justify-between container p-4">
        <div className="flex items-center">
          <Image src="/images/logo.png" alt="Logo" width={40} height={40} />
          <h1 className="text-white ml-2 text-xl">Gestor Reportes VAV</h1>
        </div>
        <button
          className="btn-primary"
          onClick={() => {
            handlerLogout();
          }}
        >
          Cerrar sesión
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
