// components/MembroEquipe.js
import React from 'react';
import styles from '../styles/MembroEquipe.module.css';
import { membrosEquipe } from '../data/conteudo';

function MembroEquipe() {
  return (
    <div>
      {membrosEquipe.map((membro, index) => {
        const nomeCss = membro.nome.toLowerCase();
        const imagemDinamicaClass = `${styles.imagemMembro}-${nomeCss}`;

        return (
          <img
            key={index}
            src={membro.imagem}
            alt={membro.nome}
            className={`${styles.imagemMembro} ${imagemDinamicaClass}`}
          />
        );
      })}
    </div>
  );
}

export default MembroEquipe;
