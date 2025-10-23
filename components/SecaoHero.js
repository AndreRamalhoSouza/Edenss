import React, { useState, useEffect, useCallback } from 'react'; 
import Image from 'next/image'; 
import styles from '../styles/SecaoHero.module.css';

function SecaoHero({ images }) {

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [fade, setFade] = useState(true);

    const currentItem = images[currentImageIndex];
    const currentTitle = currentItem ? currentItem.titulo : '';
    
    
    const blueKeywords = ["experiencias", "unicas", "empreendimentos"];

 
    const colorizeWords = (line) => {
      
        const words = line.split(/(\s+)/).filter(w => w.length > 0);

        return words.map((word, index) => {
            
            const cleanWord = word
                .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "") 
                .normalize("NFD").replace(/[\u0300-\u036f]/g, "") 
                .toLowerCase();
            
    
            const isBlue = blueKeywords.includes(cleanWord);
            
          
            const className = isBlue ? styles.experienciasAzul : undefined; 

            return (
                <span key={index} className={className}>
                    {word}
                </span>
            );
        });
    };

    
    const renderOrganizedTitle = (title) => {
      
        if (title === "PROJETANDO EXPERIÊNCIAS") {
            const [primeira, ...resto] = title.split(' ');
            return (
                <>
                    <div className={styles.line}>{colorizeWords(primeira)}</div>
                    <div className={styles.line}>{colorizeWords(resto.join(' '))}</div>
                </>
            );
        }

        
        if (title.includes("pensados para experiências")) {
            const quebra = title.indexOf("pensados");
            const linha1 = title.substring(0, quebra).trim();
            const linha2 = title.substring(quebra).trim();
            return (
                <>
                    <div className={styles.line}>{colorizeWords(linha1)}</div>
                    <div className={styles.line}>{colorizeWords(linha2)}</div>
                </>
            );
        }

      
        if (title.includes("–")) {
            const [linha1, linha2] = title.split('–');
             return (
                <>
                    <div className={styles.line}>{colorizeWords(linha1.trim())}</div>
                    <div className={styles.line}>– {colorizeWords(linha2.trim())}</div>
                </>
            );
        }

        
        return <div className={styles.line}>{colorizeWords(title)}</div>;
    };

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

    
    if (!Array.isArray(images) || images.length === 0 || !currentItem) {
        console.error("SecaoHero: A prop 'images' deve ser um array não vazio de objetos com { imagem, titulo }.");
        return (
            <section className={styles.heroSection}>
                <p style={{ color: 'red', textAlign: 'center' }}>Erro: Nenhuma imagem fornecida para o carrossel.</p>
            </section>
        );
    }

    return (
        <section className={styles.heroSection}>
            <Image
                src={currentItem.imagem}
                alt={`Imagem ${currentImageIndex + 1} da seção hero`}
                className={`${styles.heroImage} ${fade ? styles.fadeIn : styles.fadeOut}`}
                layout="fill"
                objectFit="cover"
            />
            <div className={styles.overlay}></div>

            {/* O NOVO CONTÊINER PARA POSICIONAR O TÍTULO E O FUNDO */}
            <div className={styles.heroTitleContainer} key={currentImageIndex}> 
                <h1 className={styles.heroTitle}>
                    {renderOrganizedTitle(currentTitle)}
                </h1>
            </div>

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