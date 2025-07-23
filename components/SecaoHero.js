import React, { useState } from 'react'; // Removido 'useEffect' pois está comentado
import Image from 'next/image'; // Adicionado para otimização de imagem
import styles from '../styles/SecaoHero.module.css';

// Remova a prop 'imagem' e adicione 'images' como um array de URLs
function SecaoHero({ images }) { // <--- A prop AGORA é 'images' (plural)

  // --- CORREÇÃO DO ERRO DE HOOKS CONDICIONAIS ---
  // Mova os useState para o topo do componente, ANTES de qualquer return condicional
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Estado para controlar a imagem atual
  const [fade, setFade] = useState(true); // Estado para controlar a animação de fade
  // --- FIM DA CORREÇÃO ---

  // Validação da prop 'images' depois dos Hooks
  if (!Array.isArray(images) || images.length === 0) {
    console.error("SecaoHero: A prop 'images' deve ser um array não vazio de URLs de imagem.");
    return (
      <section className={styles.heroSection}>
        <p style={{color: 'red', textAlign: 'center'}}>Erro: Nenhuma imagem fornecida para o carrossel.</p>
      </section>
    );
  }

  // Função para ir para a próxima imagem
  const handleClickNext = () => {
    setFade(false); // Inicia o fade-out
    setTimeout(() => { // Espera um pouco antes de mudar a imagem para o fade-out ser visível
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
      setFade(true); // Inicia o fade-in para a nova imagem
    }, 300); // Duração do fade-out (deve ser menor ou igual à duração da transição CSS)
  };

  // Função para ir para a imagem anterior
  const handleClickPrev = () => {
    setFade(false); // Inicia o fade-out
    setTimeout(() => { // Espera um pouco antes de mudar a imagem
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
      setFade(true); // Inicia o fade-in para a nova imagem
    }, 300); // Duração do fade-out
  };

  // Se você quiser que o carrossel mude automaticamente
  // Remova os comentários ABAIXO se quiser ativar o carrossel automático
  // import React, { useState, useEffect } from 'react'; // Re-adicione useEffect se for usar
  /*
  useEffect(() => {
    const interval = setInterval(handleClickNext, 5000); // Muda a cada 5 segundos
    return () => clearInterval(interval); // Limpa o intervalo na desmontagem
  }, [images.length, handleClickNext]); // Adicione handleClickNext como dependência se estiver usando ele aqui
  */

  return (
    <section className={styles.heroSection}>
      {/* --- CORREÇÃO DO AVISO DE IMAGEM --- */}
      <Image
        src={images[currentImageIndex]} // Usa a imagem atual do array
        alt={`Imagem ${currentImageIndex + 1} da seção hero`}
        className={`${styles.heroImage} ${fade ? styles.fadeIn : styles.fadeOut}`} // Aplica as classes de animação
        layout="fill" // Permite que a imagem preencha o pai
        objectFit="cover" // Corta a imagem para cobrir a área sem distorcer
        priority={true} // Otimiza para carregar a primeira imagem mais rápido (bom para LCP)
      />
      {/* --- FIM DA CORREÇÃO --- */}

      <div className={styles.overlay}></div>

      <h1 className={styles.heroTitle}>
        <div className={styles.line}>ARQUITETURA</div>
        <div className={styles.line}>QUE TRANSFORMA</div>
        <div className={`${styles.line} ${styles.experienciasAzul}`}>EXPERIÊNCIAS</div>
      </h1>

      {/* Botões de navegação do carrossel com handlers */}
      <button
        className={`${styles.carouselArrow} ${styles.arrowLeft}`}
        onClick={handleClickPrev} // Adiciona o evento de clique
      >
        &#10094; {/* Caractere HTML para seta para a esquerda */}
      </button>
      <button
        className={`${styles.carouselArrow} ${styles.arrowRight}`}
        onClick={handleClickNext} // Adiciona o evento de clique
      >
        &#10095; {/* Caractere HTML para seta para a direita */}
      </button>
    </section>
  );
}

export default SecaoHero;