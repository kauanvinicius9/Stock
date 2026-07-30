"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Main() {
  const router = useRouter();
  const [user, setUser]  = useState<string>("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(storedUser)
    }
  }, [])

  function handleLogout() {
    document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
    localStorage.removeItem("user");
    router.refresh();
    router.push("/");
  }
  
  return (
    <div className="min-h-screen bg-white text-zinc-200 font-mono flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded p-6 shadow-xl">
        <header className="mb-6 border-b border-zinc-100 pb-3 flex items-center justify-between">

          <div>
            <h1 className="font-semibold tracking-wide text-black text-semibold text-2xl mt-1">Bem-vindo(a), {user || "Usuário"}</h1>
          </div>

        </header>

        <div className="space-y-3">
          <button onClick={() => router.push("/registration")} className="w-full py-2.5 px-4 bg-sky-600 hover:bg-sky-700 text-white text-xs font-medium rounded cursor-pointer">
            <span>Cadastrar produtos</span>
          </button>

          <button onClick={() => router.push("/management")} className="w-full py-2.5 px-4 bg-sky-600 hover:bg-sky-700 text-white text-xs font-medium rounded cursor-pointer">
            <span>Gestão de Estoque</span>
          </button>

          <button onClick={handleLogout} className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white text-xs font-medium rounded mt-4 text-center block cursor-pointer">Sair</button>
        </div>
      </div>
    </div>
  );
}