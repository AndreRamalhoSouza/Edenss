import React, { useState, useEffect, useCallback } from 'react'; 
import Image from 'next/image'; 
import styles from '../styles/SecaoHero.module.css';

function SecaoHero({ images }) {

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fade, setFade] = useState(true);

  
  const handleClickNext = useCallback(() => {
    setFade(false); 
    setTimeout(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
      setFade(true); 
    }, 300); 
  }, [images.length]); 

  const handleClickPrev = useCallback(() => {
    setFade(false); 
    setTimeout(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
      setFade(true); 
    }, 300); 
  }, [images.length]); 


  
  useEffect(() => {
    const interval = setInterval(handleClickNext, 5000); 
    return () => clearInterval(interval); 
  }, [images.length, handleClickNext]);

  
  if (!Array.isArray(images) || images.length === 0) {
    console.error("SecaoHero: A prop 'images' deve ser um array não vazio de URLs de imagem.");
    return (
      <section className={styles.heroSection}>
        <p style={{ color: 'red', textAlign: 'center' }}>Erro: Nenhuma imagem fornecida para o carrossel.</p>
      </section>
    );
  }

  return (
    <section className={styles.heroSection}>
      <Image
        src={images[currentImageIndex]}
        alt={`Imagem ${currentImageIndex + 1} da seção hero`}
        className={`${styles.heroImage} ${fade ? styles.fadeIn : styles.fadeOut}`}
        layout="fill"
        objectFit="cover"
      />
      <div className={styles.overlay}></div>

      <h1 className={styles.heroTitle}>
        <div className={styles.line}>ARQUITETURA</div>
        <div className={styles.line}>QUE TRANSFORMA</div>
        <div className={`${styles.line} ${styles.experienciasAzul}`}>EXPERIÊNCIAS</div>
      </h1>

      <button
        className={`${styles.carouselArrow} ${styles.arrowLeft}`}
        onClick={handleClickPrev}
      >
        &#10094;
      </button>
      <button
        className={`${styles.carouselArrow} ${styles.arrowRight}`}
        onClick={handleClickNext}
      >
        &#10095;
      </button>
    </section>
  );
}

export default SecaoHero;