import React from 'react';
import styles from "../components/scss/cadastro.scss";

export default function CadastroProdutos() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Cadastro de Produtos</h2>
      <button className={styles.back}>Voltar</button>
      
      <div>
        <h3 className={styles.title_product}>Novo / Editar Produto</h3>
        <input className={styles.input} type="text" placeholder="Nome do Produto" />
        <input className={styles.input} type="text" placeholder="Descrição" />
        <input className={styles.input} type="number" placeholder="Quantidade Mínima" />
        <button className={styles.save} type="submit">Salvar</button>
      </div>

      <div>
        <h3>Lista de Produtos</h3>
         <input className={styles.get_product} type="text" placeholder="Busque pelo ID/Nome"/>
         <button className={styles.button} type="submit" onClick={() => ()}>Buscar</button>
      
        <ul>
          <li className={styles.crud}>
            {/* Exemplo: Papel A4 -  */}
            <button className={styles.action}>Editar</button>
            <button className={styles.action}>Excluir</button>
          </li>
        </ul>
      </div>
    </div>
  );
}