import React from 'react';
import styles from "../components/scss/principal.scss";
import { useNavigate } from 'react-router-dom';

export default function Principal() {
  const navigate = useNavigate()
  const user  = localStorage.getItem("user");
  
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Bem-vindo, {user || "Usuário"}</h2>
      <button className={styles.button} onClick={() => navigate("/cadastro")}>Cadastrar Produtos</button>
      <button className={styles.button} onClick={() => navigate("/gestao")}>Gestão de Estoque</button>
      <button className={styles.button_logout} onClick={() => navigate("/")}>Sair</button>
    </div>
  );
}