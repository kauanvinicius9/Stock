import React, { useState } from 'react';
import styles from "../components/scss/login.scss";
import { useState } from 'react';

const [isRegister, setIsRegister] = useState("")

export default function GestaoEstoque() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Gestão de Estoque</h2>
      <button className={styles.back}>Voltar</button>

      <div>
        <label classNam={styles.select_products}>Selecionar Produto: </label>
        <select className={styles.products}>
          <option>Produto A</option>
          <option>Produto B</option>
        </select>
        
        <label className={styles.type}>Tipo:</label>
        <select className={styles.type_options}>
          <option>Entrada</option>
          <option>Saída</option>
        </select>

        <input type="number" placeholder="Quantidade" />
        <input type="date" placeholder="Data" />
        
        <button onClick={() => setIsRegister()} className={styles.button}>Registrar Movimentação</button>
      </div>
        <p className={styles.warning}>Existem produtos abaixo da quantidade mínima</p>
      </div>
  );
}