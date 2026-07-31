"use client";

import React, { useState, useEffect } from "react";

interface Movimentation {
  id?: number;
  product_id: string | number;
  user_id: number;
  type: string;
  quantity: number;
  movimentation_data: string;
}

export default function ManagementProduct() {
  const [product, setProduct] = useState<string>("1");
  const [type, setType] = useState<string>("Entrada");
  const [quantity, setQuantity] = useState<number | string>(0);
  const [date, setDate] = useState<string>("");
  const [msg, setMsg] = useState<string>("");
  const [movimentations, setMovimentations] = useState<Movimentation[]>([]);

  async function getMovimentations() {
    try {
      const response = await fetch("http://localhost:8000/stock/movimentation");
      const data = await response.json();

      if (Array.isArray(data)) {
        setMovimentations(data);
      }
    } catch (error) {
      console.error("Erro ao buscar movimentações:", error);
    }
  }

  useEffect(() => {
    getMovimentations();
  }, []);

  async function registrationMovimentation() {
    setMsg("");
    try {
      const response = await fetch("http://127.0.0.1:8000/stock/movimentation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_id: product,
          user_id: 1,
          type: type,
          quantity: Number(quantity),
          movimentation_data: date,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao registrar movimentação no servidor");
      }

      setMsg("Movimentação registrada");
      getMovimentations();
    } catch (error) {

      if (error instanceof Error) {
        setMsg(error.message);
      } else {
        setMsg("Erro ao registrar movimentação");
      }
    }
  }

  return (
    <div className="min-h-screen bg-white text-black font-mono p-4 md:p-8 flex flex-col items-center">
      <div className="w-full max-w-4xl space-y-6">
        
        <div className="bg-white rounded p-6 shadow-xl">
          <header className="mb-6 border-b border-zinc-100 pb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold bg-amber-500/10 text-amber-400 px-1.5 py-0.5 rounded border border-amber-500/20">POST / GET</span>
            </div>

            <span className="text-[11px] text-zinc-400">Gestão de Estoque</span>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>

              <label className="block text-xs font-medium text-zinc-400 mb-1">Selecionar produto:</label>

              <select value={product} onChange={(e) => setProduct(e.target.value)} className="w-full px-3 py-1.5 text-xs bg-zinc-200 rounded text-black hover:bg-zinc-300 cursor-pointer">
                <option value="1">Produto A (ID: 1)</option>
                <option value="2">Produto B (ID: 2)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">Tipo de operação:</label>
              <select value={type} onChange={(e) => setType(e.target.value)} className="w-full px-3 py-1.5 text-xs bg-zinc-200 rounded text-black hover:bg-zinc-300 cursor-pointer">
                <option value="Entrada">Entrada (+)</option>
                <option value="Saída">Saída (-)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">Quantidade:</label>
              <input type="number" placeholder="0" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="w-full px-3 py-1.5 text-xs bg-zinc-200 rounded text-black hover:bg-zinc-300"/>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">Data da movimentação:</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full px-3 py-1.5 text-xs bg-zinc-200 rounded text-black hover:bg-zinc-300"/>
            </div>
          </div>

          {msg && (
            <div className="mt-4 p-2.5 bg-white rounded text-xs text-black">
              {msg}
            </div>
          )}

          <button onClick={registrationMovimentation} className="mt-6 w-full py-2 px-4 bg-sky-600 hover:bg-sky-700 text-white text-xs font-medium rounded border cursor-pointer">Registrar Movimentação</button>
        </div>

        <div className="bg-white border-zinc-100 rounded p-6 shadow-xl">
          <h2 className="text-xs font-bold text-zinc400 tracking-wider mb-4 border-b border-black pb-2">Histórico de Movimentações (Payload Response)</h2>

          {movimentations.length === 0 ? (
            <p className="text-xs text-zinc-400">Nenhum registro encontrado no banco</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">

                <thead>
                  <tr className="border-b border-black text-black">
                    <th className="py-2 px-3">Produto ID</th>
                    <th className="py-2 px-3">Tipo</th>
                    <th className="py-2 px-3">Qtd</th>
                    <th className="py-2 px-3">Data</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-zinc-200">
                  {movimentations.map((item, index) => (
                    <tr key={item.id || index} className="hover:bg-zinc-200">
                      <td className="py-2 px-3 text-zinc-400">{item.product_id}</td>
                      <td className="py-2 px-3">
                        <span
                          className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold ${
                            item.type === "Entrada"
                              ? "bg-green-600 text-white"
                              : "bg-red-600 text-white"
                          }`}>{item.type}
                        </span>

                      </td>
                      <td className="py-2 px-3 text-zinc-400">{item.quantity}</td>
                      <td className="py-2 px-3 text-zinc-500">{item.movimentation_data || "N/A"}</td>
                    </tr>

                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}