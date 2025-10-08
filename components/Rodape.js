// components/Rodape.jsx

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router'; // 1. Importe useRouter
import styles from '../styles/Rodape.module.css';

function Rodape() {
  const router = useRouter(); // 2. Inicialize useRouter

  // Função auxiliar para lidar com cliques em links de âncora
  const handleAnchorClick = (e, href) => {
    e.preventDefault(); // Impede o comportamento padrão do Link
    router.push(href); // Navega para a URL completa (ex: /#servicos)
    // O 'scroll-behavior: smooth' no seu globals.css cuidará da rolagem suave na página de destino.
  };

  return (
    <footer className={styles.rodape}>
      <div className={styles.colunasRodape}>
        <div className={styles.colunaRodape}>
          {/* A logo já está OK com href="/" */}
          <Link href="/">
            <Image
              src="/images/edens 2.png"
              alt="Logo da Empresa"
              width={460}
              height={120}
              className={styles.logoPrincipal}
            />
          </Link>

          <div className={styles.socialIcons}>
            {/* Links sociais (permanecem como estão, pois são externos) */}
          
           
            <a href="URL_DO_SEU_INSTAGRAM" target="_blank" rel="noopener noreferrer">
              <Image src="/images/insta.png" alt="Instagram" width={30} height={30} />
            </a>
           
          </div>
        </div>

        <div className={styles.colunaRodape}>
          <h3>PÁGINAS</h3>
          <ul>
            <li>
              {/* 3. Ajuste o href e adicione o onClick */}
              <Link href="/#servicos" onClick={(e) => handleAnchorClick(e, '/#servicos')}>
                Serviços
              </Link>
            </li>
            <li>
              {/* Ajuste o href e adicione o onClick */}
              <Link href="/#nossa-historia" onClick={(e) => handleAnchorClick(e, '/#nossa-historia')}>
                Nossa História
              </Link>
            </li>
            <li>
              {/* Ajuste o href e adicione o onClick (Verifique se #projetos é o correto para "Hotéis") */}
            
            </li>
            <li>
              {/* Ajuste o href e adicione o onClick (Verifique se #projetos é o correto para "Parques Temáticos") */}
              
              
            </li>
            <li>
              {/* Ajuste o href e adicione o onClick */}
              <Link href="/#projetos" onClick={(e) => handleAnchorClick(e, '/#projetos')}>
                Portfólio
              </Link>
            </li>
            <li>
              {/* Ajuste o href e adicione o onClick */}
              <Link href="/#nossa-historia" onClick={(e) => handleAnchorClick(e, '/#nossa-historia')}>
                Quem somos
              </Link>
            </li>
             {/* Adicione um link para a seção de contato se houver uma, como você indicou */}
             <li>
                <Link href="/#contato" onClick={(e) => handleAnchorClick(e, '/#contato')}>
                  Contato
                </Link>
             </li>
          </ul>
        </div>

        <div className={styles.colunaRodape2}>
          <h3>CONTATO</h3>
          <p className={styles.emailSamuel}>samuelvidal@edenss.com.br</p>
          <p className={styles.emailSusi}> susi@edenss.com.br</p>
        </div>
      </div>
      
    </footer>
  );
}

export default Rodape;