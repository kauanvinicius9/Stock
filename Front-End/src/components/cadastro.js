import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import styles from "../components/scss/cadastro.module.scss";

export default function CadastroProdutos() {
  const [produtoId, setProdutoId] = useState("");
  const [msg, setMsg] = useState("");

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [qtdMinima, setQtdMinima] = useState("");

  const [busca, setBusca] = useState("");
  const [produtos, setProdutos] = useState([]);

  const navigate = useNavigate();

  async function buscarProduto() {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/produtos?nome=${nome}`
      );

      if (!response.ok) throw new Error("Erro ao buscar produtos");

      const data = await response.json();
      setProdutos(data);
    } catch (error) {
      setMsg(error.message);
    }
  }

  async function buscaPorId() {
    try {
      if (!busca) return buscarProduto();

      const response = await fetch(
        `http://127.0.0.1:8000/produtos/${busca}`
      );

      if (!response.ok) throw new Error("Produto não encontrado");

      const data = await response.json();
      setProdutos([data]);
    } catch (error) {
      setMsg(error.message);
    }
  }

  async function excluaPorId(id) {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/produtos/${id}`,
        { method: "DELETE" }
      );

      if (!response.ok) throw new Error("Erro ao excluir");

      buscarProduto();
    } catch (error) {
      setMsg(error.message);
    }
  }

  async function editePorId(id) {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/produtos/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nome,
            descricao,
            estoque_atual: 0,
            estoque_minimo: Number(qtdMinima),
            peso: 0,
          }),
        }
      );

      if (!response.ok) throw new Error("Erro ao editar");

      buscarProduto();
    } catch (error) {
      setMsg(error.message);
    }
  }

  async function salvarProduto() {
    try {
      if (produtoId) {
        await editePorId(produtoId);

        setProdutoId("");
        setNome("");
        setDescricao("");
        setQtdMinima("");

        return;
      }

      const response = await fetch(
        "http://127.0.0.1:8000/produtos",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nome,
            descricao,
            estoque_atual: 0,
            estoque_minimo: Number(qtdMinima),
            peso: 0.0,
          }),
        }
      );

      if (!response.ok) throw new Error("Erro ao cadastrar");

      setMsg("Produto salvo com sucesso");
      buscarProduto();
    } catch (error) {
      setMsg(error.message);
    }
  }

  useEffect(() => {
    buscarProduto();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Cadastro de Produtos</h2>

      <button className={styles.back} onClick={() => navigate("/principal")}>
        Voltar
      </button>

      <div>
        <h3 className={styles.title_product}>Novo / Editar Produto</h3>

        <input className={styles.input} value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome"/>
        <input className={styles.input} value={descricao} onChange={(e) => setDescricao(e.target.value)} placeholder="Descrição"/>
        <input className={styles.input} type="number" value={qtdMinima} onChange={(e) => setQtdMinima(e.target.value)} placeholder="Quantidade mínima"/>
        <button className={styles.save} onClick={salvarProduto}>
          Salvar
        </button>
      </div>

      <div>
        <h3>Lista de Produtos</h3>

        <input className={styles.get_product} value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="Busque por ID"/>
        <button className={styles.button} onClick={buscaPorId}>
          Buscar
        </button>

        <ul>
          {produtos.map((p, index) => (
            <li key={p.id ?? index} className={styles.crud}>
              <div>
                <strong>{p.nome}</strong> - {p.descricao}
                <br />
                Mínimo: {p.estoque_minimo}
              </div>

              <div>
                <button className={styles.action} onClick={() => {
                    setProdutoId(p.id);
                    setNome(p.nome);
                    setDescricao(p.descricao);
                    setQtdMinima(p.estoque_minimo);
                  }}>
                  Editar
                </button>

                <button className={styles.action} onClick={() => excluaPorId(p.id)}>
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