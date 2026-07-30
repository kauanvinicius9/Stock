"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Product {
  id: number | string;
  name: string;
  description: string;
  stock_today?: number;
  stock_min: number;
  load?: number;
}

export default function RegistrationProduct() {
  const [productId, setProductId] = useState<string | number>("");
  const [msg, setMsg] = useState<string>("");

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [qtdMin, setQtdMin] = useState<string>("");

  const [get, setGet] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);

  const router = useRouter();

  async function getProduct() {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/products?name=${name}`
      );

      if (!response.ok) throw new Error("Erro ao buscar produtos");

      const data = await response.json();
      setProducts(data);
    } catch (error) {
      if (error instanceof Error) setMsg(error.message);
    }
  }

  async function getWithID() {
    try {
      if (!get) return getProduct();

      const response = await fetch(
        `http://127.0.0.1:8000/products/${get}`
      );

      if (!response.ok) throw new Error("Produto não encontrado");

      const data = await response.json();
      setProducts([data]);
    } catch (error) {
      if (error instanceof Error) setMsg(error.message);
    }
  }

  async function deleteWithID(id: number | string) {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/products/${id}`,
        { method: "DELETE" }
      );

      if (!response.ok) throw new Error("Erro ao excluir produto");

      setMsg("Produto excluído");
      getProduct();
    } catch (error) {
      if (error instanceof Error) setMsg(error.message);
    }
  }

  async function editWithID(id: number | string) {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/products/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            description,
            stock_today: 0,
            stock_min: Number(qtdMin),
            load: 0,
          }),
        }
      );

      if (!response.ok) throw new Error("Erro ao editar produto");

      setMsg("Produto atualizado");
      getProduct();
    } catch (error) {
      if (error instanceof Error) setMsg(error.message);
    }
  }

  async function saveProduct() {
    try {
      if (productId) {
        await editWithID(productId);

        setProductId("");
        setName("");
        setDescription("");
        setQtdMin("");
        return;
      }

      const response = await fetch("http://127.0.0.1:8000/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          description,
          stock_today: 0,
          stock_min: Number(qtdMin),
          load: 0.0,
        }),
      });

      if (!response.ok) throw new Error("Erro ao cadastrar produto");

      setMsg("Produto salvo");
      setName("");
      setDescription("");
      setQtdMin("");
      getProduct();
    } catch (error) {
      if (error instanceof Error) setMsg(error.message);
    }
  }

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="min-h-screen bg-white text-black font-mono p-4 md:p-8 flex flex-col items-center">
      <div className="w-full max-w-4xl space-y-6">
        
        <div>
          <button onClick={() => router.push("/main")} className="py-1 px-3 bg-sky-600 hover:bg-sky-700 text-white text-xs font-medium rounded cursor-pointer">&lt; Voltar</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="bg-white rounded p-5 shadow-xl flex flex-col justify-between">
            <div>
              <header className="mb-4 pb-2 border-b border-zinc-100 flex items-center justify-between">
                <h2 className="text-xs font-semibold text-zinc--300">{productId ? "Editar produto" : "Novo produto"}</h2>

                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${
                  productId 
                    ? "bg-amber-500/10 text-amber-400 border-amber-500/20" 
                    : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                }`}>{productId ? "PUT" : "POST"}
                </span>
              </header>

              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] text-zinc-400 mb-1">Nome</label>
                  <input value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} placeholder="Nome do produto" className="w-full px-3 py-1.5 text-xs bg-zinc-200 rounded text-black hover:bg-zinc-300"/>
                </div>

                <div>
                  <label className="block text-[11px] text-zinc-400 mb-1">Descrição</label>
                  <input value={description} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)} placeholder="Descrição detalhada" className="w-full px-3 py-1.5 text-xs bg-zinc-200 rounded text-black hover:bg-zinc-300"/>
                </div>

                <div>
                  <label className="block text-[11px] text-zinc-400 mb-1">Qtd. mínima</label>
                  <input type="number" value={qtdMin} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQtdMin(e.target.value)} placeholder="0" className="w-full px-3 py-1.5 text-xs bg-zinc-200 rounded text-black hover:bg-zinc-300"/>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <button onClick={saveProduct} className="w-full py-2 px-4 bg-sky-600 hover:bg-sky-700 text-white text-xs font-medium rounded cursor-pointer">{productId ? "Atualizar registro" : "Persistir no banco"}</button>
            </div>
          </div>

          <div className="bg-white rounded p-5 shadow-xl">
            <header className="mb-4 pb-2 border-b border-zinc-100 flex items-center justify-between">
              <h2 className="text-xs font-semibold text-black">Consultar por ID</h2>
              <span className="text-[10px] font-bold bg-blue-500/10text-blue-400 px-1.5 py-0.5 rounded border border-blue-500/20">GET</span>
            </header>

            <div className="flex gap-2 mb-4">
              <input value={get} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGet(e.target.value)} placeholder="Informe o ID" className="flex-1 px-3 py-1.5 text-xs bg-zinc-200 roundedtext-blackhover:bg-zinc-300"/>
              <button onClick={getWithID} className="py-1.5 px-3 bg-white hover:bg-sky-100 border border-sky-600 text-sky-600 text-xs font-medium rounded cursor-pointer">Buscar</button>
            </div>
 
            {msg && ( 
              <div className="mb-4 p-2 bg-white rounded text-[11px] text-green-600">{msg}</div>
            )}
          </div>
        </div>

        <div className="bg-white rounded p-5 shadow-xl">
          <h2 className="text-xs font-bold text-black tracking-wider mb-4 border-b border-zinc-100 pb-2">Registros encontrados ({products.length})</h2>

          <ul className="divide-y divide-slate-800/60">
            {products.length === 0 ? (
              <li className="py-3 text-xs text-zinc-400">Nenhum produto cadastrado</li>
            ) : (
              products.map((p, index) => (
                <li key={p.id ?? index} className="py-3 flex items-center justify-between text-xs gap-4">
                  <div>
                    <div className="font-semibold text-black">ID: {p.id} | <span className="text-black">{p.name}</span></div>
                    <p className="text-slate-500 text-[11px]">{p.description}</p>
                    <span className="text-[10px] text-zinc-600">Estoque Min: {p.stock_min}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => { setProductId(p.id); setName(p.name); setDescription(p.description); setQtdMin(String(p.stock_min))}}
                      className="px-2 py-1 bg-amber-500 hover:bg-amber-600 text-white cursor-pointer rounded">
                      Editar
                    </button>
                    <button onClick={() => deleteWithID(p.id)} className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white cursor-pointer rounded">Excluir
                    </button>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>

      </div>
    </div>
  );
}