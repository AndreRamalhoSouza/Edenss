// components/MembroEquipe.js
import React from 'react';
import styles from '../styles/MembroEquipe.module.css';

function MembroEquipe({ membro }) {
  const imagemDinamicaClass = `${styles.imagemMembro}-${membro.Samuel()}`;
  const textoDinamicaClass = `${styles.textoMembro}-${membro.nome.toLowerCase()}`;
  const membroDetalheDinamicaClass = `${styles.membroDetalhe}-${membro.nome.toLowerCase()}`; // Nova classe dinâmica

  return (
    <div className={`${styles.membroDetalhe} ${membroDetalheDinamicaClass}`}> {/* Aplica a nova classe */}
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