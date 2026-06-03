import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import styles from "../components/scss/cadastro.scss";

export default function CadastroProdutos() {
  const [produtoId, setProdutoId] = useState("");
  const [msg, setMsg] = useState("");

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [qtdMinima, setQtdMinima] = useState("");

  const [quantidade, setQuantidade] = useState("");
  const [data, setData] = useState("");

  const [busca, setBusca] = useState("");
  const [produtos, setProdutos] = useState([]);

  async function buscaPorId() {
    const response = await fetch(
      `http://127.0.0.1:8000/produtos/${busca}`
    );

    const data = await response.json();
    setProdutos([data]);
  }

  async function excluaPorId(id) {
    const response = await fetch(
      `http://127.0.0.1:8000/produtos/${id}`,
      {
        method: "DELETE"
      }
    );

    if (response.ok) {
      buscarProduto()
    }

    const data = await response.json();
    setProdutos([data]);
  }

  async function editePorId(id) {
    const response = await fetch(
      `http://127.0.0.1:8000/produtos/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nome,
          descricao,
          estoque_atual: 0,
          estoque_minimo: Number(qtdMinima),
          peso: 0
        })
      }
    );

    buscarProduto()

    if (response.ok) {
      buscarProduto()
    }

    const data = await response.json();
    setProdutos([data]);
  }

   async function salvarProduto() {

    if (produtoId) {
      await editePorId(produtoId);

      setProdutoId("");
      setNome("");
      setDescricao("");
      setQtdMinima("");

      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/produtos", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
            nome, 
            descricao,
            estoque_atual: 0,
            estoque_minimo: Number(qtdMinima),
            peso: 0.0
          }),
        });
      
      const data = await response.json();

      console.log("STATUS:", response.status);
      console.log("RESPOSTA:", data)

      if (!response.ok) throw new Error("Erro ao cadastrar produto");

      setMsg("Produto registrado com sucesso");
      buscarProduto();
    } catch (error) {
      setMsg(error.message);
    }
  }

   async function buscarProduto() {
    try {
      const response = await fetch(`http://127.0.0.1:8000/produtos?nome=${nome}`)

      if (!response.ok) throw new Error("Erro ao buscar produtos");

      const data = await response.json();
      setProdutos(data);

    } catch (error) {
      setMsg(error.message);
    }
  }

  useEffect(() => {
    buscarProduto();
  }, []);

  async function entrada() {
    try {
      const response = await fetch("http://127.0.0.1:8000/estoque/entrada", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
            nome,
            descricao,
            estoque_atual: 0,
            estoque_minimo: Number(qtdMinima),
            peso: 0.0
          }),
        });

      if (!response.ok) {
        throw new Error("Erro ao cadastrar produto");
      }

      setMsg("Produto registrado com sucesso");
      buscarProduto();
    } catch (error) {
      setMsg(error.message);
    }
  }

   async function saida() {
    try {
      const response = await fetch("http://127.0.0.1:8000/estoque/saida", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
            nome,
            descricao,
            estoque_atual: 0,
            estoque_minimo: Number(qtdMinima),
            peso: 0.0
          }),
        });

      if (!response.ok) {
        throw new Error("Erro ao cadastrar produto");
      }

      setMsg("Produto registrado com sucesso");
      buscarProduto();
    } catch (error) {
      setMsg(error.message);
    }
  }

  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Cadastro de Produtos</h2>
      <button className={styles.back} onClick={() => navigate("/principal")}>Voltar</button>
      
      <div>
        <h3 className={styles.title_product}>Novo / Editar Produto</h3>
        <input className={styles.input} type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome do Produto"/>
        <input className={styles.input} type="text" value={descricao} onChange={(e) => setDescricao(e.target.value)} placeholder="Descrição" />
        <input className={styles.input} type="number" value={qtdMinima} onChange={(e)=> setQtdMinima(e.target.value)} placeholder="Quantidade Mínima" />
        <button className={styles.save} type="submit" onClick={salvarProduto}>Salvar</button>
      </div>

      <div>
        <h3>Lista de Produtos</h3>
         <input className={styles.get_product} type="text" value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="Busque pelo ID/Nome"/>
         <button className={styles.button} type="submit" onClick={buscarProduto}>Buscar</button>
      
        <ul>
          {produtos.map((p) => (
            <li key={p.id} className={styles.crud}>
              <div>
                <strong>{p.nome}</strong> - {p.descricao}
                Mínimo: {p.estoque_minimo}
              </div>

              <div>
                <button className={styles.action} onClick={() => {
                  setProdutoId(p.id);
                  setNome(p.nome);
                  setDescricao(p.descricao);
                  setQtdMinima(p.estoque_minimo)
                }}>Editar</button>
                <button className={styles.action} onClick={() => excluaPorId(p.id)}>Excluir</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}