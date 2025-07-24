import React, { useState, useEffect, useCallback } from 'react'; // Importe useCallback também!
import Image from 'next/image'; // Importe Image
import styles from '../styles/SecaoHero.module.css';

function SecaoHero({ images }) {
  // *** TODOS OS HOOKS DEVEM SER DECLARADOS AQUI NO INÍCIO, INCONDICIONALMENTE ***
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fade, setFade] = useState(true);

  // Funções de clique memorizadas com useCallback
  // Elas precisam ser definidas antes de serem usadas no useEffect
  const handleClickNext = useCallback(() => {
    setFade(false); // Inicia o fade-out
    setTimeout(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
      setFade(true); // Inicia o fade-in para a nova imagem
    }, 300); // Duração do fade-out
  }, [images.length]); // Dependência: images.length

  const handleClickPrev = useCallback(() => {
    setFade(false); // Inicia o fade-out
    setTimeout(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
      setFade(true); // Inicia o fade-in para a nova imagem
    }, 300); // Duração do fade-out
  }, [images.length]); // Dependência: images.length


  // Carrossel automático com useEffect
  // Descomente se você quiser o carrossel automático
  useEffect(() => {
    const interval = setInterval(handleClickNext, 5000); // Muda a cada 5 segundos
    return () => clearInterval(interval); // Limpa o intervalo na desmontagem
  }, [images.length, handleClickNext]); // Dependências: images.length e a função handleClickNext

  // *** AGORA, a lógica de validação/retorno antecipado pode vir ***
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