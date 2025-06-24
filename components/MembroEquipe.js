// components/MembroEquipe.js
import React from 'react';
import styles from '../styles/MembroEquipe.module.css';

 // <-- importa os dados corretos

function MembroEquipe() {
  return (
    <>
      {membrosEquipe.map((membro, index) => {
        const nomeCss = membro.nome.toLowerCase();
        const imagemDinamicaClass = `${styles.imagemMembro}-${nomeCss}`;
        const textoDinamicaClass = `${styles.textoMembro}-${nomeCss}`;
        const membroDetalheDinamicaClass = `${styles.membroDetalhe}-${nomeCss}`;

        return (
          <div
            key={index}
            className={`${styles.membroDetalhe} ${membroDetalheDinamicaClass}`}
          >
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
      })}
    </>
  );
}

export default MembroEquipe;
