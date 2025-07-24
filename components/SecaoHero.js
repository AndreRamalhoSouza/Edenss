import React, { useState, useEffect } from 'react'; // Mantenha useEffect se for usar o carrossel automático
import Image from 'next/image'; // *** IMPORTANTE: Importe o componente Image do Next.js ***
import styles from '../styles/SecaoHero.module.css';

function SecaoHero({ images }) {
  // *** 1. HOOKS DEVEM SER DECLARADOS SEMPRE NO TOPO E INCONDICIONALMENTE ***
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fade, setFade] = useState(true);

  // 2. AGORA, a lógica de validação/retorno antecipado pode vir AQUI,
  //    DEPOIS que todos os Hooks foram chamados.
  if (!Array.isArray(images) || images.length === 0) {
    console.error("SecaoHero: A prop 'images' deve ser um array não vazio de URLs de imagem.");
    return (
      <section className={styles.heroSection}>
        <p style={{ color: 'red', textAlign: 'center' }}>Erro: Nenhuma imagem fornecida para o carrossel.</p>
      </section>
    );
  }

  // Se você realmente não usa useEffect para o carrossel automático, pode remover ele da linha 1
  // Se você VAI usar o carrossel automático, DESCOMENTE e ajuste:
  useEffect(() => {
    const interval = setInterval(handleClickNext, 5000); // Muda a cada 5 segundos
    return () => clearInterval(interval); // Limpa o intervalo na desmontagem
  }, [images.length, handleClickNext]); // Dependências: images.length e a função handleClickNext (memorizada)


  // Função para ir para a próxima imagem (melhor memorizá-la com useCallback para useEffect)
  const handleClickNext = React.useCallback(() => {
    setFade(false); // Inicia o fade-out
    setTimeout(() => { // Espera um pouco antes de mudar a imagem para o fade-out ser visível
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
      setFade(true); // Inicia o fade-in para a nova imagem
    }, 300); // Duração do fade-out (deve ser menor ou igual à duração da transição CSS)
  }, [images.length]); // Dependência: images.length

  // Função para ir para a imagem anterior (melhor memorizá-la com useCallback)
  const handleClickPrev = React.useCallback(() => {
    setFade(false); // Inicia o fade-out
    setTimeout(() => { // Espera um pouco antes de mudar a imagem
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
      setFade(true); // Inicia o fade-in para a nova imagem
    }, 300); // Duração do fade-out
  }, [images.length]); // Dependência: images.length


  return (
    <section className={styles.heroSection}>
      {/* 3. SUBSTITUA <img> POR <Image /> E ADICIONE width/height ou layout="fill" */}
      <Image
        src={images[currentImageIndex]} // Usa a imagem atual do array
        alt={`Imagem ${currentImageIndex + 1} da seção hero`}
        className={`${styles.heroImage} ${fade ? styles.fadeIn : styles.fadeOut}`}
        layout="fill" // Isso faz a imagem preencher o pai. O pai (heroSection) precisa de position: relative.
        objectFit="cover" // Garante que a imagem cubra a área sem distorcer, cortando se necessário.
      />
      <div className={styles.overlay}></div>

      <h1 className={styles.heroTitle}>
        <div className={styles.line}>ARQUITETURA</div>
        <div className={styles.line}>QUE TRANSFORMA</div>
        <div className={`${styles.line} ${styles.experienciasAzul}`}>EXPERIÊNCIAS</div>
      </h1>

      {/* Botões de navegação do carrossel com handlers */}
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