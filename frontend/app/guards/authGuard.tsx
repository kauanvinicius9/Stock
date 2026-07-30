"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const isLogged = localStorage.getItem("user"); 

    if (!isLogged) {
      router.replace("/");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-400 font-mono text-xs flex items-center justify-center">Verificando autenticação...</div>
    );
  }

  return <>{children}</>;
}