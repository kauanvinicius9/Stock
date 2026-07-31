"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const router = useRouter();

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://127.0.0.1:8000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.detail || data?.message || "Usuário ou senha inválidos");
      }

      document.cookie = "auth_token=true; path=/; max-age=86400;"; // 1 dia
      localStorage.setItem("user", email);
      router.refresh();
      router.push("/main");

    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
      setError("Erro ao autenticar no servidor")
    }
  }
}

  return (
    <div className="min-h-screen bg-white text-zinc-400 font-mono flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white rounded p-6 shadow-sm">
     
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-normal text-zinc-400 mb-1">Email / Usuário</label>
            <input type="text" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} className="w-full px-3 py-1.5 text-xs bg-zinc-200 rounded text-black focus:outline-none hover:bg-zinc-300" required/>
          </div>

          <div>
            <label className="block text-xs font-normal text-zinc-400 mb-1">Senha</label>
            <input type="password" value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} className="w-full px-3 py-1.5 text-xs bg-zinc-200 rounded text-black focus:outline-none hover:bg-zinc-300" required/>
          </div>

          {error && (
            <div className="p-2.5 rounded text-red-600 text-xs font-sans">
              {error}
            </div>
          )}

          <button type="submit" className="w-full py-2 px-4 bg-sky-600 hover:bg-sky-700 text-white text-xs font-normal rounded cursor-pointer">Enviar requisição</button>
        </form>
      </div>
    </div>
  );
}