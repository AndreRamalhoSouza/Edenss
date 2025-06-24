// components/MembroEquipe.js
import React from 'react';
import styles from '../styles/MembroEquipe.module.css';

function MembroEquipe({ membro }) {
  const nomeSlug = membro.nome.trim().toLowerCase() === 'susi' ? 'susi' : 'samuel';

  const imagemDinamicaClass = `${styles.imagemMembro}-${nomeSlug}`;
  const textoDinamicaClass = `${styles.textoMembro}-${nomeSlug}`;
  const membroDetalheDinamicaClass = `${styles.membroDetalhe}-${nomeSlug}`;

  return (
    <div className={`${styles.membroDetalhe} ${membroDetalheDinamicaClass}`}>
      <img
        src={membro.imagem}
        alt={membro.nome}
        className={`${styles.imagemMembro} ${imagemDinamicaClass}`}
      />
      <div className={`${styles.textoMembro} ${textoDinamicaClass}`}>
        <h3>{membro.nome}</h3>
        <h4>{membro.cargo}</h4>
        <p>{membro.bio}</p>
      </div>
    </div>
  );
}

export default MembroEquipe;
