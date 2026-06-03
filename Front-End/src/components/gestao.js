import React, { useState, useEffect } from "react";
import styles from "../components/scss/login.scss";

export default function GestaoEstoque() {
  const [produto, setProduto] = useState("");
  const [tipo, setTipo] = useState("Entrada");
  const [quantidade, setQuantidade] = useState(0);
  const [data, setData] = useState("");
  const [msg, setMsg] = useState("");
  const [movimentacoes, setMovimentacoes] = useState([]);


  async function buscarMovimentacoes() {
    try {
     const response = await fetch(
        "http://127.0.0.1:8000/estoque/movimentacao"
      );

      const data = await response.json();

      console.log(data);
      setMovimentacoes(data);
    } catch (error) {
     console.log("Erro ao buscar:", error);
    }
  }

  useEffect(() => {
    buscarMovimentacoes();
  }, []);

  async function registrarMovimentacao() {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/estoque/movimentacao",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            produto_id: produto,
            usuario_id: 1,
            tipo: tipo,
            quantidade: Number(quantidade),
            data_movimentacao: data,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Erro ao registrar movimentação");
      }

      setMsg("Movimentação registrada com sucesso");
    } catch (error) {
      setMsg(error.message);
    }
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Gestão de Estoque</h2>

      <label>Selecionar Produto:</label>
      <select value={produto} onChange={(e) => setProduto(e.target.value)}>
        <option value="1">Produto A</option>
        <option value="2">Produto B</option>
      </select>

      <label>Tipo:</label>
      <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
        <option value="Entrada">Entrada</option>
        <option value="Saída">Saída</option>
      </select>

      <input type="number" placeholder="Quantidade" value={quantidade} onChange={(e) => setQuantidade(e.target.value)}/>
      <input type="date" value={data} onChange={(e) => setData(e.target.value)}/>
      <button onClick={registrarMovimentacao}>Registrar Movimentação</button>

      {msg && <p>{msg}</p>}

      {movimentacoes.map((item, index) => (
      <div key={index}>
        <p>Produto ID: {item.produto_id}</p>
        <p>Tipo: {item.tipo}</p>
        <p>Quantidade: {item.quantidade}</p>
        <p>Data: {item.data_movimentacao}</p>
      </div>
    ))}
    </div>
  );
}
