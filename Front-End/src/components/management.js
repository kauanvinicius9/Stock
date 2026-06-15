import React, { useState, useEffect } from "react";
import styles from "../components/scss/management.module.scss";

export default function ManagementProduct() {
  const [product, setProduct] = useState("");
  const [type, setType] = useState("Entrada");
  const [quantity, setQuantity] = useState(0);
  const [date, setDate] = useState("");
  const [msg, setMsg] = useState("");
  const [movimentations, setMovimentations] = useState([]);


  async function getMovimentations() {
    try {
     const response = await fetch(
        "http://127.0.0.1:8000/stock/movimentation"
      );

      const data = await response.json();

      console.log(data);
      setMovimentations(data);
    } catch (error) {
     console.log("Erro ao buscar:", error);
    }
  }

  useEffect(() => {
    getMovimentatins();
  }, []);

  async function registrationMovimentation() {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/stock/movimentation",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            product_id: produc,
            user_id: 1,
            type: type,
            quantity: Number(quantity),
            movimentation_data: data,
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
      <select value={product} onChange={(e) => setProduct(e.target.value)}>
        <option value="1">Produto A</option>
        <option value="2">Produto B</option>
      </select>

      <label>Tipo:</label>
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="Entrada">Entrada</option>
        <option value="Saída">Saída</option>
      </select>

      <input type="number" placeholder="Quantidade" value={quantity} onChange={(e) => setQuantity(e.target.value)}/>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)}/>
      <button onClick={registrationMovimentation}>Registrar Movimentação</button>

      {msg && <p>{msg}</p>}

      {movimentations.map((item, index) => (
      <div key={index}>
        <p>Produto ID: {item.product_id}</p>
        <p>Tipo: {item.type}</p>
        <p>Quantidade: {item.quantity}</p>
        <p>Data: {item.movimentation_data}</p>
      </div>
    ))}
    </div>
  );
}
