// components/Rodape.jsx

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router'; 
import styles from '../styles/Rodape.module.css';

function Rodape() {
  const router = useRouter(); 

  const handleAnchorClick = (e, href) => {
    e.preventDefault(); 
    router.push(href); 
  };

  return (
    <footer className={styles.rodape}>
      <div className={styles.colunasRodape}>
        <div className={styles.colunaRodape}>
          
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
            {/* O Link do Instagram está correto para URL externa */}
            <a href="https://www.instagram.com/edenssarquiteturaemasterplan?igsh=MXNlbDZ6OGs4OTI1Mg==" 
               target="_blank" 
               rel="noopener noreferrer">
              <Image src="/images/insta.png" alt="Instagram" width={30} height={30} />
            </a>
          </div>
        </div>

        <div className={styles.colunaRodape}>
          <h3>PÁGINAS</h3>
          <ul>
            <li>
              <Link href="/#servicos" onClick={(e) => handleAnchorClick(e, '/#servicos')}>
                Serviços
              </Link>
            </li>
            <li>
              <Link href="/#nossa-historia" onClick={(e) => handleAnchorClick(e, '/#nossa-historia')}>
                Nossa História
              </Link>
            </li>
            <li>
            {/* Item vazio removido para limpeza */}
            </li>
            <li>
            {/* Item vazio removido para limpeza */}
            </li>
            <li>
              <Link href="/#projetos" onClick={(e) => handleAnchorClick(e, '/#projetos')}>
                Portfólio
              </Link>
            </li>
            <li>
              <Link href="/#nossa-historia" onClick={(e) => handleAnchorClick(e, '/#nossa-historia')}>
                Quem somos
              </Link>
            </li>
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