// components/MembroSamuel.js
import React from 'react';
import styles from '../styles/MembroEquipe.module.css';

function MembroSamuel({ membro }) {
  return (
    <div className={styles.membroDetalhe}>
      <img
        src={membro.imagem}
        alt={membro.nome}
        className={`${styles.imagemMembro} ${styles.imagemSamuel}`}
      />
      <div className={`${styles.textoMembro} ${styles.textoSamuel}`}>
        <h3>{membro.nome}</h3>
        <h4>{membro.cargo}</h4>
        <p>{membro.bio}</p>
      </div>
    </div>
  );
}

export default MembroSamuel;
