// components/SecaoHero.js
import React from 'react';
import styles from '../styles/SecaoHero.module.css';

function SecaoHero({ imagem }) { // Removendo 'titulo' da prop, pois as linhas são fixas agora
  return (
    <section className={styles.heroSection}>
      <img src={imagem} alt="Imagem de fundo da seção hero" className={styles.heroImage} />
      <div className={styles.overlay}></div> {/* Overlay para escurecer a imagem */}

      <h1 className={styles.heroTitle}> {/* Use uma nova classe para o h1 */}
        <div className={styles.line}>ARQUITETURA</div>
        <div className={styles.line}>QUE TRANSFORMA</div>
        <div className={`${styles.line} ${styles.experienciasAzul}`}>EXPERIÊNCIAS</div>
      </h1>
    </section>
  );
}

export default SecaoHero;