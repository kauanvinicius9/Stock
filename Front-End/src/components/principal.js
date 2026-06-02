import React from 'react';
import styles from "../components/scss/principal.scss"
import { useNavigate } from 'react-router-dom';

export default function Principal() {
  const navigate = useNavigate()
  
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Bem-vindo, [Nome do Usuário]</h2>
      <button className={styles.button}>Cadastrar Produtos</button>
      <button className={styles.button_2}>Gestão de Estoque</button>
      <button className={styles.button_logout} onClick={() => navigate("/")}>Sair</button>
    </div>
  );
}