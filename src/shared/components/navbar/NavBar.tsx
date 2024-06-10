"use client";
import useAuth from "@/app/(auth)/hooks/useAuth";
import { useAuthStore } from "@/app/(auth)/stores/authStore";
import Image from "next/image";

const NavBar = () => {
  const { handlerLogout } = useAuth();
  const { user } = useAuthStore();
  const initials = `${user?.nombre?.charAt(0)}${user?.apellido?.charAt(0)}`;

  return (
    <nav className="flex flex-col justify-between items-center shadow bg-gray-800 sticky z-10 top-0">
      <div className="flex items-center justify-between container p-4">
        <div className="flex items-center">
          <Image src="/images/logo.png" alt="Logo" width={40} height={40} />
          <h1 className="text-white ml-2 text-xl">Gestor Reportes VAV</h1>
        </div>
        <div className="flex items-center">
          <button
            className="btn-primary"
            onClick={() => {
              handlerLogout();
            }}
          >
            Cerrar sesión
          </button>
          <div className="flex items-center ml-3">
            <div className="w-10 h-10 flex justify-center items-center rounded-full bg-blue-600 text-white mr-2">
              {initials}
            </div>
            <p className="text-white font-semibold">
              {user?.nombre} {user?.apellido}
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
