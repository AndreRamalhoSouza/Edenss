// components/MembroEquipe.js
import React from 'react';
import styles from '../styles/MembroEquipe.module.css';


function MembroEquipe({ membro, reverseOrder }) {
  const nomeCss = membro.nome.toLowerCase();
  const imagemDinamicaClass = styles['imagemMembro-' + nomeCss] || '';
  const textoDinamicaClass = styles['textoMembro-' + nomeCss] || '';

 
  const membroDetalheClasses = `${styles.membroDetalhe} ${reverseOrder ? styles.reverse : ''}`;

  return (
    <div className={membroDetalheClasses}>
      <img
        src={membro.imagem}
        alt={membro.nome}
        className={`${styles.imagemMembro} ${imagemDinamicaClass}`}
      />
      <div className={`${styles.textoMembro} ${textoDinamicaClass}`}>
        <h3>{membro.nome}</h3>
        <h4>
          {membro.cargo.split('\n').map((linha, index) => (
            <React.Fragment key={index}>
              {linha}
              <br />
            </React.Fragment>
          ))}
        </h4>
        <p>{membro.bio}</p>
      </div>
    </div>
  );
}

export default MembroEquipe;
