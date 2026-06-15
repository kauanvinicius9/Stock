import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import styles from "../components/scss/registration.module.scss";

export default function RegistrationProduct() {
  const [productId, setProductId] = useState("");
  const [msg, setMsg] = useState("");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [qtdMin, setQtdMin] = useState("");

  const [get, setGet] = useState("");
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  async function buscarProduto() {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/products?name=${name}`
      );

      if (!response.ok) throw new Error("Erro ao buscar produtos");

      const data = await response.json();
      setProducts(data);
    } catch (error) {
      setMsg(error.message);
    }
  }

  async function getWithID() {
    try {
      if (!busca) return getProduct();

      const response = await fetch(
        `http://127.0.0.1:8000/products/${get}`
      );

      if (!response.ok) throw new Error("Produto não encontrado");

      const data = await response.json();
      setProducts([data]);
    } catch (error) {
      setMsg(error.message);
    }
  }

  async function deleteWithID(id) {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/products/${id}`,
        { method: "DELETE" }
      );

      if (!response.ok) throw new Error("Erro ao excluir");

      getProduct();
    } catch (error) {
      setMsg(error.message);
    }
  }

  async function editWithID(id) {
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

      if (!response.ok) throw new Error("Erro ao editar");

      getProduct();
    } catch (error) {
      setMsg(error.message);
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

      const response = await fetch(
        "http://127.0.0.1:8000/products",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            description,
            stock_today: 0,
            stock_min: Number(qtdMin),
            load: 0.0,
          }),
        }
      );

      if (!response.ok) throw new Error("Erro ao cadastrar");

      setMsg("Produto salvo com sucesso");
      getProduct();
    } catch (error) {
      setMsg(error.message);
    }
  }

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Cadastro de Produtos</h2>

      <button className={styles.back} onClick={() => navigate("/main")}>
        Voltar
      </button>

      <div>
        <h3 className={styles.title_product}>Novo / Editar Produto</h3>

        <input className={styles.input} value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome"/>
        <input className={styles.input} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Descrição"/>
        <input className={styles.input} type="number" value={qtdMin} onChange={(e) => setQtdMin(e.target.value)} placeholder="Quantidade mínima"/>
        <button className={styles.save} onClick={saveProduct}>
          Salvar
        </button>
      </div>

      <div>
        <h3>Lista de Produtos</h3>

        <input className={styles.get_product} value={get} onChange={(e) => setGet(e.target.value)} placeholder="Busque por ID"/>
        <button className={styles.button} onClick={getWithID}>
          Buscar
        </button>

        <ul>
          {products.map((p, index) => (
            <li key={p.id ?? index} className={styles.crud}>
              <div>
                <strong>{p.name}</strong> - {p.description}
                <br />
                Mínimo: {p.stock_min}
              </div>

              <div>
                <button className={styles.action} onClick={() => {
                    setProductId(p.id);
                    setName(p.name);
                    setDescription(p.description);
                    setQtdMin(p.stock_min);
                  }}>
                  Editar
                </button>

                <button className={styles.action} onClick={() => deleteWithID(p.id)}>
                  Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>

        {msg && <p>{msg}</p>}
      </div>
    </div>
  );
}