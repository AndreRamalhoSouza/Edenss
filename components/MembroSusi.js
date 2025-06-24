// components/MembroSusi.js
import React from 'react';
import styles from '../styles/MembroEquipe.module.css';

function MembroSusi({ membro }) {
  return (
    <div className={styles.membroDetalheColuna}>
      <img
        src={membro.imagem}
        alt={membro.nome}
        className={`${styles.imagemMembro} ${styles.imagemSusi}`}
      />
      <div className={`${styles.textoMembro} ${styles.textoSusi}`}>
        <h3>{membro.nome}</h3>
        <h4>{membro.cargo}</h4>
        <p>{membro.bio}</p>
      </div>
    </div>
  );
}

export default MembroSusi;
